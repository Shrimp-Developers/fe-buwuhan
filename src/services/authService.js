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

// Get user profile
export const getUserProfile = async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        throw new Error('No authentication token found');
    }

    return fetch(`${API_BASE}/api/auth/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
};

// Update user profile
export const updateUserProfile = async ({ fullName, avatarFile = null }) => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        throw new Error('No authentication token found');
    }

    const formData = new FormData();
    formData.append('fullName', fullName);

    if (avatarFile) {
        formData.append('avatar', avatarFile);
    }

    return fetch(`${API_BASE}/api/auth/profile`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });
};

// update user password
export const updateUserPassword = async ({ password }) => {
    return fetch(`${API_BASE}/api/auth/password`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
    });
};

// Delete user profile avatar
export const deleteUserProfileAvatar = async () => {
    return fetch(`${API_BASE}/api/auth/profile/avatar`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
};

// forgot password
export const forgotPassword = async ({ email }) => {
    return fetch(`${API_BASE}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
};

// reset password
export const resetPassword = async ({ password, token }) => {
    return fetch(`${API_BASE}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, token })
    });
};


