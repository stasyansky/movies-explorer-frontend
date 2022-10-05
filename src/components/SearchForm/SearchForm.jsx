import React, { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

const SearchForm = () => {
    const [searchMovie, setSearchMovie] = useState('');
    const [value, setValue] = useState(false);

    return (
        <div className="search">
            <form className="search__container">
                <input
                    type="text"
                    name="inputSearchMovie"
                    className="search__input"
                    placeholder="Фильм"
                    value={searchMovie}
                    onChange={e => setSearchMovie(e.target.value)}
                    required
                    autoComplete="off"
                />
                <button className="search__btn" type="submit"></button>
            </form>
            <div className="search__short">
                <FilterCheckbox isOn={value} handleToggle={() => setValue(!value)} />
                <p className="search__short_text">Короткометражки</p>
            </div>
        </div>
    );
};

export default SearchForm;
