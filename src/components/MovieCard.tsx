import { Bookmark, BookmarkBorder, Star, StarBorder } from '@mui/icons-material';
import {
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    createTheme,
    Grid,
    IconButton,
    ThemeProvider,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    addFavorite,
    addWatchLater,
    openAuthorization,
    removeFavorite,
    removeWatchLater,
    setLoggedIn,
} from '../actions';
import { iStore, movieCard } from '../interfaces';
import { setStorageData, STORAGE } from '../utils';

const { WATCH_LATER, FAVORITES } = STORAGE;

interface movieItem {
    id: number;
    film: movieCard;
}

const MovieCard = memo(({ id, film }: movieItem) => {
    const dispatch = useDispatch();
    const { isLoggedIn, favorites, watchLaterList } = useSelector(
        (state: iStore) => state,
    );
    const { title, vote_average: vote, poster_path: poster } = film;

    const hasFavorite = favorites.includes(id);
    const hasWatchLater = watchLaterList.includes(id);

    // console.log(favorites);
    // console.log(watchLaterList);

    const handleIcon = useCallback(
        (type: string) => {
            if (!isLoggedIn) {
                dispatch(setLoggedIn(false));
                dispatch(openAuthorization(true));

                return;
            }

            switch (type) {
                case FAVORITES:
                    dispatch(hasFavorite ? removeFavorite(id) : addFavorite(id));
                    break;
                case WATCH_LATER:
                    dispatch(hasWatchLater ? removeWatchLater(id) : addWatchLater(id));
                    break;
            }
        },
        [id, hasFavorite, hasWatchLater, isLoggedIn, dispatch],
    );

    setStorageData(FAVORITES, favorites);
    setStorageData(WATCH_LATER, watchLaterList);

    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const card = {
        width: isTablet ? '133px' : '200px',
        height: isTablet ? '200px' : '300px',
        gap: isTablet ? '10px' : '20px',
        linkPadding: isTablet ? '10px 0 10px 15px' : '15px 0 15px 30px',
        headerSize: isTablet ? '1rem' : '1.25rem',
    };

    return (
        <Grid item xs={12} s={12} sm={6} md={6} lg={4} xl={4} flexBasis={'100%'}>
            <Card
                sx={{
                    display: 'flex',
                    height: `${card.height}`,
                    border: '1px solid rgba(0, 0, 0, .1)',
                    boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)',
                }}
            >
                <CardMedia
                    component="img"
                    height="100%"
                    image={`https://image.tmdb.org/t/p/w300${poster}`}
                    alt="film poster"
                    sx={{ width: `${card.width}` }}
                />
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'space-between'}
                    flexBasis={'100%'}
                >
                    <CardContent sx={{ padding: '8px 8px 0' }}>
                        <CardActions sx={{ padding: 0, mb: `${card.gap}` }}>
                            <Typography sx={{ mr: `${card.gap}` }}>{vote}</Typography>
                            <IconButton
                                color="inherit"
                                sx={{ padding: 0 }}
                                onClick={() => handleIcon(FAVORITES)}
                            >
                                {hasFavorite && isLoggedIn ? <Star /> : <StarBorder />}
                            </IconButton>
                            <IconButton
                                color="inherit"
                                sx={{ padding: 0 }}
                                onClick={() => handleIcon(WATCH_LATER)}
                            >
                                {hasWatchLater && isLoggedIn ? (
                                    <Bookmark />
                                ) : (
                                    <BookmarkBorder />
                                )}
                            </IconButton>
                        </CardActions>
                        <Typography
                            gutterBottom
                            variant={'h6'}
                            component="h3"
                            sx={{ fontSize: `${card.headerSize}` }}
                        >
                            {title}
                        </Typography>
                    </CardContent>
                    <CardActionArea component={Link} to={`film/${id}`}>
                        <Typography
                            variant="h6"
                            component="p"
                            sx={{
                                padding: `${card.linkPadding}`,
                                borderTop: '1px solid rgba(0, 0, 0, .1)',
                                fontSize: `${card.headerSize}`,
                            }}
                        >
                            Подробнее
                        </Typography>
                    </CardActionArea>
                </Box>
            </Card>
        </Grid>
    );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;
