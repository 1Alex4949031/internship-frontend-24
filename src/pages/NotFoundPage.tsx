import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import notFoundImg from '../assets/not_found.png';

const NotFoundPage: React.FC = () => {
    return (
        <Container fluid className="d-flex align-items-center justify-content-center vh-100">
            <Row className="text-center">
                <Col md={6} className="mx-auto">
                    <h1>404</h1>
                    <p>Ой! Страница не найдена</p>
                    <img
                        src={notFoundImg}
                        alt="404 Not Found"
                        className="img-fluid mb-4"
                        style={{borderRadius: "20px"}}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default NotFoundPage;
