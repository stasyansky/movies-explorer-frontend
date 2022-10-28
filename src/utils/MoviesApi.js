class MoviesApi {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _errorHandler = async (res) => {
        if (res.ok) {
            return res.json();
        }
        let errorText = res.status;
        const responseData = await res.json();

        throw new Error(`Ошибка: ${responseData?.message || errorText}`);
    }

    getInitialMovies() {
        return fetch(`${this._url}`, {
            method: 'GET',
            headers: this._headers
        }).then(this._errorHandler);
    }
}

const moviesApi = new MoviesApi({
    url: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json',
    }
});
export default moviesApi;
