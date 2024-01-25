class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=16c589ca0e04266dbd56046ec8008f68';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    }

    getACharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
    }
}

export default MarvelService;
