import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const { loading, error, getACharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.id]);

    const updateChar = () => {
        const { id } = props;

        if (!id) return;

        clearError();
        getACharacter(id)
            .then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    const style = thumbnail.includes('image_not_available') ? 'contain' : 'cover';

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} style={{ objectFit: `${style}` }} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.length === 0 ? 'There are no comics that contain this character.' :
                        comics.map((item, i) => {
                            // eslint-disable-next-line array-callback-return
                            if (i >= 10) return;
                            return (
                                <li key={i}
                                    className="char__comics-item">
                                        {item.name}
                                </li>
                            )
                        })
                }
                
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    id: PropTypes.number
}

export default CharInfo;
