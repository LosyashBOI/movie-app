import {
    Box,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { iStore } from '../../interfaces';
import {
    setPage,
    setSort,
    setSortUser,
    setYear,
    SORT_BY_FAME_DOWN,
    SORT_BY_FAME_UP,
    SORT_BY_RATE_DOWN,
    SORT_BY_RATE_UP,
} from '../../redux/actions';

export const SORT_WATCH_LATER = 'SORT_WATCH_LATER';
export const SORT_FAVORITES = 'SORT_FAVORITES';

export function SortByPopularity() {
    const { sortType } = useSelector((state: iStore) => state);
    const dispatch = useDispatch();

    const handleChange = (event: SelectChangeEvent) => {
        dispatch(setSort(event.target.value));
        dispatch(setPage(1));
    };

    return (
        <Box sx={{ minWidth: 120, mb: '15px' }}>
            <Typography sx={{ mb: '5px' }}>Сортировать по:</Typography>
            <FormControl fullWidth size="small">
                <Select value={sortType} onChange={handleChange}>
                    <MenuItem value={SORT_BY_FAME_DOWN}>Популярные по убыванию</MenuItem>
                    <MenuItem value={SORT_BY_FAME_UP}>Популярные по возрастанию</MenuItem>
                    <MenuItem value={SORT_BY_RATE_DOWN}>Рейтинг по убыванию</MenuItem>
                    <MenuItem value={SORT_BY_RATE_UP}>Рейтинг по возрастанию</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export function SortByUserList() {
    const { sortUserType } = useSelector((state: iStore) => state);
    const dispatch = useDispatch();

    const handleChange = (event: SelectChangeEvent) => {
        dispatch(setSortUser(event.target.value));
        dispatch(setPage(1));
    };

    return (
        <Box sx={{ minWidth: 120, mb: '15px' }}>
            <Typography sx={{ mb: '5px' }}>Ваши фильмы:</Typography>
            <FormControl fullWidth size="small">
                <Select value={sortUserType || 'no-filters'} onChange={handleChange}>
                    <MenuItem value="no-filters">Нет</MenuItem>
                    <MenuItem value={SORT_FAVORITES}>Избранные</MenuItem>
                    <MenuItem value={SORT_WATCH_LATER}>Смотреть позже</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export function FilterByDate() {
    const date = useSelector((state: iStore) => state.releaseDate);
    const dispatch = useDispatch();

    const handleChange = (event: SelectChangeEvent<number>) => {
        dispatch(setYear(event.target.value as number));
        dispatch(setPage(1));
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <Typography sx={{ mb: '5px' }}>Год релиза:</Typography>
            <FormControl fullWidth size="small">
                <Select
                    // defaultValue={2020}
                    value={date}
                    onChange={handleChange}
                >
                    <MenuItem value={2020}>2020</MenuItem>
                    <MenuItem value={2019}>2019</MenuItem>
                    <MenuItem value={2018}>2018</MenuItem>
                    <MenuItem value={2017}>2017</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
