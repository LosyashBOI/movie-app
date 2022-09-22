import {
    AppBar,
    Button,
    Container,
    Toolbar,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { LoginButton } from './Login';

function Header() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const btnSize: 'small' | 'medium' = isMobile ? 'small' : 'medium';

    return (
        <AppBar position="static">
            <Container maxWidth={'xl'}>
                <Toolbar
                    disableGutters={true}
                    sx={{
                        justifyContent: 'space-between',
                    }}
                >
                    <Button
                        component={Link}
                        to="/movie-app/"
                        color="inherit"
                        size={'small'}
                    >
                        На главную
                    </Button>
                    <Button component={Link} to="search" color="inherit" size={'small'}>
                        Поиск
                    </Button>
                    <LoginButton btnSize={btnSize} />
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
