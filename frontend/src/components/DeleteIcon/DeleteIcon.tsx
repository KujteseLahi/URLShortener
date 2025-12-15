import React from "react";
import { BiTrash } from "react-icons/bi";

type DeleteIconProps = {
    onClick: () => void;
    size?: number;
    color?: string;
    disabled?: boolean;
};

const DeleteIcon: React.FC<DeleteIconProps> = ({
    onClick,
    size = 17,
    color = "grey",
    disabled = false,
                                                  }) => {

    return (
        <BiTrash
            role="button"
            size={size}
            style={{
                cursor: disabled ? "not-allowed" : "pointer",
                color: disabled ? "#adb5bd" : color,
                marginLeft: "10px",
            }}
            onClick={disabled ? undefined : onClick}
            aria-disabled={disabled}
        />
    );
};

export default DeleteIcon;
