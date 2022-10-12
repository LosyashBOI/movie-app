import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { iStore } from '../interfaces';
import { openAuthorization, setLoggedIn } from '../redux/actions';
import { setStorageData, STORAGE } from '../utils';

const initialUser = {
    login: '',
    password: '',
};

interface IProps {
    btnSize: 'small' | 'medium';
}

function LoginButton({ btnSize }: IProps) {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: iStore) => state.isLoggedIn);
    const loginBtnColor = isLoggedIn ? 'error' : 'success';

    function handleOpen() {
        isLoggedIn ? dispatch(setLoggedIn(false)) : dispatch(openAuthorization(true));
    }

    return (
        <div>
            <Button
                variant="contained"
                color={loginBtnColor}
                size={'small'}
                onClick={handleOpen}
                sx={{ boxShadow: 'none' }}
            >
                {isLoggedIn ? 'Выйти' : 'Войти'}
            </Button>
            <Authorization />
        </div>
    );
}

function Authorization() {
    const dispatch = useDispatch();
    const { isLoggedIn, isAuthorizationOpened: open } = useSelector(
        (state: iStore) => state,
    );

    const [user, setUser] = useState(initialUser);

    const handleClose = () => {
        setUser(initialUser);
        dispatch(openAuthorization(false));
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        const admin = 'admin';
        const isValidUser = user.login === admin && user.password === admin;

        if (isValidUser) {
            dispatch(setLoggedIn(true));
            setUser(initialUser);
            handleClose();
        } else {
            alert('Неверный логин и/или пароль');
        }
    };

    setStorageData(STORAGE.IS_LOGGED_IN, isLoggedIn);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Авторизация</DialogTitle>
            <DialogContent
                sx={{
                    display: 'flex',
                    maxWidth: '300px',
                    flexDirection: 'column',
                }}
            >
                <DialogContentText>
                    Войдите в&nbsp;аккаунт, чтобы Вам стали доступны разделы
                    &laquo;Избранное&raquo; и &laquo;Смотреть позже&raquo;
                </DialogContentText>
                <TextField
                    margin="dense"
                    name="login"
                    label="Логин"
                    type="text"
                    variant="standard"
                    value={user.login}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="password"
                    label="Пароль"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    value={user.password}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Отменить</Button>
                <Button onClick={handleSubmit}>Подтвердить</Button>
            </DialogActions>
        </Dialog>
    );
}

export { Authorization, LoginButton };
