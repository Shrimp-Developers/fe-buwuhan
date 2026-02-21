import { API_BASE } from '../api/api.js';

// Opsi kategori untuk filter list
export const CATEGORY_OPTIONS = [
    { value: 'items', label: 'Barang' },
    { value: 'rice', label: 'Beras' },
    { value: 'money', label: 'Uang' },
    { value: 'other', label: 'Lainnya' },
];

// Opsi status untuk filter list
export const STATUS_OPTIONS = [
    { value: 'paid', label: 'Lunas' },
    { value: 'unpaid', label: 'Belum Lunas' },
];

// Category ID 
export const CATEGORY_ID_MAP = { 1: 'uang', 2: 'beras', 3: 'barang', 4: 'lainnya' };
export const CATEGORY_VALUE_MAP = { 'uang': 1, 'beras': 2, 'barang': 3, 'lainnya': 4 };

// Status API 
export const STATUS_API_TO_FORM = { 'paid': 'lunas', 'unpaid': 'belum-lunas' };
export const STATUS_FORM_TO_API = { 'lunas': 'paid', 'belum-lunas': 'unpaid' };

// Category ID 
export const CATEGORY_ID_TO_LABEL = { 1: 'Uang', 2: 'Beras', 3: 'Barang', 4: 'Lainnya' };

// Category Name 
export const CATEGORY_NAME_TO_LABEL = {
    'items': 'Barang',
    'rice': 'Beras',
    'money': 'Uang',
    'other': 'Lainnya',
};

// Status API
export const STATUS_TO_LABEL = {
    'paid': 'Lunas',
    'unpaid': 'Belum Lunas',
};

// Helpers
function getAuthToken() {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('No authentication token found');
    return token;
}

function authHeaders(withContentType = true) {
    const token = getAuthToken();
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
    };
    if (withContentType) headers['Content-Type'] = 'application/json';
    return headers;
}

async function handleResponse(response) {
    const body = await response.json();
    if (!response.ok) {
        const error = new Error(body.message || 'Request failed');
        error.status = response.status;
        error.body = body;
        throw error;
    }
    return body;
}

// API Functions

// Create buwuhan
export const createBuwuhan = async ({ nameMan, nameWoman, categoryId, gift, status, address, information }) => {
    const response = await fetch(`${API_BASE}/api/buwuhan`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ nameMan, nameWoman, categoryId, gift, status, address, information }),
    });
    return handleResponse(response);
};

// Get list buwuhan (search)
export const getListBuwuhan = async ({ name, category, status, page, limit, total, size } = {}) => {
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (category) params.append('category', category);
    if (status) params.append('status', status);
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (total) params.append('total', total);
    if (size) params.append('size', size);

    const queryString = params.toString();

    const response = await fetch(`${API_BASE}/api/buwuhan${queryString ? `?${queryString}` : ''}`, {
        method: 'GET',
        headers: authHeaders(),
    });
    return handleResponse(response);
};

// Get dashboard data
export const getDashboardBuwuhan = async () => {
    const response = await fetch(`${API_BASE}/api/buwuhan/dashboard`, {
        method: 'GET',
        headers: authHeaders(),
    });
    return handleResponse(response);
};

// Get detail buwuhan
export const getDetailBuwuhan = async (buwuhanId) => {
    const response = await fetch(`${API_BASE}/api/buwuhan/${buwuhanId}`, {
        method: 'GET',
        headers: authHeaders(),
    });
    return handleResponse(response);
};

// Update buwuhan
export const updateDataBuwuhan = async (buwuhanId, { nameMan, nameWoman, categoryId, gift, status, address, information }) => {
    const response = await fetch(`${API_BASE}/api/buwuhan/${buwuhanId}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ nameMan, nameWoman, categoryId, gift, status, address, information }),
    });
    return handleResponse(response);
};

// Delete buwuhan
export const deleteBuwuhan = async (buwuhanId) => {
    const response = await fetch(`${API_BASE}/api/buwuhan/${buwuhanId}`, {
        method: 'DELETE',
        headers: authHeaders(false),
    });
    return handleResponse(response);
};