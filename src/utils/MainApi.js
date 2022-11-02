class MainApi {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    setNewToken() {
        this._headers = {
            ...this._headers,
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        };
    }

    _errorHandler = async (res) => {
        if (res.ok) {
            return res.json();
        }

        let errorText = res.status;
        const responseData = await res.json();

        if (res.status === 400) {
            errorText = responseData?.validation?.body?.message || "400 — Токен не передан или передан не в том формате";
        } else if (res.status === 401) {
            errorText = "401 — Переданный токен некорректен";
        }

        throw new Error(`Ошибка: ${responseData?.message || errorText}`);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        }).then(this._errorHandler);
    }

    editUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        }).then(this._errorHandler);
    }

    postSavedMovie(movie) {
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                trailerLink: movie.trailerLink,
                thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
            })
        }).then(this._errorHandler);
    }

    deleteSavedMovie(id) {
        return fetch(`${this._url}/movies/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._errorHandler);
    }

    getSavedMovies() {
        return fetch(`${this._url}/movies`, {
            method: 'GET',
            headers: this._headers,
        }).then(this._errorHandler);
    }
}

const mainApi = new MainApi({
    url: 'https://api.movies2explorer.nomoredomains.sbs',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
    }
});
export default mainApi;
