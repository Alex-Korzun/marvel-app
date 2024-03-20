import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import AppBanner from "../appBanner/AppBanner";
import setContent from "../../utils/setContent";

const SinglePageTemplate = ({ Component, type }) => {

    const { id } = useParams();
    const [data, setData] = useState(null);

    const { getAComic, clearError, getACharacter, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateComic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const updateComic = () => {
        clearError();

        switch (type) {
            case 'comic' :
                getAComic(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                break;
            case 'char' :
                getACharacter(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                break;
            default : 
                throw new Error('Type of Single Page is incorrect');
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }
    
    return (
        <>
            <AppBanner />
            {setContent(process, Component, data)}
        </>
    )
}

export default SinglePageTemplate;
