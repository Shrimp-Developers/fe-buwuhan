import {API_PATH} from './api.js';

export const userLogin = ({fullName, email, password}) =>
    fetch(`${API_PATH}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({fullName, email, password}),
    });

export const userRegister = async ({email, password}) => {
    return await fetch(`${API_PATH}/auth/login`, {
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