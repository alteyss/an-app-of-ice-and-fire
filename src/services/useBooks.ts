import { useInfiniteQuery } from 'react-query';
import { Response } from '../models';
import { fetchBooks } from '../api/book';

type Props = {
    pageSize: number
};

const DEFAULT_PAGE_SIZE = 6;

const useBooks = ({ pageSize = DEFAULT_PAGE_SIZE }: Props) => {
    // Server pagination

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery<Response>(['books'], ({ pageParam = 1 }) => fetchBooks(pageParam, pageSize), {
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.pageInfo.isLastPage)
                return undefined;

            return lastPage.pageInfo.pageParam + 1;
        },
    });

    return {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    };
};

export default useBooks;