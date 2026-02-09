import { API_PATH } from './api.js';

export const userLogin = async ({email, password}) => {
    return await fetch(`${API_PATH}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            email,
            password
        }),
    });
};

export const userRegister = async ({fullName, email, password}) => {
    return await fetch(`${API_PATH}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            fullName,
            email,
            password
        }),
    });
};

export const loginWithGoogle = () => {
    sessionStorage.setItem('preAuthUrl', window.location.pathname);
    window.location.href = `${API_PATH}/api/auth/google/login`;
};

export const activateAccount = async (code) => {
    const response = await fetch(
        `${API_PATH}/api/auth/activation?code=${encodeURIComponent(code)}`,
        {
            method: 'GET',
        }
    );

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Activation failed');
    }

    return response.json();
};