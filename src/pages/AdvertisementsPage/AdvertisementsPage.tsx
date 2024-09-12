import React, {useEffect, useState} from 'react';
import {createAdvertisement, getAllAdvertisements} from '../../api/advertisementsApi';
import AdvertisementCard from '../../components/AdvertisementCard/AdvertisementCard';
import {Advertisement} from '../../types/types';
import {Container, Row, Col, Spinner, Form, Button, Modal} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import PaginationComponent from '../../components/PaginationComponent';

import './AdvertisementsPage.css';
import searchIcon from '../../assets/search.svg';

const AdvertisementsPage: React.FC = () => {
    const navigate = useNavigate();

    const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
    const [filteredAdvertisements, setFilteredAdvertisements] = useState<Advertisement[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Параметры для пагинации
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [adsPerPage, setAdsPerPage] = useState<number>(10);

    // Поиск
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Модальное окно для создания нового объявления
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newAdData, setNewAdData] = useState<Omit<Advertisement, 'id' | 'createdAt'>>({
        name: '',
        description: '',
        price: 0,
        views: 0,
        likes: 0,
        imageUrl: ''
    });

    // Загрузка всех объявлений
    useEffect(() => {
        fetchAdvertisements();
    }, []);

    const fetchAdvertisements = async () => {
        setLoading(true);
        try {
            const data = await getAllAdvertisements();
            setAdvertisements(data);
            setFilteredAdvertisements(data);
        } catch (error) {
            console.error('Ошибка при загрузке объявлений:', error);
        } finally {
            setLoading(false);
        }
    };

    // Фильтрация объявлений по поисковому запросу
    useEffect(() => {
        const filteredAds = advertisements.filter(ad =>
            ad.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAdvertisements(filteredAds);
        setCurrentPage(1); // Сбрасываем на первую страницу
    }, [searchTerm, advertisements]);

    // Обработка изменения поискового запроса
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Переключение страниц
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Обработка изменения количества объявлений на странице
    const handleChangeAdsPerPage = (e: React.ChangeEvent<any>) => {
        setAdsPerPage(parseInt(e.target.value));
        setCurrentPage(1); // Сбрасываем на первую страницу
    };

    // Открытие/закрытие модального окна для добавления объявления
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // Обработка изменения данных нового объявления
    const handleNewAdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewAdData(prev => ({...prev, [name]: value}));
    };

    // Создание нового объявления
    const handleCreateAd = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createAdvertisement(newAdData);
            const updatedAds = await getAllAdvertisements();
            setAdvertisements(updatedAds);
            handleCloseModal();
        } catch (error) {
            console.error('Ошибка при создании объявления:', error);
        } finally {
            setLoading(false);
        }
    };

    // Пагинация
    const indexOfLastAd = currentPage * adsPerPage;
    const indexOfFirstAd = indexOfLastAd - adsPerPage;
    const currentAds = filteredAdvertisements.slice(indexOfFirstAd, indexOfLastAd);
    const totalPages = Math.ceil(filteredAdvertisements.length / adsPerPage);

    // Индикатор загрузки
    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <Spinner animation="border"/>
            </Container>
        );
    }

    return (
        <Container>
            <div className="d-flex justify-content-center align-items-center flex-wrap my-2">
                <div className="page-title">
                    <span className="page-title-small">Страница</span>
                    <span className="page-title-large">Объявлений</span>
                </div>

                <Button className="page-add-advertisement" variant="primary" onClick={handleShowModal}>
                    Добавить объявление
                </Button>
            </div>

            <div className="search-wrapper my-2 d-flex justify-content-center">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Найти товары"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                    <div className="search-icon-wrapper">
                        <img className="search-icon" src={searchIcon} alt="Найти"/>
                    </div>
                </div>
            </div>

            <div className="d-flex my-3 justify-content-center">
                <Form.Group controlId="adsPerPageSelect" className="d-flex align-items-center ads-per-page-select">
                    <Form.Label className="ads-text-label">Объявлений на странице:</Form.Label>
                    <Form.Control
                        as="select"
                        value={adsPerPage}
                        onChange={handleChangeAdsPerPage}
                        className="ads-select ml-2"
                    >
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </Form.Control>
                </Form.Group>
            </div>

            <Row>
                {currentAds.map((ad) => (
                    <Col key={ad.id} sm={12} md={6} lg={4} className="mb-4">
                        <AdvertisementCard advertisement={ad} onClick={() => navigate(`/advertisements/${ad.id}`)}/>
                    </Col>
                ))}
            </Row>

            <div className="d-flex justify-content-center">
                <PaginationComponent totalPages={totalPages} currentPage={currentPage} paginate={paginate}/>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить новое объявление</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCreateAd}>
                        <Form.Group controlId="formImageUrl">
                            <Form.Label>URL картинки</Form.Label>
                            <Form.Control
                                type="text"
                                name="imageUrl"
                                value={newAdData.imageUrl}
                                onChange={handleNewAdChange}
                                placeholder="Введите URL картинки"
                            />
                        </Form.Group>

                        <Form.Group controlId="formName">
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={newAdData.name}
                                onChange={handleNewAdChange}
                                placeholder="Введите название"
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={newAdData.description}
                                onChange={handleNewAdChange}
                                placeholder="Введите описание"
                            />
                        </Form.Group>

                        <Form.Group controlId="formPrice">
                            <Form.Label>Стоимость</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={newAdData.price}
                                onChange={handleNewAdChange}
                                placeholder="Введите стоимость"
                            />
                        </Form.Group>

                        <Button className="mt-4" variant="success" type="submit">
                            Создать
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default AdvertisementsPage;
