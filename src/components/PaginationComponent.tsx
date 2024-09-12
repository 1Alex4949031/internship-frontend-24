import {Pagination} from 'react-bootstrap';
import React from 'react';

interface PaginationComponentProps {
    totalPages: number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({totalPages, currentPage, paginate}) => {
    const handlePageChange = (pageNumber: number) => {
        paginate(pageNumber);
        window.scrollTo(0, 0);
    };

    return (
        <Pagination>
            {Array.from({length: totalPages}, (_, index) => (
                <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}
        </Pagination>
    );
};

export default PaginationComponent;
