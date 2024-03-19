import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

    const { request, clearError, process, setProcess } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=16c589ca0e04266dbd56046ec8008f68';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComic);
    }

    const getACharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getACharacterByName = async (charName) => {
        const res = await request(`${_apiBase}characters?name=${charName}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComic(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'Description for this character is not provided',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description || 'Description for this comic is not provided',
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            price: comic.prices[0].price ? `${comic.prices[0].price}$` : 'NOT AVAILABLE',
            pageCount: comic.pageCount ? `${comic.pageCount} pages` : 'Information about amount of pages is not available for this comic',
            language: comic.textObjects[0]?.language || 'en-us'
        }
    }

    return {getAllCharacters, getACharacter, clearError, getAllComics, getAComic, getACharacterByName, process, setProcess}
}

export default useMarvelService;
