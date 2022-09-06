import { Box, Paper, Typography } from '@mui/material';
import { getYear } from 'date-fns';
import { useParams } from 'react-router-dom';

import { filmsList } from '../data/filmsList';
import { movieCard } from '../interfaces';
import { getGenres } from '../utils';

function getFilm(id: number) {
    return filmsList.find((item: movieCard) => item.id === id) as movieCard;
}

function getVoteColor(vote: number) {
    if (vote < 5) {
        return 'red';
    } else if (vote < 7) {
        return '#aaa';
    } else return '#3bb33b';
}

function MovieCardDescr() {
    const { filmId } = useParams();
    const {
        title,
        overview,
        backdrop_path: bg,
        vote_average: rating,
        vote_count: voteCount,
        release_date: releaseDate,
        genre_ids: genres,
    } = getFilm(Number(filmId));

    const bgUrl = `https://image.tmdb.org/t/p/original${bg}`;

    return (
        <Paper
            sx={{
                maxWidth: '2000px',
                minHeight: '600px',
                padding: '20px 50px 50px',
                backgroundImage: `url(${bgUrl})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                backgroundColor: '#000',
                boxShadow: '45vw 2px 80px -4px rgba(0, 0, 0, 1) inset',
            }}
        >
            <Box sx={{ maxWidth: '35%', color: '#fff' }}>
                <Typography variant="h4" component="h2">
                    {title}
                </Typography>
                <Box color="#aaa" sx={{ mb: '10px' }}>
                    <Typography
                        color={getVoteColor(rating)}
                        variant="subtitle1"
                        component="span"
                        sx={{ mr: '0.6rem', fontWeight: 500 }}
                    >
                        {rating}
                    </Typography>
                    <Typography variant="subtitle1" component="span" sx={{ mr: '1rem' }}>
                        {voteCount}
                    </Typography>
                    <Typography variant="subtitle1" component="span">
                        {`${getYear(new Date(releaseDate))}, `}
                    </Typography>
                    <Typography component="span">{getGenres(genres)}</Typography>
                </Box>
                <Typography variant="body1">{overview}</Typography>
            </Box>
        </Paper>
    );
}

export { MovieCardDescr };
