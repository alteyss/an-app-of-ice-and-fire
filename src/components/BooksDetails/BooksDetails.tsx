import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import BookCard from '../BookCard/BookCard';
import useBook from '../../services/useBook';
import CharacterCard from '../CharacterCard/CharacterCard';
import Button from '../Button/Button';

const BooksDetails = () => {
    let navigate = useNavigate();
    let { bookId } = useParams();

    const [page, setPage] = useState(1);

    const {
        error,
        paginatedData,
        isLoading,
        hasNextPage,
        book,
    } = useBook({ bookId, page, pageSize: 6 });

    useEffect(() => {
        if (error) {
            let errorMessage = 'Une erreur est survenue...';

            if (error instanceof Error)
                errorMessage = error.message;

            toast.error(errorMessage);
        }
    }, [error]);

    if (!paginatedData && isLoading)
        return <div className='loading'>Chargement...</div>;

    const onClick = () => {
        setPage(oldPage => oldPage + 1);
    };

    const goBack = () => {
        navigate('/');
    };

    return (
        <div className='global-content-view'>
            <div className='list__button list__button--back'>
                <Button
                    text="< Retour"
                    onClick={goBack}
                />
            </div>

            <div className='list__header'>
                {
                    book ? (
                        <>
                            <h1>{book?.name}</h1>
                            <BookCard book={book} readonly={true} />
                            <h2>Les personnages</h2>
                        </>
                    ) : null
                }
            </div>

            <div className='list' data-testid="list-container">
                {paginatedData?.map((character, i) => <CharacterCard key={`character-${i}`} characterUrl={character} />)}
            </div>

            {
                hasNextPage ? (
                    <div className='list__button'>
                        <Button
                            text="Charger plus"
                            onClick={onClick}
                        />
                    </div>
                ) : null
            }
        </div>
    );
}

export default BooksDetails;
