import React, { useState } from 'react';
import './MoviesCard.css';
import { useLocation } from "react-router-dom";
import moviePicPath from '../../images/movies/movie_pic1.png';

const MoviesCard = ({ movie }) => {
    const [isLiked, setIsLiked] = useState(false);
    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    }
    const location = useLocation();
    const pageMovies = location.pathname === '/movies';

    return (
        <li className="movie__item">
            <img
                className="movie__pic"
                src={moviePicPath}
                alt={movie.title}
            />
            <div className="movie__caption">
                <div className="movie__description">
                    <h3 className="movie__text">{movie.title}</h3>
                    <p className="movie_duration">{`${Math.trunc(movie.duration / 60)}ч${movie.duration % 60}м`}</p>
                </div>
                {
                    pageMovies ?
                        <button
                            type="button"
                            className={`movie__like ${isLiked ? 'movie__like_active' : ''}`}
                            aria-label="Поставить лайк"
                            onClick={handleLikeClick}>
                        </button>
                    :
                        <button
                            type="button"
                            className="movie__like_saved"
                            aria-label="Удалить фильм">
                        </button>
                }
            </div>
        </li>
    );
};

export default MoviesCard;
