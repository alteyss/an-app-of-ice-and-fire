import { useQuery } from 'react-query';
import { Character } from '../models/Character';
import { fetchCharacter } from '../api/character';

const API = (process.env.REACT_APP_API_BASE ?? '');

type Props = {
    characterUrl: string,
};

const useCharacter = ({ characterUrl }: Props) => {
    const {
        data,
        error,
        isLoading
    } = useQuery<Character>(['character', characterUrl.replace(API, '')], () => fetchCharacter(characterUrl));

    return {
        data,
        error,
        isLoading,
    };
};

export default useCharacter;