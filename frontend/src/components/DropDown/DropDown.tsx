import { useState } from "react";
import './DropDown.css';
interface ExpirationDropdownProps {
    expiration: string;
    setExpiration: (value: string) => void;
}

const ExpirationDropdown: React.FC<ExpirationDropdownProps> = ({
                                                                   expiration,
                                                                   setExpiration,
                                                               }) => {
    const [open, setOpen] = useState(false);
    const items = ["1 minute", "5 minutes", "30 minutes", "1 hour", "5 hours"];

    return (
        <div className="position-relative" style={{ minWidth: "320px" }}>
            <button
                type="button"
                className="expiration-btn"
                style={{ height: "50px" }}
                onClick={() => setOpen(!open)}
            >
                {expiration || "Add expiration date"}
                <span className="ms-2 bi bi-caret-down-fill"></span>
            </button>

            {open && (
                <div
                    className=" expiration-menu"
                >
                    {items.map((item) => (
                        <div
                            key={item}
                            className="expiration-item"
                            role="button"
                            onClick={() => {
                                setExpiration(item);
                                setOpen(false);
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExpirationDropdown;
