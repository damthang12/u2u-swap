import React from "react";
import "./App.css";
import {Web3ReactProvider} from "@web3-react/core";
import {ethers} from "ethers";
import {Outlet, useNavigate} from "react-router-dom";
import Header from "./components/header/header";
import MainLayout from "./components/layouts/mainLayout";
import {useEffect} from "react";
import {PAGE_ROUTES} from "./constants/pageRoutes";
import Footer from "./components/footer/footer";

function getLibrary(provider: any) {
    return new ethers.providers.Web3Provider(provider);
}

function App() {
    const token = window.localStorage.getItem("isTokenForTrain");
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate(`${PAGE_ROUTES.STAKE}`);
        }
    }, []);
    return (

        <Web3ReactProvider getLibrary={getLibrary}>
            {!token ? <></> : <Header/>}
            <MainLayout token={token}>
                <Outlet/>
            </MainLayout>
            {!token ? <></> : <Footer/>}
        </Web3ReactProvider>

    );
}

export default App;
