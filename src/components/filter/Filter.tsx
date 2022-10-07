import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { iStore } from '../../interfaces';
import {
    setGenres,
    setSort,
    setSortUser,
    setYear,
    SORT_BY_FAME_DOWN,
} from '../../redux/actions';
import FilterGenres from './FilterGenres';
import FilterPagination from './FilterPagination';
import { FilterByDate, SortByPopularity, SortByUserList } from './FilterSelect';

function Filter() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: iStore) => state.isLoggedIn);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('s'));
    const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

    const removeFilters = () => {
        dispatch(setYear(2020));
        dispatch(setSort(SORT_BY_FAME_DOWN));
        dispatch(setSortUser(''));
        dispatch(setGenres([]));
    };

    return (
        <Box
            display={isMobile ? 'none' : 'block'}
            sx={{
                width: `${isTablet ? '200px' : '300px'}`,
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
