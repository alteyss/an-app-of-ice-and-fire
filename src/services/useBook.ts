import { useQuery } from 'react-query';
import { useMemo, useState } from 'react';
import { Book } from '../models';
import { fetchBook } from '../api/book';

type Props = {
    bookId: string | undefined,
    page: number,
    pageSize: number
};

const DEFAULT_PAGE_SIZE = 6;

const useBook = ({ bookId, page = 1, pageSize = DEFAULT_PAGE_SIZE }: Props) => {
    // Local pagination

    const [hasNextPage, setHasNextPage] = useState(false);

    const {
        data,
        error,
        isLoading,
    } = useQuery<Book>(['book', bookId], () => fetchBook(bookId));

    const paginatedData = useMemo(() => {
        if (!data)
            return null;

        const end = page * pageSize;

        if (end >= data.characters.length) {
            setHasNextPage(false);
            return data.characters;
        }

        setHasNextPage(true);
        return data.characters.slice(0, end);
    }, [data, page, pageSize]);

    return {
        paginatedData,
        error,
        isLoading,
        hasNextPage,
        book: data
    };
};

export default useBook;
