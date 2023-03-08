import React, {FC, FormEvent, useEffect, useState} from 'react';

import {loginUser} from "../store/auth/actionCreators";
import {useAppDispatch} from "../store";
import TextField from "@mui/material/TextField";
import {useSelector} from "react-redux";
import {selectLoggedInError} from "../selectors/isLogged";
import {Alert} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

const Login: FC = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = React.useState(true);
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const isError = useSelector(selectLoggedInError)
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
            {isError ? <Alert variant="filled" severity="error" className="error_alert" action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }>
                Что-то пошло не так! Попробуйте снова
            </Alert> : null}
        </>
    );
};

export default Login;
