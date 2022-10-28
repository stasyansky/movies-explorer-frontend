import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import './SearchForm.css';
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

const SearchForm = ({
    handleSearchMovies,
    handleSearchSavedMovies,
    isChecked,
    setIsChecked,
    handleToggle,
    searchQuery,
    setSearchQuery,
    errorPlaceholder,
    setErrorPlaceholder
}) => {

    const location = useLocation();
    const [path, setPath] = useState(location.pathname.substring(1).replace(/-/g,""));

    useEffect(() => {
        setPath(location.pathname.substring(1).replace(/-/g,""));
    },[path]);

    useEffect(() => {
        const toggleCheckbox = JSON.parse(localStorage.getItem(`toggleCheckbox-${path}`));
        if (toggleCheckbox) {
            path === 'movies' ?
                setIsChecked({...isChecked, checkedOnMovies: toggleCheckbox})
            :
                setIsChecked({...isChecked, checkedOnSavedMovies: toggleCheckbox});
        }
        const query = localStorage.getItem(`searchQuery-${path}`);
        if (query) {
            path === 'movies' ?
                setSearchQuery({...searchQuery, searchQueryOnMovies: query})
            :
                setSearchQuery({...searchQuery, searchQueryOnSavedMovies: query})
        }
    },[]);

    const handleSetSearchQuery = (e) => {
        if (path === 'movies') {
            setErrorPlaceholder({...errorPlaceholder, errorPlaceholderOnMovies: false})
            setSearchQuery({...searchQuery, searchQueryOnMovies: e.target.value});
        } else {
            setErrorPlaceholder({...errorPlaceholder, errorPlaceholderOnSavedMovies: false})
            setSearchQuery({...searchQuery, searchQueryOnSavedMovies: e.target.value});
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (path === 'movies') {
            handleSearchMovies(searchQuery.searchQueryOnMovies, isChecked.checkedOnMovies, path)
        } else {
            handleSearchSavedMovies(searchQuery.searchQueryOnSavedMovies, isChecked.checkedOnSavedMovies, path);
        }
    }

    return (
        <div className="search">
            <form className="search__container" onSubmit={handleSubmit} noValidate>
                {path === 'movies' ? (
                    <input
                        type="text"
                        name="inputSearchMovie"
                        className="search__input"
                        placeholder={errorPlaceholder.errorPlaceholderOnMovies ? 'Нужно ввести ключевое слово' : 'Фильм'}
                        value={searchQuery.searchQueryOnMovies}
                        onChange={handleSetSearchQuery}
                        autoComplete="off"
                    />
                ) : (
                    <input
                        type="text"
                        name="inputSearchMovie"
                        className="search__input"
                        placeholder={errorPlaceholder.errorPlaceholderOnSavedMovies ? 'Нужно ввести ключевое слово' : 'Фильм'}
                        value={searchQuery.searchQueryOnSavedMovies}
                        onChange={handleSetSearchQuery}
                        autoComplete="off"
                    />
                )}
                <button className="search__btn" type="submit"></button>
            </form>
            <div className="search__short">
                <FilterCheckbox
                    isChecked={isChecked}
                    handleToggle={handleToggle}
                    pathCheckbox={path}/>
                <p className="search__short_text">Короткометражки</p>
            </div>
        </div>
    );
};

export default SearchForm;
