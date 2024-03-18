import { useState, useEffect, Component } from "react";
import { useParams } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import AppBanner from "../appBanner/AppBanner";

const SinglePageTemplate = ({ Component, type }) => {

    const { id } = useParams();
    const[data, setData] = useState(null);

    const { loading, error, getAComic, clearError, getACharacter } = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [id]);

    const updateComic = () => {
        clearError();

        switch (type) {
            case 'comic' :
                getAComic(id)
                    .then(onDataLoaded)
                break;
            case 'char' :
                getACharacter(id)
                    .then(onDataLoaded);
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data} /> : null;
    
    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePageTemplate;
