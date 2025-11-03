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

export const loginWithGoogle = () => {
    // Simpan URL  untuk redirect setelah login
    sessionStorage.setItem('preAuthUrl', window.location.pathname);

    // Redirect ke  Google OAuth
    window.location.href = `${import.meta.env.VITE_API_PATH}/auth/google/login`;
};

export const getCurrentUser = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_PATH}/auth/me`, {
            method: 'GET',
            credentials: 'include', // Mengirim cookie
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to get user data');
        }

        const data = await response.json();

        // Sesuaikan dengan struktur response backend
        return data.data?.user || data.user || data;
    } catch (error) {
        console.error('getCurrentUser error:', error);
        throw error;
    }
};
