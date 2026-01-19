/**
 * NVRSS ERP - Auth Context
 * Manages authentication state across the application
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface User {
    id: number;
    uid: string;
    role: string;
    firstName: string;
    lastName: string;
    mustChangePassword: boolean;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (uid: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    changePassword: (currentPassword: string, newPassword: string, confirmPassword: string) => Promise<{ success: boolean; error?: string }>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API_BASE = '/api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('auth_token'));
    const [isLoading, setIsLoading] = useState(true);

    // Validate token on mount
    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_BASE}/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser({
                        id: userData.id,
                        uid: userData.uid,
                        role: userData.role,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        mustChangePassword: userData.mustChangePassword,
                    });
                } else {
                    // Token invalid, clear it
                    localStorage.removeItem('auth_token');
                    setToken(null);
                    setUser(null);
                }
            } catch (error) {
                console.error('Auth validation error:', error);
                localStorage.removeItem('auth_token');
                setToken(null);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        validateToken();
    }, [token]);

    const login = useCallback(async (uid: string, password: string) => {
        try {
            const response = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ uid, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, error: data.message || 'Login failed' };
            }

            localStorage.setItem('auth_token', data.token);
            setToken(data.token);
            setUser({
                id: data.user.id,
                uid: data.user.uid,
                role: data.user.role,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                mustChangePassword: data.user.mustChangePassword,
            });

            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Network error. Please try again.' };
        }
    }, []);

    const logout = useCallback(async () => {
        if (token) {
            try {
                await fetch(`${API_BASE}/auth/logout`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                });
            } catch (error) {
                console.error('Logout error:', error);
            }
        }

        localStorage.removeItem('auth_token');
        setToken(null);
        setUser(null);
    }, [token]);

    const changePassword = useCallback(async (currentPassword: string, newPassword: string, confirmPassword: string) => {
        if (!token) {
            return { success: false, error: 'Not authenticated' };
        }

        try {
            const response = await fetch(`${API_BASE}/auth/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, error: data.message || 'Password change failed' };
            }

            // Update user state to reflect password change
            if (user) {
                setUser({ ...user, mustChangePassword: false });
            }

            return { success: true };
        } catch (error) {
            console.error('Password change error:', error);
            return { success: false, error: 'Network error. Please try again.' };
        }
    }, [token, user]);

    const refreshUser = useCallback(async () => {
        if (!token) return;

        try {
            const response = await fetch(`${API_BASE}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const userData = await response.json();
                setUser({
                    id: userData.id,
                    uid: userData.uid,
                    role: userData.role,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    mustChangePassword: userData.mustChangePassword,
                });
            }
        } catch (error) {
            console.error('Refresh user error:', error);
        }
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!user && !!token,
                isLoading,
                login,
                logout,
                changePassword,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
