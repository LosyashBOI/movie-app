import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    MobileStepper,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { filterBySearch } from '../../data/dataFilters';
import { getGenres } from '../../utils';
import { NoMovies } from '../MoviesList';
import { IFiltersState } from './interfaces';

interface IProps {
    filters: IFiltersState;
}

function FilmPreview({ filters }: IProps) {
    const [activeStep, setActiveStep] = useState(0);

    const films = filterBySearch(filters);

    if (films.length === 0) {
        return (
            <Box sx={{ margin: 'auto', width: 'fit-content' }}>
                <NoMovies />
            </Box>
        );
    }

    const {
        title,
        overview,
        genre_ids: genres,
        backdrop_path: bg,
        id,
    } = films[activeStep];
    const maxSteps = films.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
        <Box sx={{ maxWidth: '640px', margin: 'auto' }}>
            <Card sx={{ height: '650px', mb: '10px', overflow: 'auto' }}>
                <CardMedia
                    component="img"
                    height="360"
                    image={`https://image.tmdb.org/t/p/original${bg}`}
                    alt="film poster"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: '5px' }}>
                        Жанры: {getGenres(genres)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {overview || 'Описание отсутствует'}
                    </Typography>
                </CardContent>
            </Card>
            <MobileStepper
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                backButton={
                    <Button
                        size="small"
                        color="error"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Не подходит
                    </Button>
                }
                nextButton={
                    <Button component={Link} to={`/movie-app/film/${id}`} size="small">
                        Подходит
                    </Button>
                }
            />
        </Box>
    );
}

export { FilmPreview };
