/**
 * NVRSS ERP - Authentication Middleware
 * Validates JWT tokens and enforces role-based access control
 */

import type { Context, Next } from 'hono';
import type { Env, Variables } from '../index';

// Simple JWT-like token validation (for edge compatibility)
// In production, use a proper JWT library compatible with Workers

interface TokenPayload {
    userId: number;
    uid: string;
    role: string;
    firstName: string;
    lastName: string;
    exp: number;
}

/**
 * Encode a simple base64 token (for demo - use proper JWT in production)
 */
export function createToken(payload: Omit<TokenPayload, 'exp'>, secret: string, expiresInHours: number): string {
    const exp = Date.now() + expiresInHours * 60 * 60 * 1000;
    const tokenPayload = { ...payload, exp };
    const data = JSON.stringify(tokenPayload);
    const signature = simpleSign(data, secret);
    return btoa(data) + '.' + signature;
}

/**
 * Verify and decode token
 */
export function verifyToken(token: string, secret: string): TokenPayload | null {
    try {
        const [dataB64, signature] = token.split('.');
        if (!dataB64 || !signature) return null;

        const data = atob(dataB64);
        const expectedSig = simpleSign(data, secret);

        if (signature !== expectedSig) return null;

        const payload = JSON.parse(data) as TokenPayload;

        if (payload.exp < Date.now()) return null;

        return payload;
    } catch {
        return null;
    }
}

/**
 * Simple HMAC-like signature (for demo)
 * In production, use Web Crypto API: crypto.subtle.sign()
 */
function simpleSign(data: string, secret: string): string {
    let hash = 0;
    const combined = data + secret;
    for (let i = 0; i < combined.length; i++) {
        const char = combined.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
}

/**
 * Authentication middleware - validates token and sets user context
 */
export function authMiddleware() {
    return async (c: Context<{ Bindings: Env; Variables: Variables }>, next: Next) => {
        const authHeader = c.req.header('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return c.json({ error: 'Unauthorized', message: 'Missing or invalid authorization header' }, 401);
        }

        const token = authHeader.substring(7);
        const payload = verifyToken(token, c.env.JWT_SECRET);

        if (!payload) {
            return c.json({ error: 'Unauthorized', message: 'Invalid or expired token' }, 401);
        }

        // Verify user is still active in database
        const user = await c.env.DB.prepare(
            'SELECT id, uid, role, is_active, first_name, last_name FROM users WHERE id = ?'
        ).bind(payload.userId).first();

        if (!user || !user.is_active) {
            return c.json({ error: 'Unauthorized', message: 'Account is inactive or deleted' }, 401);
        }

        // Set user in context
        c.set('user', {
            id: user.id as number,
            uid: user.uid as string,
            role: user.role as string,
            firstName: user.first_name as string,
            lastName: user.last_name as string,
        });

        await next();
    };
}

/**
 * Role-based access control middleware
 */
export function requireRole(...allowedRoles: string[]) {
    return async (c: Context<{ Bindings: Env; Variables: Variables }>, next: Next) => {
        const user = c.get('user');

        if (!user) {
            return c.json({ error: 'Unauthorized', message: 'Authentication required' }, 401);
        }

        if (!allowedRoles.includes(user.role)) {
            return c.json({
                error: 'Forbidden',
                message: `Access denied. Required roles: ${allowedRoles.join(', ')}`
            }, 403);
        }

        await next();
    };
}

/**
 * Password hashing utilities (using Web Crypto API for edge compatibility)
 */
export async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    const passwordHash = await hashPassword(password);
    return passwordHash === hash;
}
