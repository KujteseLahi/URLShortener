import React from "react";
import './Input.css';

type InputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
};

const Input: React.FC<InputProps> = ({ value, onChange,error }) => {
    return (
        <>
        <input
            className="url-input form-control"
            type="text"
            placeholder="Paste the URL to be shortened"
            value={value}
            onChange={onChange}
        />
    {error && (
        <p className="url-error">
            {error}
        </p>

    )}
        </>
    );
};

export default Input;