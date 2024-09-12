import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Modal, Button} from 'react-bootstrap';
import {Order, OrderItem} from '../../types/types';
import {getAllOrders} from '../../api/ordersApi';
import {useNavigate} from 'react-router-dom';
import OrderCard from '../../components/OrderCard/OrderCard';
import OrderFilter from '../../components/OrderFilter';

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [statusFilter, setStatusFilter] = useState<number | null>(null);
    const [sortOrder, setSortOrder] = useState<string>('createdAt');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedOrderItems, setSelectedOrderItems] = useState<OrderItem[]>([]);
    const navigate = useNavigate();

    // Загрузка всех заказов
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await getAllOrders();
            setOrders(data);
            setFilteredOrders(data);
        } catch (error) {
            console.error('Ошибка при загрузке заказов:', error);
        }
    };

    // Фильтрация заказов по статусу
    const filterOrders = (orders: Order[], status: number | null): Order[] => {
        return status === null ? orders : orders.filter(order => order.status === status);
    };

    // Сортировка заказов по критерию (дата или сумма)
    const sortOrders = (orders: Order[], sortBy: string): Order[] => {
        return [...orders].sort((a, b) => {
            if (sortBy === 'total') {
                return a.total - b.total;
            }
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
    };

    // Применение фильтрации и сортировки при изменении данных
    useEffect(() => {
        const filtered = filterOrders(orders, statusFilter);
        const sorted = sortOrders(filtered, sortOrder);
        setFilteredOrders(sorted);
    }, [statusFilter, sortOrder, orders]);

    // Показ товаров в заказе в модальном окне
    const handleShowItems = (items: OrderItem[]) => {
        setSelectedOrderItems(items);
        setShowModal(true);
    };

    // Переход к странице объявления
    const handleItemClick = (itemId: string) => {
        navigate(`/advertisements/${itemId}`);
    };

    // Обработка изменения фильтра
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value === "" ? null : parseInt(e.target.value);
        setStatusFilter(status);
    };

    // Обработка изменения сортировки
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(e.target.value);
    };

    return (
        <Container>
            <div className="d-flex justify-content-center align-items-center flex-wrap my-2">
                <div className="page-title">
                    <span className="page-title-small">Страница</span>
                    <span className="page-title-large">Заказов</span>
                </div>
            </div>

            {/* Фильтр и сортировка */}
            <OrderFilter onFilterChange={handleFilterChange} onSortChange={handleSortChange}/>

            {/* Список заказов */}
            <Row>
                {filteredOrders.map((order) => (
                    <Col key={order.id} sm={12} md={6} lg={4} className="mb-4">
                        <OrderCard order={order} onShowItems={handleShowItems}/>
                    </Col>
                ))}
            </Row>

            {/* Модальное окно с товарами заказа */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Товары в заказе</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedOrderItems.map((item) => (
                        <div key={item.id} onClick={() => handleItemClick(item.id)} style={{cursor: 'pointer'}}>
                            <strong>{item.name}</strong> — {item.count} шт. по {item.price} ₽
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default OrdersPage;
