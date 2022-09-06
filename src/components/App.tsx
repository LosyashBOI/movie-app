import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Filter from './Filter';
import Header from './Header';
import MoviesList from './MoviesList';

function App() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

function MainPage() {
    return (
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                mt: '2rem',
                mb: '2rem',
            }}
        >
            <Filter />
            <MoviesList />
        </Container>
    );
}

export { App, MainPage };
