import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError);
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setLoading(false);
        setError(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const refs = useRef([]);

    const focusOnItem = (index) => {
        refs.current.forEach(element => element.classList.remove('char__item_selected'));
        refs.current[index].classList.add('char__item_selected');
        refs.current[index].focus();
    }

    function createCharList(charList) {
        const itemsList = [];

        charList.forEach(({ thumbnail, name, id }, index) => {
            const style = thumbnail.includes('image_not_available') ? 'unset' : 'cover';

            itemsList.push(
                <li key={id}
                    tabIndex={0}
                    className="char__item"
                    onClick={() => {
                        props.onCharSelected(id);
                        focusOnItem(index);
                    }}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            props.onCharSelected(id);
                            focusOnItem(index);
                        }
                    }}
                    ref={element => refs.current[index] = element}>
                    <img src={thumbnail} style={ {objectFit: `${style}`} } alt={name}/>
                    <div className="char__name">{name}</div>
                </li>)

        });

        return (
            <ul className="char__grid">
                {itemsList}
            </ul>
        )
    }

    const list = createCharList(charList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? list : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;
