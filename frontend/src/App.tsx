import React from 'react';
import MainContent from "./components/MainContent/MainContent.tsx";
import Sidebar from "./components/SideBar/SideBar.tsx";
import './App.css';
import type {UrlData} from "./helpers/UrlData.ts";
import axios from "axios";
import {serverUrl} from "./helpers/Constants.ts";


const App: React.FC = () => {
    const [data, setData] = React.useState<UrlData[]>([]);
    const [reload, setReload] = React.useState<boolean>(false);

    const fetchTableData = async () => {
        const response = await axios.get(`${serverUrl}/shortUrl`);
        setData(response.data);
    };

    const updateReloadState = () => {
        setReload((prev) => !prev);
    };

    React.useEffect(() => {
        fetchTableData();
    }, [reload]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            fetchTableData();
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="app-container"
            style={{ height: '100vh', fontFamily: 'Inter, sans-serif' }}
        >
            <div className="flex-shrink-0" style={{ width: '250px' }}>
                <Sidebar updateReloadState={updateReloadState} data={data} />
            </div>

            <div className="flex-grow-1">
                <MainContent updateReloadState={updateReloadState} />
            </div>
        </div>
    );
}

export default App;
