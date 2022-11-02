import React from 'react';
import { useLocation } from "react-router-dom";
import './FilterCheckbox.css';

const FilterCheckbox = ({
    handleToggle,
    pathCheckbox,
    isChecked
}) => {

    const location = useLocation();
    const handleToggleCheckbox = (e) => {
        handleToggle(e);
    }

    return (
        <>
            {location.pathname === '/movies' ? (
                <>
                    <input
                        checked={isChecked.checkedOnMovies}
                        onChange={handleToggleCheckbox}
                        className="react-switch-checkbox"
                        id={`react-switch-new`}
                        name={pathCheckbox}
                        type="checkbox"
                    />
                    <label
                        style={{ background: isChecked.checkedOnMovies && '#3DDC84' }}
                        className="react-switch-label"
                        htmlFor={`react-switch-new`}
                    >
                        <span className={`react-switch-button`} />
                    </label>
                </>
            ) : (
                <>
                    <input
                        checked={isChecked.checkedOnSavedMovies}
                        onChange={handleToggleCheckbox}
                        className="react-switch-checkbox"
                        id={`react-switch-new`}
                        name={pathCheckbox}
                        type="checkbox"
                    />
                    <label
                        style={{ background: isChecked.checkedOnSavedMovies && '#3DDC84' }}
                        className="react-switch-label"
                        htmlFor={`react-switch-new`}
                    >
                        <span className={`react-switch-button`} />
                    </label>
                </>
            )}
        </>
    );
};

export default FilterCheckbox;
