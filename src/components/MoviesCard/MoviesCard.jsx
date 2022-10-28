import React from 'react';
import { useLocation } from "react-router-dom";
import './MoviesCard.css';

const MoviesCard = ({
    movie,
    savedMovie,
    onMovieSaved,
    onMovieDelete,
    isSaved,
}) => {

    const location = useLocation();
    const handleToggleSaveMovie = () => {
        isSaved ? onMovieDelete(movie) : onMovieSaved(movie);
    }
    const handleDeleteClick = () => {
        onMovieDelete(savedMovie);
    }
    const setMovieDuration = (duration) => {
      if (duration < 60) {
          return `${duration}м`;
      } else if (duration == 60) {
            return '1ч';
        } else {
          return `${Math.trunc(duration / 60)}ч${duration % 60}м`
      }
    }

    return (
        <li className="movie__item">
            <a href={(location.pathname === '/movies') ?
                movie.trailerLink
                : savedMovie.trailerLink}
               target="_blank"
               rel="noreferrer"
            >
                <img
                    className="movie__pic"
                    src={(location.pathname === '/movies') ?
                        `https://api.nomoreparties.co/${movie.image.url}`
                        : savedMovie.image
                    }
                    alt={(location.pathname === '/movies') ?
                        movie.nameRU
                        : savedMovie.nameRU}
                />
            </a>
            <div className="movie__caption">
                <div className="movie__description">
                    <h3 className="movie__text">{
                        (location.pathname === '/movies') ?
                        movie.nameRU
                        : savedMovie.nameRU}
                    </h3>
                    <p className="movie_duration">{
                        (location.pathname === '/movies') ?
                            setMovieDuration(movie.duration) :
                            setMovieDuration(savedMovie.duration)
                    }
                    </p>
                </div>
                {
                    location.pathname === '/movies' ?
                        <button
                            type="button"
                            className={`movie__like ${isSaved ? 'movie__like_active' : ''}`}
                            aria-label="Сохранить фильм"
                            onClick={handleToggleSaveMovie}>
                        </button>
                    :
                        <button
                            type="button"
                            className="movie__like_saved"
                            aria-label="Удалить фильм"
                            onClick={handleDeleteClick}>
                        </button>
                }
            </div>
        </li>
    );
};

export default MoviesCard;
