/**
 * NVRSS ERP - API Entry Point
 * Cloudflare Workers + Hono Framework
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { authRoutes } from './routes/auth';
import { admissionRoutes } from './routes/admissions';
import { userRoutes } from './routes/users';
import { dashboardRoutes } from './routes/dashboard';
import type { D1Database } from '@cloudflare/workers-types';

// Environment bindings type
export type Env = {
    DB: D1Database;
    JWT_SECRET: string;
    ENVIRONMENT: string;
    SESSION_DURATION_HOURS: string;
};

// Context variables type
export type Variables = {
    user: {
        id: number;
        uid: string;
        role: string;
        firstName: string;
        lastName: string;
    } | null;
};

// Create Hono app with types
const app = new Hono<{ Bindings: Env; Variables: Variables }>();

// Global middleware
app.use('*', logger());
app.use('/api/*', cors({
    origin: ['http://localhost:5173', 'http://localhost:8787'],
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

// Health check endpoint
app.get('/api/health', (c) => {
    return c.json({
        status: 'healthy',
        environment: c.env.ENVIRONMENT,
        timestamp: new Date().toISOString(),
    });
});

// Mount route modules
app.route('/api/auth', authRoutes);
app.route('/api/admissions', admissionRoutes);
app.route('/api/users', userRoutes);
app.route('/api/dashboard', dashboardRoutes);

// 404 handler for API routes
app.notFound((c) => {
    if (c.req.path.startsWith('/api')) {
        return c.json({ error: 'Not Found', message: 'The requested endpoint does not exist' }, 404);
    }
    // For non-API routes, let the frontend handle it
    return c.text('Not Found', 404);
});

// Global error handler
app.onError((err, c) => {
    console.error('API Error:', err);

    if (c.env.ENVIRONMENT === 'development') {
        return c.json({
            error: 'Internal Server Error',
            message: err.message,
            stack: err.stack,
        }, 500);
    }

    return c.json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred',
    }, 500);
});

export default app;
