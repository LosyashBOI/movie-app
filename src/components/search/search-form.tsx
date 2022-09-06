import {
    Box,
    Button,
    FormControl,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography,
} from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

import genreList from '../../data/genreList';
import { genre } from '../../interfaces';
import { IFiltersState } from './interfaces';
import { filtersState } from './search';

type ChangeSelect = (event: SelectChangeEvent<string | number>) => void;

type Rating = (rating: number, handleChange: ChangeSelect) => JSX.Element;
type Genre = (genre: string, handleChange: ChangeSelect) => JSX.Element;
type Popularity = (popularity: string, handleChange: ChangeSelect) => JSX.Element;
type FilterSelect = Rating | Genre | Popularity;

interface IStep {
    label: string;
    name: keyof IFiltersState;
    description: FilterSelect;
}

const steps: Array<IStep> = [
    {
        label: 'Выбор жанра',
        name: 'genre',
        description: GenreSelect,
    },
    {
        label: 'Выбор оценки',
        name: 'rating',
        description: RatingSelect,
    },
    {
        label: 'Выбор популярности',
        name: 'popularity',
        description: PopularitySelect,
    },
];

interface IProps {
    filters: IFiltersState;
    setFilters: Dispatch<SetStateAction<IFiltersState>>;
    setSearch: Dispatch<SetStateAction<boolean>>;
}

function SearchForm({ filters, setFilters, setSearch }: IProps) {
    const [activeStep, setActiveStep] = useState(0);

    const resetSearch = () => {
        setSearch(false);
        setFilters(filtersState);
    };

    const handleNext = (index: number) => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        if (index === steps.length - 1) {
            setSearch(true);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        resetSearch();
        setActiveStep(0);
    };

    const handleChange = (event: SelectChangeEvent<string | number>) => {
        const { name, value } = event.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    return (
        <Box sx={{ width: 300, margin: '20px auto' }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => {
                    const { name, label, description } = step;

                    return (
                        <Step key={name}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                {description(filters[name] as never, handleChange)}
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            disabled={!filters[name]}
                                            variant="contained"
                                            onClick={() => handleNext(index)}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {index === steps.length - 1
                                                ? 'Завершить'
                                                : 'Далее'}
                                        </Button>
                                        <Button
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Назад
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>
                        Чтобы подобрать фильм по&nbsp;новым предпочтениям нажмите
                        &laquo;Сбросить&raquo;
                    </Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Сбросить
                    </Button>
                </Paper>
            )}
        </Box>
    );
}

function GenreSelect(genre: number, handleChange: ChangeSelect) {
    return (
        <>
            <Typography sx={{ mb: '5px' }}>Какой жанр Вы предпочитаете?</Typography>
            <FormControl fullWidth>
                <Select name="genre" value={genre} onChange={handleChange}>
                    {genreList.map((item: genre) => {
                        return (
                            <MenuItem key={item.id} value={item.id}>
                                {item.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </>
    );
}

function RatingSelect(rating: string, handleChange: ChangeSelect) {
    return (
        <>
            <Typography sx={{ mb: '5px' }}>Какая оценка должна быть у фильма?</Typography>
            <FormControl fullWidth>
                <Select name="rating" value={rating} onChange={handleChange}>
                    <MenuItem value={'high'}>Высокая</MenuItem>
                    <MenuItem value={'low'}>Низкая</MenuItem>
                </Select>
            </FormControl>
        </>
    );
}

function PopularitySelect(popularity: string, handleChange: ChangeSelect) {
    return (
        <>
            <Typography sx={{ mb: '5px' }}>
                Каким по известности должен быть фильм?
            </Typography>
            <FormControl fullWidth>
                <Select name="popularity" value={popularity} onChange={handleChange}>
                    <MenuItem value={'popular'}>Популярный</MenuItem>
                    <MenuItem value={'unknown'}>Неизвестный</MenuItem>
                </Select>
            </FormControl>
        </>
    );
}

export default SearchForm;
