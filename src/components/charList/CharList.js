import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    myRefs = [];

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest(offset) {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({ offset, charList }) => ({
                charList: [...charList, ...newCharList],
                loading: false,
                error:false,
                newItemLoading: false,
                offset: offset + 9,
                charEnded: ended
            }));
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    setRefs = (ref) => {
        this.myRefs.push(ref)
    }

    focusOnItem = (index) => {
        this.myRefs.forEach(element => element.classList.remove('char__item_selected'));
        this.myRefs[index].classList.add('char__item_selected');
        this.myRefs[index].focus();
    }

    createCharList = (charList) => {
        const itemsList = [];

        charList.forEach(({ thumbnail, name, id }, index) => {
            const style = thumbnail.includes('image_not_available') ? 'unset' : 'cover';

            itemsList.push(
                <li key={id}
                    tabIndex={0}
                    className="char__item"
                    onClick={() => {
                        this.props.onCharSelected(id);
                        this.focusOnItem(index);
                    }}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            this.props.onCharSelected(id);
                            this.focusOnItem(index);
                        }
                    }}
                    ref={this.setRefs}>
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

    render() {
        const { charList, error, loading, offset, newItemLoading, charEnded } = this.state;

        const list = this.createCharList(charList);
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
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;
