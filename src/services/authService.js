import { API_BASE } from '../api/api.js';

// Login user dengan email dan password
export const userLogin = async ({ email, password }) => {
    return fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
};

// Register user baru
export const userRegister = async ({ fullName, email, password }) => {
    return fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password })
    });
};

// Aktivasi akun user via email
export const activateAccount = async (code) => {
    return fetch(`${API_BASE}/api/auth/activation?code=${encodeURIComponent(code)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
};

// Login dengan Google OAuth (redirect ke Google)
export const loginWithGoogle = () => {
    window.location.href = `${API_BASE}/api/auth/google/login`;
};
