import axios from 'axios';

export const fetchCharacter = (characterUrl: string) => {
    return axios
        .get(characterUrl)
        .then((res) => res?.data);
};
