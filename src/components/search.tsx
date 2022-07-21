import { Container } from '@mui/material';
import { useState } from 'react';

import { FilmPreview } from './film-preview';
import SearchForm from './search-form';

const initialState = {
    genre: '' as unknown,
    rating: '',
    popularity: '',
};

function Search() {
    const [filters, setFilters] = useState(initialState);
    const [isSearched, setSearch] = useState(false);

    const resetSearch = () => {
        setSearch(false);
        setFilters(initialState);
    };

    return (
        <Container
            // @ts-ignore
            maxWidth="false"
            sx={{
                display: 'flex',
                mt: '2rem',
                mb: '2rem',
            }}
        >
            <SearchForm
                filters={filters}
                setFilters={setFilters}
                resetSearch={resetSearch}
                setSearch={setSearch}
            />
            {isSearched && <FilmPreview filters={filters} />}
        </Container>
    );
}

export { Search };
