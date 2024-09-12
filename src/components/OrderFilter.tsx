import React from 'react';
import {Col, Form, Row} from 'react-bootstrap';
import {OrderStatus} from "../types/types";

interface OrderFilterProps {
    onFilterChange: (e: React.ChangeEvent<any>) => void;
    onSortChange: (e: React.ChangeEvent<any>) => void;
}

const OrderFilter: React.FC<OrderFilterProps> = ({onFilterChange, onSortChange}) => {
    return (
        <Row className="mb-3">
            <Col md={4}>
                <Form.Group controlId="statusFilter">
                    <Form.Label>Фильтр по статусу</Form.Label>
                    <Form.Control as="select" onChange={onFilterChange}>
                        <option value="">Все статусы</option>
                        <option value={OrderStatus.Created}>Создан</option>
                        <option value={OrderStatus.Paid}>Оплачен</option>
                        <option value={OrderStatus.Transport}>В пути</option>
                        <option value={OrderStatus.DeliveredToThePoint}>Доставлен в пункт</option>
                        <option value={OrderStatus.Received}>Получен</option>
                        <option value={OrderStatus.Archived}>Архивирован</option>
                        <option value={OrderStatus.Refund}>Возврат</option>
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col md={4}>
                <Form.Group controlId="sortOrder">
                    <Form.Label>Сортировка</Form.Label>
                    <Form.Control as="select" onChange={onSortChange}>
                        <option value="createdAt">По дате создания</option>
                        <option value="total">По сумме</option>
                    </Form.Control>
                </Form.Group>
            </Col>
        </Row>
    );
};

export default OrderFilter;
