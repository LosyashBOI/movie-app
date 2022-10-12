import { Box, Pagination } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { filterByUserList } from '../../data/dataFilters';
import { iStore } from '../../interfaces';
import { setPage } from '../../redux/actions';

function FilterPagination() {
    const state = useSelector((state: iStore) => state);
    const { currentPage: page } = state;
    const dispatch = useDispatch();

    const countOfPages = Math.ceil(filterByUserList(state).length / 10);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setPage(value));
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '55px',
                justifyContent: 'end',
            }}
        >
            <Pagination
                count={countOfPages}
                size="small"
                page={page}
                siblingCount={0}
                onChange={handleChange}
            />
        </Box>
    );
}

export default FilterPagination;
