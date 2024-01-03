import React from 'react';

interface CardAnimeProps {
    thumbnail: string;
    title: string;
    score: number;
}

const CardAnime: React.FC<CardAnimeProps> = ({ thumbnail, title, score }) => {
    return (
        <article className="card text-bg-dark rounded-4 border-0 h-100">
            <img src={thumbnail} className="card-img rounded-4" alt={title} />
            <div className="card-img-overlay d-flex flex-column justify-content-end">
                <div className="p-2 rounded-3" style={{ background: 'rgba(0, 0, 0, 0.60)' }}>
                    <h5 className="card-title small fw-bolder">{title}</h5>
                    <p className="card-text">{score}</p>
                </div>
            </div>
        </article>
    );
};

export default CardAnime;
