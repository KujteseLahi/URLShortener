import './Sidebar.css';
import herImage from '../../img/anchorup.png';
import type { UrlData } from "../../helpers/UrlData.ts";
import React from "react";
import { BiTrash } from "react-icons/bi";
import axios from "axios";
import { serverUrl } from "../../helpers/Constants.ts";

interface SidebarProps {
    data: UrlData[];
    updateReloadState: () => void;
}

const SideBar: React.FC<SidebarProps> = ({ data, updateReloadState }) => {
    console.log("Data in SideBar is ", data);


    const deleteUrl = async (id: string) => {
        try {
            const response = await axios.delete(`${serverUrl}/shortUrl/${id}`);
            console.log("Deleted:", response.data);
            updateReloadState();
        } catch (error) {
            console.error("Error deleting URL:", error);
        }
    };



    return (
        <div className="container">
            <div className="sidebar">
                <img
                    src={herImage}
                    alt="logo"
                    style={{ width: "170px", height: "auto" }}
                />
                <h3 className="mb-4" style={{ color: 'black' }}>My shortened URLs</h3>
                <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                    {data.map((item) => {
                        const isExpired = item.expiration ? new Date(item.expiration) < new Date() : false;

                        return (
                            <li key={item._id} className="d-flex flex-column mb-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <a
                                        href={isExpired ? undefined : `${item.fullUrl}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="sidebar-link"
                                        style={{
                                            color: isExpired ? "#6c757d" : "#0d6efd",
                                            textDecoration: isExpired ? "line-through" : "underline",
                                            pointerEvents: isExpired ? "none" : "auto",
                                            fontWeight: 500,
                                            cursor: isExpired ? "not-allowed" : "pointer",

                                        }}
                                        aria-disabled={isExpired}
                                    >
                                        {item.shortUrl}
                                    </a>

                                    <BiTrash
                                        role="button"
                                        size={15}
                                        style={{ cursor: "pointer", color: "grey", marginLeft: "8px" }}
                                        onClick={() => deleteUrl(item._id)}
                                    />

                                </div>

                                <p
                                    style={{
                                        fontSize: "14px",
                                        color: "#9bb7f4",
                                        marginTop: "2px",
                                        marginBottom: "0",
                                    }}
                                >
                                    This link has been clicked {item.clicks} {item.clicks === 1 ? "time" : "times"}.
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
