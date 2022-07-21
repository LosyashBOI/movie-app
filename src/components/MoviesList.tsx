import { Box, Grid, Typography } from '@mui/material';
import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { filterByUserList } from '../data/dataFilters';
import { iStore } from '../interfaces';
import MovieCard from './MovieCard';

const MoviesList = memo(() => {
    const state = useSelector((state: iStore) => state);
    const { currentPage: page } = state;

    const filteredList = useMemo(() => filterByUserList(state), [state]);
    if (filteredList.length === 0) return <NoMovies />;

    const pageList = [...filteredList].splice(page * 10 - 10, 10);

    // console.log(filteredList);
    // console.log(pageList);

    return (
        <Grid container spacing={4} sx={{ alignContent: 'start' }}>
            {pageList.map((item) => {
                return <MovieCard key={item.id} id={item.id} film={item} />;
            })}
        </Grid>
    );
});

export function NoMovies() {
    return (
        <Box sx={{ height: 'fit-content', margin: '100px auto' }}>
            <Typography variant="h4" component="h2" sx={{}}>
                К сожалению, фильмов нет :(
            </Typography>
        </Box>
    );
}

MoviesList.displayName = 'MoviesList';
export default MoviesList;
