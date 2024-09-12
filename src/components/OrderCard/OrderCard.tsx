import React from 'react';
import {Card, Button} from 'react-bootstrap';
import {Order, OrderItem, OrderStatus} from '../../types/types';
import {getStatusText} from '../../utils/orderUtils';

import "./OrderCard.css"


interface OrderCardProps {
    order: Order;
    onShowItems: (items: OrderItem[]) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({order, onShowItems}) => {
    const itemCount = order.items.reduce((acc, item) => acc + item.count, 0);
    return (
        <Card className="order-card mb-3">
            <Card.Body>
                <Card.Title>Заказ: {order.id}</Card.Title>

                {/* Дата создания */}
                <Card.Text>
                    <strong>Дата
                        создания:</strong> {new Date(order.createdAt).toLocaleDateString('ru-RU', {timeZone: 'UTC'})}
                </Card.Text>

                {/* Дата завершения, если заказ завершен */}
                {order.finishedAt && (
                    <Card.Text>
                        <strong>Дата
                            завершения:</strong> {new Date(order.finishedAt).toLocaleDateString('ru-RU', {timeZone: 'UTC'})}
                    </Card.Text>
                )}

                {/* Статус */}
                <Card.Text>
                    <strong>Статус:</strong> {getStatusText(order.status)}
                </Card.Text>

                {/* Сумма заказа */}
                <Card.Text>
                    <strong>Сумма:</strong> {order.total} ₽
                </Card.Text>

                {/* Количество товаров */}
                <Card.Text>
                    <strong>Количество товаров:</strong> {itemCount}
                </Card.Text>

                {/* Способ доставки */}
                <Card.Text>
                    <strong>Способ доставки:</strong> {order.deliveryWay}
                </Card.Text>

                {/* Кнопка для показа всех товаров в модальном окне */}
                <Button variant="primary" onClick={() => onShowItems(order.items)}>
                    Показать все товары
                </Button>

                {/* Логика для завершения и завершенных заказов */}
                {order.status === OrderStatus.Received && !order.finishedAt && (
                    <Card.Text className="text-warning">
                        Заказ может быть завершен
                    </Card.Text>
                )}

                {order.finishedAt && (
                    <Card.Text className="text-success">
                        Заказ завершен
                    </Card.Text>
                )}
            </Card.Body>
        </Card>
    );
};

export default OrderCard;
