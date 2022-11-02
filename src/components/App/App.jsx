import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { flushSync } from 'react-dom';
import useWindowSize from '../../hooks/useWindowSize';
import '../../index.css';
import './App.css';
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import * as auth from '../../utils/auth';
import {
    MOBILE_MAX_COUNT,
    TABLET_MIN_COUNT,
    TABLET_MAX_COUNT,
    DESCTOP_MAX_COUNT,
    SHORTMOVIE
} from '../../utils/constants';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import MenuBurgerPopup from "../MenuBurgerPopup/MenuBurgerPopup";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [isFirstLogin, setIsFirstLogin] = React.useState(false);
    const [errorLogin, setErrorLogin] = useState(false);
    const [currentUser, setCurrentUser] = useState(() => {
        const storageData = localStorage.getItem('userData');
        return storageData ? JSON.parse(storageData) : {};
    });
    const [url, setUrl] = useState(() => {
        const storageData = localStorage.getItem('currentUrl');
        return storageData ? storageData : '';
    });
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
    const [isEditSuccess, setIsEditSuccess] = useState(false);
    const [isErrorPostMovie, setIsErrorPostMovie] = useState(false);
    const [isErrorOnRegister, setIsErrorOnRegister] = useState(false);
    const [isErrorOnServer, setIsErrorOnServer] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchedMovies, setSearchedMovies] = useState(() => {
        const storageData = localStorage.getItem('searchedMovies-movies');
        return storageData ? JSON.parse(storageData) : [];
    });
    const [savedMovies, setSavedMovies] = useState(() => {
        const storageData = localStorage.getItem('savedMovies');
        return storageData ? JSON.parse(storageData) : [];
    });
    const [isChecked, setIsChecked] = useState(
        {checkedOnMovies: false, checkedOnSavedMovies: false}
    );
    const [errorPlaceholder, setErrorPlaceholder] = useState(
        {errorPlaceholderOnMovies: false, errorPlaceholderOnSavedMovies: false}
    );
    const [searchQuery, setSearchQuery] = useState(
        {searchQueryOnMovies: '', searchQueryOnSavedMovies: ''}
    );
    const [filmsOnRow, setFilmsOnRow] = useState(4);
    const [countAddRows, setCountAddRows] = useState(4);

    const location = useLocation();
    const navigate = useNavigate();
    const routesWithFooter = ['/', '/movies', '/saved-movies'];
    const pageWithFooter = routesWithFooter.includes(location.pathname);
    const routesWithHeader = ['/', '/movies', '/saved-movies', '/profile'];
    const pageWithHeader = routesWithHeader.includes(location.pathname);
    const routesWithoutAuth = ['/', '/signin', '/signup'];
    const windowSize = useWindowSize();
    const desktop = windowSize.width > 1023;

    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem("currentUrl", location.pathname);
        },1000);
        setUrl(localStorage.getItem('currentUrl'));
    },[location.pathname]);

    useEffect(() => {
        if(loggedIn && isFirstLogin) {
            setIsFirstLogin(!isFirstLogin);
            mainApi.getUserInfo()
                .then((userData) => {
                    setCurrentUser(userData);
                    localStorage.setItem('userData', JSON.stringify(userData));
                })
                .catch(err => console.error(err));
            mainApi.getSavedMovies()
                .then((movies) => {
                    setSavedMovies(movies);
                    localStorage.setItem('savedMovies', JSON.stringify(movies));
                })
                .catch(err => console.error(err));
        }
    }, [loggedIn, navigate]);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        auth.checkToken(token)
            .then(() => {
                mainApi.setNewToken();
                setLoggedIn(true);
                if(routesWithoutAuth.includes(location.pathname)) {
                    navigate('/movies');
                } else {
                    navigate(location.pathname);
                }
            })
            .catch((err) => {
                console.error(err);
                handleSignOut();
            });
    },[]);

    useEffect(() => {
        if (location.pathname === '/movies' || location.pathname === '/saved-movies') {
            if (windowSize.width >= 1280) {
                setFilmsOnRow(DESCTOP_MAX_COUNT);
                setCountAddRows(4);
            } else if (windowSize.width >= 1024 && windowSize.width < 1280) {
            setFilmsOnRow(TABLET_MAX_COUNT);
            setCountAddRows(3);
            } else if (windowSize.width >= 672 && windowSize.width < 1024) {
                setFilmsOnRow(TABLET_MIN_COUNT);
                setCountAddRows(4);
            } else {
                setFilmsOnRow(MOBILE_MAX_COUNT);
                setCountAddRows(5);
            }
        }
    }, [windowSize.width]);

    const handleMenuOpen = () => {
        setIsBurgerMenuOpen(true);
    }

    const handleMenuClose = () => {
        setIsBurgerMenuOpen(false);
    }

    const popupSuccessClose = () => {
        setIsEditSuccess(false);
        setIsErrorPostMovie(false);
    }

    function handleMoreFilmsClick() {
        if (windowSize.width >= 1280) {
            setCountAddRows(countAddRows + 1);
        } else if (windowSize.width >= 1024 && windowSize.width < 1280) {
            setCountAddRows(countAddRows + 1);
        } else if (windowSize.width >= 672 && windowSize.width < 1024) {
            setCountAddRows(countAddRows + 1);
        } else {
            setCountAddRows(countAddRows + 2);
        }
    }

    function handleSignIn({email, password}) {
        auth
            .onLogin({email, password})
            .then(() => {
                mainApi.setNewToken();
                setLoggedIn(true);
                setIsFirstLogin(true);
                navigate('movies');
            })
            .catch((err) => {
                setErrorLogin(true);
                console.error(err);
            })
    }

    function handleSignUp({name, email, password}) {
        auth
            .onRegister({name, email, password})
            .then(() => {
                handleSignIn({email, password});
            })
            .catch((err) => {
                console.error(err);
                setIsErrorOnRegister(true);
            });
    }

    function handleSignOut() {
        setLoggedIn(false);
        setIsFirstLogin(false);
        localStorage.clear();
        mainApi.setNewToken();
        setCurrentUser({});
        setSearchedMovies([]);
        navigate('/');
    }

    function handleEditProfile({ name, email }) {
        mainApi.editUserInfo({ name, email })
            .then((userInfo) => {
                flushSync(() => {
                    setCurrentUser(userInfo);
                });
                localStorage.setItem('userData', JSON.stringify(userInfo));
                setIsEditSuccess(true);
            })
            .catch((err) => console.error(err));
    }

    function filterSearchedMovies(checkedCheckbox, movies, query, path) {
        if (checkedCheckbox) {
            const searchMovies = movies.filter(item => {
                return (item.nameRU.toLowerCase().includes(query.toLowerCase()) && item.duration <= SHORTMOVIE)
                    ||
                    (item.nameEN.toLowerCase().includes(query.toLowerCase()) && item.duration <= SHORTMOVIE);
            });
            path === 'movies' ? setSearchedMovies(searchMovies) : setSavedMovies(searchMovies);
            localStorage.setItem(`searchedMovies-${path}`, JSON.stringify(searchMovies) || []);
        } else {
            const searchMovies = movies.filter(item => {
                return item.nameRU.toLowerCase().includes(query.toLowerCase())
                    ||
                    item.nameEN.toLowerCase().includes(query.toLowerCase());
            });
            path === 'movies' ? setSearchedMovies(searchMovies) : setSavedMovies(searchMovies);
            localStorage.setItem(`searchedMovies-${path}`, JSON.stringify(searchMovies) || []);
        }
        setTimeout(() => setIsLoading(false), 500);
    }

    function getMoviesOnServer(checkedCheckbox, query, path) {
        setIsLoading(true);
        moviesApi.getInitialMovies()
            .then((movies) => {
                localStorage.setItem('allMovies', JSON.stringify(movies));
                filterSearchedMovies(checkedCheckbox, movies, query, path);
                setIsErrorOnServer(false);
            })
            .catch((err) => {
                console.error(err);
                setIsErrorOnServer(true);
            })
            .finally(() => setIsLoading(false));
    }

    function getMoviesOnLocalStore(checkedCheckbox, query, path) {
        setIsLoading(true);
        const loadSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        const loadMovies = JSON.parse(localStorage.getItem('allMovies'));
        path === 'movies' ?
            filterSearchedMovies(checkedCheckbox, loadMovies, query, path)
        :
            filterSearchedMovies(checkedCheckbox, loadSavedMovies, query, path);
    }
    
    function handleSearchMovies(query, checkedCheckbox, path) {
        if (query) {
            localStorage.setItem(`searchQuery-${path}`, query);
            (localStorage.getItem('allMovies')) ?
                getMoviesOnLocalStore(checkedCheckbox, query, path)
            :
                getMoviesOnServer(checkedCheckbox, query, path)
        } else {
            path === 'movies' ?
                setErrorPlaceholder({...errorPlaceholder, errorPlaceholderOnMovies: true})
            :
                setErrorPlaceholder({...errorPlaceholder, errorPlaceholderOnSavedMovies: true});
        }
    }

    const handleToggleCheckbox = (e) => {
        const { name, checked } = e.target;
        if (name === 'movies') {
            setIsChecked({...isChecked, checkedOnMovies: checked});
            localStorage.setItem(`toggleCheckbox-${name}`, JSON.stringify(checked));
            const query = searchQuery.searchQueryOnMovies;
            handleSearchMovies(query, checked, name);
        } else {
            setIsChecked({...isChecked, checkedOnSavedMovies: checked});
            localStorage.setItem(`toggleCheckbox-${name}`, JSON.stringify(checked));
            const query = searchQuery.searchQueryOnSavedMovies;
            handleSearchMovies(query, checked, name);
        }
    }

    function handleSearchSavedMovies(query, checkedCheckbox, path) {
        if (query !== '') {
            localStorage.setItem(`searchQuery-${path}`, query);
            getMoviesOnLocalStore(checkedCheckbox, query, path);
        } else {
            setErrorPlaceholder({...errorPlaceholder, errorPlaceholderOnSavedMovies: true})
        }
    }

    function handleMovieSaved(movie) {
        mainApi.postSavedMovie(movie)
            .then((savedMovie) => {
                flushSync(() => {
                    setSavedMovies([...savedMovies, savedMovie]);
                });
                const moviesArr = JSON.parse(localStorage.getItem('savedMovies'));
                localStorage.setItem('savedMovies', JSON.stringify([...moviesArr, savedMovie]));
            })
            .catch((err) => {
                console.error(err);
                setIsErrorPostMovie(true);
            });
    }

    function handleMovieDelete(movieToDelete) {
        const _id = movieToDelete._id || savedMovies.find(m => m.movieId === movieToDelete.id)?._id;
        mainApi.deleteSavedMovie(_id)
            .then(() => {
                flushSync(() => {
                    setSavedMovies(prevState => prevState.filter(m => m._id !== _id));
                });
                const moviesArr = JSON.parse(localStorage.getItem('savedMovies'));
                localStorage.setItem('savedMovies', JSON.stringify(moviesArr.filter(m => m._id !== _id)));
            })
            .catch((err) => console.error(err));
    }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
            {pageWithHeader && <Header menuOpen={handleMenuOpen} desktop={desktop} loggedIn={loggedIn} />}
            <main className="main">
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='signin' element={<Login
                        handleSignIn={handleSignIn}
                        errorLogin={errorLogin} />}
                    />
                    <Route path='signup' element={<Register
                        errorRegister={isErrorOnRegister}
                        handleSignUp={handleSignUp} />}
                    />
                    <Route element={<ProtectedRoute isLogin={loggedIn} />}>
                        <Route path='profile' element={<Profile
                            handleSignOut={handleSignOut}
                            isEditSuccess={isEditSuccess}
                            onClose={popupSuccessClose}
                            setIsEditSuccess={setIsEditSuccess}
                            handleEditProfile={handleEditProfile} />}
                        />
                        <Route path='movies' element={<Movies
                            filmsOnRow={filmsOnRow}
                            countAddRows={countAddRows}
                            handleMoreFilmsClick={handleMoreFilmsClick}
                            handleSearchMovies={handleSearchMovies}
                            onMovieSaved={handleMovieSaved}
                            onMovieDelete={handleMovieDelete}
                            searchedMovies={searchedMovies}
                            savedMovies={savedMovies}
                            isLoading={isLoading}
                            isChecked={isChecked}
                            setIsChecked={setIsChecked}
                            handleToggle={handleToggleCheckbox}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            errorPlaceholder={errorPlaceholder}
                            setErrorPlaceholder={setErrorPlaceholder}
                            isErrorOnServer={isErrorOnServer}
                            isErrorPostMovie={isErrorPostMovie}
                            onClose={popupSuccessClose}/>}
                        />
                        <Route path='saved-movies' element={<SavedMovies
                            filmsOnRow={filmsOnRow}
                            countAddRows={countAddRows}
                            handleMoreFilmsClick={handleMoreFilmsClick}
                            handleSearchSavedMovies={handleSearchSavedMovies}
                            onMovieDelete={handleMovieDelete}
                            savedMovies={savedMovies}
                            setSavedMovies={setSavedMovies}
                            isLoading={isLoading}
                            isChecked={isChecked}
                            setIsChecked={setIsChecked}
                            handleToggle={handleToggleCheckbox}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            errorPlaceholder={errorPlaceholder}
                            setErrorPlaceholder={setErrorPlaceholder}
                            isErrorOnServer={isErrorOnServer} />}
                        />
                    </Route>
                    <Route path="*" element={<NotFoundPage path={url} />} />
                </Routes>
            </main>
            {pageWithFooter && <Footer/>}
            <MenuBurgerPopup isOpen={isBurgerMenuOpen} onClose={handleMenuClose} />
        </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
