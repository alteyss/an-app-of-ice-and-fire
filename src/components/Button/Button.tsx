import React, { MouseEventHandler } from 'react';

type Props = {
    text: string
    disabled?: boolean
    onClick: MouseEventHandler<HTMLButtonElement>
};

const Button = ({ text, disabled = false, onClick }: Props) => {
    return (
        <button 
            onClick={onClick}
            className={`button ${disabled ? 'button--disabled' : 'button--active' }`}
            disabled={disabled}
        >{ text }</button>
    );
};

export default Button;