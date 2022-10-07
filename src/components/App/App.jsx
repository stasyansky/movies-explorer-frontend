import React, { useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import useWindowSize from '../../hooks/useWindowSize';
import '../../index.css';
import './App.css';
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

function App() {

    const [name, setName] = useState("Виталий");
    const [currentUser, setCurrentUser] = useState({});
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
    const [isErrorOnRegister, setIsErrorOnRegister] = useState(false);

    const location = useLocation();
    const routesWithFooter = ['/', '/movies', '/saved-movies'];
    const pageWithFooter = routesWithFooter.includes(location.pathname);
    const routesWithHeader = ['/', '/movies', '/saved-movies', '/profile'];
    const pageWithHeader = routesWithHeader.includes(location.pathname);

    const windowSize = useWindowSize();
    const desktop = windowSize.width >= 1024;

    const handleMenuOpen = () => {
        setIsBurgerMenuOpen(true);
    }
    const handleMenuClose = () => {
        setIsBurgerMenuOpen(false);
    }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
            {pageWithHeader && <Header menuOpen={handleMenuOpen} desktop={desktop} />}
            <main>
                <Routes>
                    <Route path='/signin' element={<Login />} />
                    <Route path='/signup' element={<Register
                        errorRegister={isErrorOnRegister}
                        userName={name}
                        setName={setName}
                    />} />
                    <Route path='/profile' element={<Profile userName={name} />} />
                    <Route path='/movies' element={<Movies />} />
                    <Route path='/saved-movies' element={<SavedMovies />} />
                    <Route path='/' element={<Main />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>

            {pageWithFooter && <Footer/>}

            <MenuBurgerPopup
                isOpen={isBurgerMenuOpen}
                onClose={handleMenuClose}
            />
        </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
