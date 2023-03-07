import React, {FC, useEffect} from 'react';
import {HashRouter as Router} from "react-router-dom";

import Header from "./components/Header";
import AppRouter from "./components/AppRouter";
import './styles/index.scss'
import {useAppDispatch} from "./store";
import {getAccessToken} from "./store/auth/actionCreators";

const App: FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAccessToken())
    }, [])
    return (
        <>
            <Header/>
            <AppRouter/>
        </>
    );
};

export default App;
