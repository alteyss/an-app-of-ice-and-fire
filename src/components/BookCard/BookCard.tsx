import React from 'react';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { Book, CoverSize } from '../../models';
import useCover from '../../services/useCover';

type Props = {
    book: Book,
    readonly?: boolean,
};

const BookCard = ({ book, readonly }: Props) => {
    let navigate = useNavigate();

    const cover = useCover({ isbn: book?.isbn, size: CoverSize.L });

    const onClick = () => {
        let urlSplit = book?.url.split('/');
        navigate(`/${urlSplit[urlSplit.length - 1]}`);
    };

    return (
        <div className={readonly ? 'card card--readonly' : 'card'} onClick={onClick}>
            <div className='card__image'>
                <div style={{
                    backgroundImage: `url(${cover})`
                }} />
            </div>

            <div className='card__details'>
                <div className='card__name'>{book.name ?? 'Aucun nom'}</div>
                <div className='card__info card__info--date'>{moment(book?.released).format('DD/MM/YYYY')}</div>
                <div className='card__info'>{book?.authors.join(', ')}</div>
                <div className='card__tag'>
                    <span>{book?.isbn ?? 'Aucun isbn'}</span>
                </div>
                <div className='card__pages'>
                    <span>{book?.numberOfPages ?? 0} page{(book?.numberOfPages ?? 0) > 1 ? 's' : ''}</span>
                </div>
            </div>
        </div>
    );
}

export default BookCard;
