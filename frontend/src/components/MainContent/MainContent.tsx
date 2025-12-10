import React, { useState } from 'react';
import ExpirationDropdown from "../DropDown/DropDown.tsx";
import Button from "../Button/Button.tsx";
import './MainContent.css';
import axios from 'axios';
import { serverUrl } from "../../helpers/Constants.ts";

interface MainContentProps {
    updateReloadState: () => void;
}

const expirationMapping: Record<string, number> = {
    "1 minute": 1 * 60 * 1000,
    "5 minutes": 5 * 60 * 1000,
    "30 minutes": 30 * 60 * 1000,
    "1 hour": 60 * 60 * 1000,
    "5 hours": 5 * 60 * 60 * 1000,
};


const MainContent: React.FC<MainContentProps> = ({ updateReloadState }) => {
    const [expiration, setExpiration] = useState('');
    const [fullUrl, setFullUrl] = useState<string>("");
    const [error, setError] = useState<string>("");


    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (!fullUrl) {
            setError("Please enter a URL.");
            return;
        }

        if (!isValidUrl(fullUrl)) {
            setError("Please enter a valid URL (must start with http or https).");
            return;
        }

        setError("");


        try {
            const expiresInMs = expiration ? expirationMapping[expiration] : null;
            const expirationDate = expiresInMs ? new Date(Date.now() + expiresInMs) : null;

            await axios.post(`${serverUrl}/shorturl`, {
                fullUrl,
                expiration: expirationDate,
            });

            setFullUrl("");
            setExpiration("");
            updateReloadState();
        } catch (err) {
            console.error(err);
        }
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFullUrl(value);

        if (!value) {
            setError("Please enter a URL.");
            return;
        }

        if (!isValidUrl(value)) {
            setError("Invalid URL format.");
            return;
        }

        setError("");
    };



    return (
        <form onSubmit={handleSubmit} className="app">
            <h2>URL</h2>

            <div className="main-content ">
                <div className="d-flex flex-column mb-4 input-wrapper">
                    <input
                        className="url-input form-control"
                        type="text"
                        placeholder="Paste the URL to be shortened"
                        value={fullUrl}
                        onChange={handleUrlChange}
                    />

                    {error && (
                        <p className="url-error">
                            {error}
                        </p>
                    )}
                    <Button />
                </div>
                <div className="d-flex flex-column mb-4">
                    <ExpirationDropdown
                        expiration={expiration}
                        setExpiration={setExpiration}
                    />
                </div>
            </div>
        </form>
    );
};

export default MainContent;
