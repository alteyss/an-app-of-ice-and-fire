import { parseLinkHeader } from '@web3-storage/parse-link-header';
import axios from 'axios';
import { Book } from '../models';

export const fetchBook = (bookId: string | undefined): Promise<Book> => {
    return axios
        .get(`${process.env.REACT_APP_API_BASE}/books/${bookId}`)
        .then((res) => res?.data);
};


export const fetchBooks = (pageParam: number, pageSize: number) => {
    return axios
        .get(`${process.env.REACT_APP_API_BASE}/books?page=${pageParam}&pageSize=${pageSize}`)
        .then((res) => {
            const links = parseLinkHeader(res.headers.link);
            const isLastPage = pageParam === +(links?.last?.page ?? 1);

            return {
                data: res?.data,
                pageInfo: {
                    isLastPage,
                    pageParam,
                },
            };
        });
};
