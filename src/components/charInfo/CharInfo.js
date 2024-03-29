import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const { getACharacter, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateChar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.id]);

    const updateChar = () => {
        const { id } = props;

        if (!id) return;

        clearError();
        getACharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data;

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
