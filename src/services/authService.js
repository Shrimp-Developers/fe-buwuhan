import {API_PATH} from './api.js';

export const userLogin = async ({email, password}) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/auth/login`, {
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
    return await fetch(`${import.meta.env.VITE_API_PATH}/auth/register`, {
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

export const UserAuthGoogle = () => {
    window.location.href = `${API_PATH}/auth/google/login`; //  Redirect browser ke endpoint Google OAuth
};