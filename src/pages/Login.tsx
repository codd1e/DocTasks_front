import React, {FC, FormEvent, useState} from 'react';

import {loginUser} from "../store/auth/actionCreators";
import {useAppDispatch} from "../store";
import TextField from "@mui/material/TextField";

const Login: FC = () => {
    const dispatch = useAppDispatch();
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        dispatch(loginUser({login, password}));
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="auth__form">
                <h1>Вход в систему</h1>
                <TextField
                    fullWidth
                    type="text"
                    name="login"
                    onChange={(e) => setLogin(e.target.value)}
                    helperText="Введите логин"
                    id="demo-helper-text-aligned"
                    label="Логин"
                    className="auth__form__input"
                />
                <TextField
                    fullWidth
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    helperText="Введите пароль"
                    id="demo-helper-text-aligned"
                    label="Пароль"
                    className="auth__form__input"
                />
                <button className="auth__form__btn" onClick={handleSubmit}>Вход</button>
            </form>
        </>
    );
};

export default Login;
