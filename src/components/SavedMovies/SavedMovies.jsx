import React, {useEffect, useState} from 'react';
import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import WithoutFoundResult from "../WithoutFoundResult/WithoutFoundResult";
import MoreFilmsButton from "../MoreFilmsButton/MoreFilmsButton";
import Preloader from "../Preloader/Preloader";

const SavedMovies = ({
    handleSearchSavedMovies,
    onMovieDelete,
    savedMovies,
    searchedSavedMovies,
    setSearchedSavedMovies,
    isLoading,
    isChecked,
    setIsChecked,
    handleToggle,
    searchQuery,
    setSearchQuery,
    errorPlaceholder,
    setErrorPlaceholder
}) => {

    useEffect(() => {
        const savedMoviesArr = JSON.parse(localStorage.getItem('savedMovies'));
        const searchedSavedMoviesArr = JSON.parse(localStorage.getItem('searchedMovies-savedmovies'));
        if (searchedSavedMoviesArr) {
            if (searchedSavedMoviesArr.length == 0) {
                return setSearchedSavedMovies(savedMoviesArr);
            } else {
                return setSearchedSavedMovies(searchedSavedMoviesArr)
            }
        } else {
            setSearchedSavedMovies(savedMoviesArr);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('searchedMovies-savedmovies', JSON.stringify(searchedSavedMovies));
    }, [searchedSavedMovies]);

    return (
        <section className="saved-movies">
            <SearchForm
                handleSearchSavedMovies={handleSearchSavedMovies}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleToggle={handleToggle}
                errorPlaceholder={errorPlaceholder}
                setErrorPlaceholder={setErrorPlaceholder}
            />
            {searchedSavedMovies.length === 0 ?
                <WithoutFoundResult />
                :
                <>
                    <MoviesCardList
                        searchedSavedMovies={searchedSavedMovies}
                        onMovieDelete={onMovieDelete}
                        savedMovies={savedMovies}
                    />
                    <MoreFilmsButton />
                </>
            }
            {
                isLoading && <Preloader />
            }
        </section>
    );
};

export default SavedMovies;
