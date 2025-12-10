import './Sidebar.css';
import herImage from '../../img/anchorup.png';
import type { UrlData } from "../../helpers/UrlData.ts";
import React from "react";
import { BiTrash } from "react-icons/bi";
import axios from "axios";
import { serverUrl } from "../../helpers/Constants.ts";
import { QRCodeCanvas } from 'qrcode.react';

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
                                    <span
                                        onClick={async () => {
                                            if (isExpired) return;
                                            try {
                                                await axios.post(`${serverUrl}/shortUrl/click/${item._id}`);
                                                window.open(item.fullUrl, "_blank");
                                                updateReloadState();
                                            } catch (err) {
                                                console.error(err);
                                            }
                                        }}
                                        className="sidebar-link"
                                        style={{
                                            color: isExpired ? "#6c757d" : "#0d6efd",
                                            textDecoration: isExpired ? "line-through" : "underline",
                                            cursor: isExpired ? "not-allowed" : "pointer",
                                            fontWeight: 500,
                                        }}
                                        aria-disabled={isExpired}
                                    >
                                         {item.shortUrl}
                                    </span>

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
                                <div style={{ marginTop: "8px" }}>
                                    <QRCodeCanvas
                                        value={`${item.fullUrl}`}
                                        size={100}
                                        level="L"
                                    />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
