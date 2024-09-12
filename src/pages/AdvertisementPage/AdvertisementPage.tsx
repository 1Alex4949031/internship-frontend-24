import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getAdvertisementById, updateAdvertisement} from '../../api/advertisementsApi';
import {Advertisement} from '../../types/types';
import {Button, Form, Container, Spinner, Row, Col, Modal} from 'react-bootstrap';
import emptyImage from '../../assets/empty.png'

import './AdvertisementPage.css';

import heartIcon from "../../assets/heart.svg";
import eyeIcon from "../../assets/eye.svg";

const AdvertisementPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [advertisement, setAdvertisement] = useState<Advertisement | null>(null);
    const [formData, setFormData] = useState<Partial<Advertisement>>({});
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchAdvertisement();
    }, [id]);

    // Загрузка объявления
    const fetchAdvertisement = async () => {
        setLoading(true);
        try {
            const data = await getAdvertisementById(id!);
            setAdvertisement(data);
            setFormData(data);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Обработка изменений в форме
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    // Обновление объявления
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateAdvertisement(id!, formData);
            setIsEditing(false);
            fetchAdvertisement();  // обновляем данные после изменения
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleShowEditModal = () => setIsEditing(true);
    const handleCloseEditModal = () => setIsEditing(false);

    // Компонент загрузки
    const LoadingIndicator = () => (
        <Container className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <Spinner animation="border"/>
        </Container>
    );

    // Компонент ошибки
    const ErrorDisplay = ({message}: { message: string }) => (
        <Container className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <h1>{message}</h1>
        </Container>
    );

    // Если данные загружаются, показываем индикатор
    if (loading) return <LoadingIndicator/>;

    // Если есть ошибка, показываем сообщение об ошибке
    if (error) return <ErrorDisplay message={error}/>;

    return (
        <Container>
            <Row>
                {/* Левая колонка с изображением */}
                <Col md={5}>
                    <div className="advertisement__title">{advertisement!.name}</div>
                    <img className="advertisement__image"
                         src={advertisement?.imageUrl || emptyImage}
                         alt={advertisement!.name}
                    />
                </Col>

                {/* Правая колонка с описанием и кнопками */}
                <Col md={6} className="mx-1 my-4">
                    <div className="description-title">Описание товара</div>
                    <div className="price-wrapper">{advertisement!.price} ₽</div>

                    <Row>
                        <Col xs="auto" className="d-flex align-items-center">
                            <img className='advertisement__icon' src={heartIcon} alt="Лайки"/>
                            <span className="advertisement__text">{advertisement!.likes}</span>
                        </Col>
                        <Col xs="auto" className="d-flex align-items-center">
                            <img className='advertisement__icon' src={eyeIcon} alt="Просмотры"/>
                            <span className="advertisement__text">{advertisement!.views}</span>
                        </Col>
                    </Row>

                    <div className="description-wrapper">{advertisement?.description}</div>

                    <Button className="my-3" variant="primary" onClick={handleShowEditModal}>
                        Редактировать
                    </Button>
                </Col>
            </Row>

            {/* Модальное окно для редактирования */}
            <Modal show={isEditing} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактировать объявление</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="formImageUrl">
                            <Form.Label>URL картинки</Form.Label>
                            <Form.Control
                                type="text"
                                name="imageUrl"
                                value={formData.imageUrl || ''}
                                onChange={handleInputChange}
                                placeholder="Введите URL картинки"
                            />
                        </Form.Group>

                        <Form.Group controlId="formName">
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleInputChange}
                                placeholder="Введите название"
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={formData.description || ''}
                                onChange={handleInputChange}
                                placeholder="Введите описание"
                            />
                        </Form.Group>

                        <Form.Group controlId="formPrice">
                            <Form.Label>Цена</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price || ''}
                                onChange={handleInputChange}
                                placeholder="Введите цену"
                            />
                        </Form.Group>

                        <Row className="mt-4 justify-content-between">
                            <Col xs="auto">
                                <Button variant="success" type="submit">
                                    Сохранить
                                </Button>
                            </Col>
                            <Col xs="auto">
                                <Button variant="secondary" onClick={handleCloseEditModal}>
                                    Отмена
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default AdvertisementPage;
