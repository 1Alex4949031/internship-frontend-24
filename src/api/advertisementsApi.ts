import axios from 'axios';
import {Advertisement} from '../types/types';
import {BASE_URL} from '../utils/baseUrl';

export const getAllAdvertisements = async (params?: any): Promise<Advertisement[]> => {
    try {
        const response = await axios.get<Advertisement[]>(`${BASE_URL}/advertisements`, {params});
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении всех объявлений:', error);
        throw new Error('Не удалось загрузить объявления. Попробуйте позже.');
    }
};

export const getAdvertisementById = async (id: string): Promise<Advertisement> => {
    try {
        const response = await axios.get<Advertisement>(`${BASE_URL}/advertisements/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                throw new Error('Объявление не найдено');
            }
        }
        console.error(`Ошибка при получении объявления с ID ${id}:`, error);
        throw new Error('Не удалось загрузить объявление. Попробуйте позже.');
    }
};

export const createAdvertisement = async (data: Omit<Advertisement, 'id' | 'createdAt'>): Promise<void> => {
    try {
        await axios.post(`${BASE_URL}/advertisements`, data);
    } catch (error) {
        console.error('Ошибка при создании объявления:', error);
        throw new Error('Не удалось создать объявление. Попробуйте позже.');
    }
};

export const updateAdvertisement = async (id: string, data: Partial<Advertisement>): Promise<void> => {
    try {
        await axios.put(`${BASE_URL}/advertisements/${id}`, data);
    } catch (error) {
        console.error(`Ошибка при обновлении объявления с ID ${id}:`, error);
        throw new Error('Не удалось обновить объявление. Попробуйте позже.');
    }
};
