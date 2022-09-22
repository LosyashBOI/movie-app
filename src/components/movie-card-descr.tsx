import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { getYear } from 'date-fns';
import { useEffect, useState } from 'react';
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
    const windowHeight = useWindowHeight();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const descrSize = isMobile ? '100%' : '35%';
    const descrGap = isMobile ? '10px 25px 25px' : '20px 50px 50px';
    const descrBgHeight = isMobile
        ? `${windowHeight - 56 - 35}px`
        : `${windowHeight - 64 - 70}px`;

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
                maxWidth: '100%',
                height: `${descrBgHeight}`,
                padding: `${descrGap}`,
                overflow: 'auto',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#000',
                borderRadius: 0,
            }}
        >
            <Box maxWidth={descrSize} color={'#fff'}>
                <Typography variant="h4" component="h2">
                    {title}
                </Typography>
                <Box color="#d7d7d7" sx={{ mb: '10px' }}>
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

function useWindowHeight() {
    const [height, setHeight] = useState(document.documentElement.clientHeight);

    useEffect(() => {
        function handleResize() {
            setHeight(document.documentElement.clientHeight);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    return height;
}

export { MovieCardDescr };
