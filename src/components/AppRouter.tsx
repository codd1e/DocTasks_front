import React, {FC} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

import Main from "../pages/Main";
import Login from "../pages/Login";
import {selectIsLoggedIn} from "../selectors/isLogged";
import NotFound from "../pages/NotFound";
import ProjectPage from "../pages/ProjectPage";
import Profile from "../pages/Profile";

const AppRouter: FC = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return (
        <>
            <Routes>
                <Route path = '/' element={<Main/>} />
                <Route path='/sign' element={isLoggedIn ? <Navigate to="/" /> : <Login/>}/>
                <Route path = '/projects/:id'  element={<ProjectPage/>}/>
                <Route path = '/account' element={isLoggedIn ? <Profile/> : <Login/>}/>
                <Route path = '*' element={<NotFound/>} />
            </Routes>
        </>
    );
};

export default AppRouter;
