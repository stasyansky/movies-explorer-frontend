import React from 'react';
import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreFilmsButton from "../MoreFilmsButton/MoreFilmsButton";
import WithoutFoundResult from "../WithoutFoundResult/WithoutFoundResult";
import Preloader from "../Preloader/Preloader";

const Movies = ({
    handleSearchMovies,
    searchedMovies,
    savedMovies,
    onMovieSaved,
    onMovieDelete,
    isLoading,
    isChecked,
    setIsChecked,
    handleToggle,
    searchQuery,
    setSearchQuery,
    errorPlaceholder,
    setErrorPlaceholder,
    isErrorOnServer,
    filmsOnRow,
    countAddRows,
    handleMoreFilmsClick,
}) => {

    return (
        <section className="movies">
            <SearchForm
                handleSearchMovies={handleSearchMovies}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                handleToggle={handleToggle}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                errorPlaceholder={errorPlaceholder}
                setErrorPlaceholder={setErrorPlaceholder}
            />
            {isErrorOnServer && <WithoutFoundResult isErrorOnServer={isErrorOnServer} />}
            {
                (searchedMovies.length === 0 && !isErrorOnServer)
                ? <WithoutFoundResult />
                : <>
                    <MoviesCardList
                        searchedMovies={searchedMovies}
                        onMovieSaved={onMovieSaved}
                        onMovieDelete={onMovieDelete}
                        savedMovies={savedMovies}
                        filmsOnRow={filmsOnRow}
                        countAddRows={countAddRows}
                    />
                    {filmsOnRow * countAddRows < searchedMovies.length
                        && <MoreFilmsButton handleMoreFilmsClick={handleMoreFilmsClick}/>}
                  </>
            }
            {
                isLoading && <Preloader />
            }
        </section>
    );
};

export default Movies;
