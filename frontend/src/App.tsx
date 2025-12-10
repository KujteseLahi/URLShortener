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

    const updateReloadState = (): void => {
        setReload(true);
    };

    const fetchTableData = async () => {
        const response = await axios.get(`${serverUrl}/shortUrl`);
        console.log("The response from server is : ", response);
        setData(response.data);
        setReload(false);
    };

    React.useEffect(() => {
        fetchTableData();
    }, [reload]);
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
