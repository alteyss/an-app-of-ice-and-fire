import { CoverSize } from '../models';

type Props = {
    isbn: string,
    size: CoverSize,
};

const DEFAULT_SIZE = CoverSize.L;

const useCover = ({ isbn, size = DEFAULT_SIZE }: Props) => {
    return `${process.env.REACT_APP_COVER_SERVICE}/b/isbn/${isbn}-${size}.jpg`;
};

export default useCover;