import React, { useEffect, useMemo } from 'react';
import useCharacter from '../../services/useCharacter';
import { connect } from 'react-redux';
import { addFavorite, FavoritesState, removeFavorite } from '../../redux/reducer';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

type Props = {
    characterUrl: string,
    favoriteCharacters?: string[],
    addFavorite?: ActionCreatorWithPayload<any, string>,
    removeFavorite?: ActionCreatorWithPayload<any, string>,
};

const CharacterCard = ({
    characterUrl,
    favoriteCharacters,
    addFavorite,
    removeFavorite
}: Props) => {
    const {
        error,
        data,
        isLoading,
    } = useCharacter({ characterUrl });

    useEffect(() => {
        if (error) {
            let errorMessage = 'Une erreur est survenue...';

            if (error instanceof Error)
                errorMessage = error.message;

            toast.error(errorMessage);
        }
    }, [error]);

    const isInFavorites = useMemo(() => {
        return favoriteCharacters?.find(e => e === characterUrl)
            ? true
            : false;
    }, [favoriteCharacters, characterUrl]);

    if (isLoading)
        return <div className='loading'>Chargement...</div>;

    return (
        <div className='card card--readonly'>
            <div className='card__details'>
                <div className='card__name'>{data?.name ? data.name : '[Aucun nom]'}</div>
                <div className='card__info card__info--date'>Naissance : {data?.born ? data.born : 'n/d'}</div>
                <div className='card__info card__info--date'>Mort : {data?.died ? data.died : 'n/d'}</div>
                <div className='card__tag'>
                    <span>{data?.gender ?? 'Aucun genre'}</span>
                </div>

                <div>
                    <span className='card__link' onClick={() => {
                        if (removeFavorite && isInFavorites) {
                            removeFavorite(characterUrl);
                            toast.success('Retiré !', { autoClose: 1000 });
                        } else if (addFavorite && !isInFavorites) {
                            addFavorite(characterUrl);
                            toast.success('Ajouté !', { autoClose: 1000 });
                        }
                    }}>
                        { isInFavorites ? 'Retirer des favoris 💔' : 'Ajouter aux favoris 💖' }
                    </span>
                </div>

                <div className='card__pages'>
                    <span>Dans {data?.books?.length ?? 0} livre{(data?.books?.length ?? 0) > 1 ? 's' : ''}</span>
                </div>
            </div>
        </div>
    );
}

const mapState = (state: { favorites: FavoritesState }) => state;

const actionCreators = {
    addFavorite,
    removeFavorite,
};

const ConnectedCharacterCard = connect(
    mapState,
    actionCreators,
)(CharacterCard);

export default ConnectedCharacterCard;
