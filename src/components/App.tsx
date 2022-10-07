import { Container, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Filter from './filter/Filter';
import FilterPagination from './filter/FilterPagination';
import Header from './Header';
import MoviesList from './movies/MoviesList';

function App() {
    return (
        <Container maxWidth={false} disableGutters={true}>
            <Header />
            <Outlet />
        </Container>
    );
}

function MainPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('s'));

    return (
        <Container
            maxWidth={'lg'}
            sx={{
                display: 'flex',
                flexDirection: `${isMobile ? 'column' : 'row'}`,
                mt: '2rem',
                mb: '2rem',
            }}
        >
            <Filter />
            <MoviesList />
            {isMobile && <FilterPagination />}
        </Container>
    );
}

export { App, MainPage };
