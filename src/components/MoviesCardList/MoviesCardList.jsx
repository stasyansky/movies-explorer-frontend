import React from 'react';
import { useLocation } from "react-router-dom";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({
    searchedMovies,
    onMovieSaved,
    searchedSavedMovies,
    onMovieDelete,
    savedMovies,
    filmsOnRow,
    countAddRows,
}) => {

    const location = useLocation();
    function isMovieSaved(_movieId) {
        return savedMovies.some(m => m.movieId === _movieId);
    }

    return (
        <ul className="movies__list">
            {
                location.pathname === '/movies'
                && searchedMovies
                    .slice(0, (countAddRows * filmsOnRow))
                    .map(movie => (
                        <MoviesCard
                            key={movie.id}
                            movie={movie}
                            onMovieSaved={onMovieSaved}
                            onMovieDelete={onMovieDelete}
                            isSaved={isMovieSaved(movie.id)}
                        />
                    ))
            }
            {
                location.pathname === '/saved-movies'
                && searchedSavedMovies
                    .slice(0, (countAddRows * filmsOnRow))
                    .map(savedMovie => (
                        <MoviesCard
                            key={savedMovie._id}
                            savedMovie={savedMovie}
                            onMovieDelete={onMovieDelete}
                        />
                    ))
            }
        </ul>
    );
};

export default MoviesCardList;
