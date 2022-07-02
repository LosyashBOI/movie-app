import { AppBar, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

import { LoginButton } from './Login';

function Header() {
    // function handleClear() {
    //   localStorage.clear();
    // }

    return (
        <AppBar position="static">
            <Toolbar
                sx={{
                    justifyContent: 'space-between',
                }}
            >
                <Button component={Link} to="/movie-app/" color="inherit">
                    На главную
                </Button>
                {/* <Button color="inherit" onClick={handleClear}>Очистить хранилище</Button> */}
                <LoginButton />
            </Toolbar>
        </AppBar>
    );
}

export default Header;
