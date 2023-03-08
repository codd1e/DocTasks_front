import React, {FC} from 'react';

import Header from "./components/Header";
import AppRouter from "./components/AppRouter";
import './styles/index.scss'

const App: FC = () => {
    return (
        <>
            <Header/>
            <AppRouter/>
        </>
    );
};

export default App;
