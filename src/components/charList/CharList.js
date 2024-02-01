import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false,
            error:false
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    createCharList = (charList) => {
        const itemsList = [];

        charList.forEach(({ thumbnail, name, id }) => {
            const style = thumbnail.includes('image_not_available') ? 'unset' : 'cover';
            
            itemsList.push(
                <li key={id}
                    className="char__item"
                    onClick={() => this.props.onCharSelected(id)}>
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
        const { charList, error, loading } = this.state;

        const list = this.createCharList(charList);
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? list : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;
