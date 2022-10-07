import { Container } from '@mui/material';
import { useState } from 'react';

import { FilmPreview } from './film-preview';
import { IFiltersState } from './interfaces';
import SearchForm from './search-form';

export const filtersState: IFiltersState = {
    genre: 0,
    rating: '',
    popularity: '',
};

function Search() {
    const [filters, setFilters] = useState(filtersState);
    const [isSearched, setSearch] = useState(false);

    return (
        <Container
            maxWidth={'lg'}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: '2rem',
                mb: '2rem',
            }}
        >
            <SearchForm filters={filters} setFilters={setFilters} setSearch={setSearch} />
            {isSearched && <FilmPreview filters={filters} />}
        </Container>
    );
}

export { Search };
