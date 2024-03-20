import { useState, useEffect, useRef, useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting' :
            return <Spinner />;
        case 'loading' :
            return newItemLoading ? <Component /> : <Spinner />;
        case 'confirmed' :
            return <Component />;
        case 'error' :
            return <ErrorMessage />;
        default :
            throw new Error('Unexpected process state');
    }
}

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const { getAllCharacters, process, setProcess } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
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
                <CSSTransition timeout={200} classNames='char__item'>
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
                    </li>
                </CSSTransition>
            )
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {itemsList}
                </TransitionGroup>
            </ul>
        )
    }

    const elements = useMemo(() => {
        return setContent(process, () => createCharList(charList), newItemLoading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [process]);

    return (
        <div className="char__list">
            {elements}
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
