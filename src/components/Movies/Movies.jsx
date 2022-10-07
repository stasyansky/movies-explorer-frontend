import React from 'react';
import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreFilmsButton from "../MoreFilmsButton/MoreFilmsButton";

const Movies = () => {
    return (
        <section className="movies">
            <SearchForm />
            <MoviesCardList />
            <MoreFilmsButton />
        </section>
    );
};

export default Movies;
