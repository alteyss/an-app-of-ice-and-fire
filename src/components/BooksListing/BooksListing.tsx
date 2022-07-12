import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import useBooks from '../../services/useBooks';
import BookCard from '../BookCard/BookCard';
import Button from '../Button/Button';

const BooksListing = () => {
    const { 
        error, 
        data, 
        hasNextPage, 
        isFetching, 
        fetchNextPage,
    } = useBooks({ pageSize: 6 });

    useEffect(() => {
        if (error)
            toast.error((error as Error)?.message ?? 'Une erreur est survenue...');
    }, [error]);

    if (!data && isFetching)
        return <div className='loading'>Chargement...</div>;

    return (
        <div className='global-content-view'>
            <div className='list__header'>
             <h1>Tous les livres</h1>
            </div>

            <div className='list' data-testid="list-container">
                { data?.pages.map((page, i) => page.data.map((book, f) => <BookCard key={`book-${f}`} book={book} />)) }
            </div>

            {
                hasNextPage ? (
                    <div className='list__button'>
                        <Button
                            text="Charger plus"
                            disabled={isFetching}
                            onClick={() => fetchNextPage()}
                        />
                    </div>
                ) : null
            }
        </div>
    );
}

export default BooksListing;
