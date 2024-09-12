import React from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import {Advertisement} from '../../types/types';
import './AdvertisementCard.css';
import eyeIcon from '../../assets/eye.svg';
import heartIcon from '../../assets/heart.svg';


interface AdvertisementCardProps {
    advertisement: Advertisement;
    onClick: (id: string) => void;
}

const AdvertisementCard: React.FC<AdvertisementCardProps> = ({advertisement, onClick}) => {
    return (
        <Card className="advertisement__card" onClick={() => onClick(advertisement.id)}>
            {advertisement.imageUrl && (
                <Card.Img
                    variant="top"
                    src={advertisement.imageUrl}
                    alt={advertisement.name}
                />
            )}
            <Card.Body>
                <Card.Title>{advertisement.name}</Card.Title>
                <Row className="justify-content-center my-1">
                    <Col xs="auto">
                        <div className="advertisement__price">
                            {advertisement.price} ₽
                        </div>
                    </Col>
                </Row>

                <Row className="justify-content-around">
                    <Col xs="auto" className="d-flex align-items-center">
                        <img className='advertisement__icon' src={heartIcon} alt="Лайки"/>
                        {advertisement.likes}
                    </Col>
                    <Col xs="auto" className="d-flex align-items-center">
                        <img className='advertisement__icon' src={eyeIcon} alt="Просмотры"/>
                        {advertisement.views}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default AdvertisementCard;
