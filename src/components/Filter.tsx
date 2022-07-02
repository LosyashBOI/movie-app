import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { setGenres, setSort, setSortUser, setYear, SORT_BY_FAME_DOWN } from '../actions';
import { iStore } from '../interfaces';
import FilterGenres from './FilterGenres';
import FilterPagination from './FilterPagination';
import { FilterByDate, SortByPopularity, SortByUserList } from './FilterSelect';

function Filter() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: iStore) => state.isLoggedIn);

    const removeFilters = () => {
        dispatch(setYear(2020));
        dispatch(setSort(SORT_BY_FAME_DOWN));
        dispatch(setSortUser(''));
        dispatch(setGenres([]));
    };

    return (
        <Box
            sx={{
                width: '200px',
                height: 'fit-content',
                mr: '25px',
                padding: '20px',
                border: '1px solid rgba(0, 0, 0, .1)',
                borderRadius: '4px',
                boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)',
            }}
        >
            <Typography
                variant="h4"
                component="h2"
                sx={{ mb: '15px', fontWeight: '500' }}
            >
                Фильтры:
            </Typography>
            <Button
                variant="contained"
                fullWidth
                sx={{ mb: '10px', textTransform: 'none' }}
                onClick={() => removeFilters()}
            >
                Сбросить все фильтры
            </Button>
            {isLoggedIn && <SortByUserList />}
            <SortByPopularity />
            <FilterByDate />
            <FilterGenres />
            <FilterPagination />
        </Box>
    );
}

export default Filter;
