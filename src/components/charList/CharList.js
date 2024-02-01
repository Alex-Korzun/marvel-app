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
            .catch(this.onError)
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

    render() {
        const { charList, error, loading } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View charList={charList} /> : null;

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

const View = ({charList}) => {
    const itemsList = [];

    charList.forEach(({ thumbnail, name, id }) => {
        const style = thumbnail.includes('image_not_available') ? 'contain' : 'cover';
        itemsList.push(
            <li key={id} className="char__item">
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

export default CharList;
