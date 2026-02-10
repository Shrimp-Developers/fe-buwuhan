import { API_BASE } from '../api/api.js';

// Create buwuhan
export const createBuwuhan = async ({ nameMan, nameWoman, categoryId, gift, status, address, information }) => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        throw new Error('No authentication token found');
    }

    return fetch(`${API_BASE}/api/buwuhan`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': `Bearer ${token}`
        },
        body: JSON.stringify({ nameMan, nameWoman, categoryId, gift, status, address, information }),
    });
};

// Get list buwuhan
export const getListBuwuhan = async ({ name = '', category = '', status = '', page = 1, limit = 10, total, size } = {}) => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        throw new Error('No authentication token found');
    }

    // Build query parameters
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (category) params.append('category', category);
    if (status !== '') params.append('status', status);
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (total) params.append('total', total);
    if (size) params.append('size', size);

    const queryString = params.toString();
    const url = `${API_BASE}/api/buwuhan${queryString ? `?${queryString}` : ''}`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': `Bearer ${token}`
        },
    });
};

// get data dashboard buwuhan
export const getDashboardBuwuhan = async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        throw new Error('No authentication token found');
    }

    return fetch(`${API_BASE}/api/buwuhan/dashboard`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': `Bearer ${token}`
        },
    });
};

// get detail data buwuhan
export const getDetailBuwuhan = async (buwuhanId) => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        throw new Error('No authentication token found');
    }

    return fetch(`${API_BASE}/api/buwuhan/${buwuhanId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': `Bearer ${token}`
        },
    });
};


// update data buwuhan
export const updateDataBuwuhan = async (buwuhanId, { nameMan, nameWoman, categoryId, gift, status, address, information }) => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        throw new Error('No authentication token found');
    }

    return fetch(`${API_BASE}/api/buwuhan/${buwuhanId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': `Bearer ${token}`
        },
        body: JSON.stringify({ nameMan, nameWoman, categoryId, gift, status, address, information }),
    });
};

// delete data buwuhan
export const deleteBuwuhan = async (buwuhanId) => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        throw new Error('No authentication token found');
    }

    return fetch(`${API_BASE}/api/buwuhan/${buwuhanId}`, {
        method: 'DELETE',
        headers: {
            'Accept': `Bearer ${token}`,
            'Authorization': `Bearer ${token}`
        },
    });
};