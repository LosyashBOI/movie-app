import { Button, Container, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
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
    const [isFilterVisible, setFilterVisibility] = useState(false);

    const toggleBtn = () => {
        setFilterVisibility(!isFilterVisible);
    };

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
            {isMobile && (
                <FilterButton isFilterVisible={isFilterVisible} toggleBtn={toggleBtn} />
            )}
            {(isFilterVisible || !isMobile) && <Filter />}
            <MoviesList />
            {isMobile && <FilterPagination />}
        </Container>
    );
}

interface IFilterBtn {
    isFilterVisible: boolean;
    toggleBtn: () => void;
}

function FilterButton({ isFilterVisible, toggleBtn }: IFilterBtn) {
    return (
        <Button
            variant="contained"
            onClick={toggleBtn}
            size={'large'}
            sx={{ marginBottom: '20px' }}
        >
            {isFilterVisible ? 'Скрыть фильтры' : 'Показать фильтры'}
        </Button>
    );
}

export { App, MainPage };
