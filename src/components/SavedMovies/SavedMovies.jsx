import React, { useEffect } from 'react';
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
    setSavedMovies,
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

    useEffect(() => {
        const savedMoviesArr = JSON.parse(localStorage.getItem('savedMovies'));
        setSavedMovies(savedMoviesArr);
    }, []);

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
            {isErrorOnServer && <WithoutFoundResult isErrorOnServer={isErrorOnServer} />}
            {
                (savedMovies.length === 0 && !isErrorOnServer)
                ? <WithoutFoundResult />
                : <>
                    <MoviesCardList
                        savedMovies={savedMovies}
                        onMovieDelete={onMovieDelete}
                        filmsOnRow={filmsOnRow}
                        countAddRows={countAddRows}
                    />
                    {filmsOnRow * countAddRows < savedMovies.length
                        && <MoreFilmsButton handleMoreFilmsClick={handleMoreFilmsClick}/>
                    }
                  </>
            }
            {
                isLoading && <Preloader />
            }
        </section>
    );
};

export default SavedMovies;
