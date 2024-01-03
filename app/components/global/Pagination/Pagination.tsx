import React from 'react';
import { Link } from '@remix-run/react';

interface PaginationProps {
    prevIndex: number;
    nextIndex: number;
    currentPage: number;
    totalPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ prevIndex, nextIndex, currentPage, totalPage }) => {
    return (
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    <Link className="page-link" to={`/animes/page/${prevIndex}`} aria-label="Previous">
                        <span aria-hidden="true">«</span>
                    </Link>
                </li>
                <li className="page-item">
                    <div className="page-link text-dark disabled">
                        {currentPage} / {totalPage}
                    </div>
                </li>
                <li className="page-item">
                    <Link className="page-link" to={`/animes/page/${nextIndex}`} aria-label="Next">
                        <span aria-hidden="true">»</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
