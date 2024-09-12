import {OrderStatus} from "../types/types";

export const getStatusText = (status: typeof OrderStatus[keyof typeof OrderStatus]) => {
    switch (status) {
        case OrderStatus.Created:
            return 'Создан';
        case OrderStatus.Paid:
            return 'Оплачен';
        case OrderStatus.Transport:
            return 'В пути';
        case OrderStatus.DeliveredToThePoint:
            return 'Доставлен в пункт';
        case OrderStatus.Received:
            return 'Получен';
        case OrderStatus.Archived:
            return 'Архивирован';
        case OrderStatus.Refund:
            return 'Возврат';
        default:
            return 'Неизвестный статус';
    }
};
