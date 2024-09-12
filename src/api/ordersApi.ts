import axios from 'axios';
import { Order } from '../types/types';
import { BASE_URL } from "../utils/baseUrl";

// Получение всех заказов с параметрами (например, фильтрация, сортировка, пагинация)
export const getAllOrders = async (params?: any): Promise<Order[]> => {
    try {
        const response = await axios.get<Order[]>(`${BASE_URL}/orders`, { params });
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении всех заказов:', error);
        throw new Error('Не удалось загрузить заказы. Попробуйте позже.');
    }
};

// Получение конкретного заказа по id
export const getOrderById = async (id: string): Promise<Order> => {
    try {
        const response = await axios.get<Order>(`${BASE_URL}/orders/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Ошибка при получении заказа с ID ${id}:`, error);
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new Error('Заказ не найден');
        }
        throw new Error('Не удалось загрузить заказ. Попробуйте позже.');
    }
};

// Создание нового заказа
export const createOrder = async (data: Omit<Order, 'id' | 'createdAt'>): Promise<void> => {
    try {
        await axios.post(`${BASE_URL}/orders`, data);
    } catch (error) {
        console.error('Ошибка при создании заказа:', error);
        throw new Error('Не удалось создать заказ. Попробуйте позже.');
    }
};

// Обновление заказа по id (полное обновление)
export const updateOrder = async (id: string, data: Partial<Order>): Promise<void> => {
    try {
        await axios.put(`${BASE_URL}/orders/${id}`, data);
    } catch (error) {
        console.error(`Ошибка при обновлении заказа с ID ${id}:`, error);
        throw new Error('Не удалось обновить заказ. Попробуйте позже.');
    }
};

// Частичное обновление заказа (изменение определенных полей)
export const patchOrder = async (id: string, data: Partial<Order>): Promise<void> => {
    try {
        await axios.patch(`${BASE_URL}/orders/${id}`, data);
    } catch (error) {
        console.error(`Ошибка при частичном обновлении заказа с ID ${id}:`, error);
        throw new Error('Не удалось обновить заказ. Попробуйте позже.');
    }
};

// Удаление заказа по id
export const deleteOrder = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/orders/${id}`);
    } catch (error) {
        console.error(`Ошибка при удалении заказа с ID ${id}:`, error);
        throw new Error('Не удалось удалить заказ. Попробуйте позже.');
    }
};
