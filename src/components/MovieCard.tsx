import { Bookmark, BookmarkBorder, Star, StarBorder } from '@mui/icons-material';
import {
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

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
import { Link } from "react-router-dom";

const { WATCH_LATER, FAVORITES } = STORAGE;

interface movieItem {
    id: number;
    film: movieCard;
}

function MovieCard({ id, film }: movieItem) {
    const dispatch = useDispatch();
    const { isLoggedIn, favorites, watchLaterList } = useSelector(
        (state: iStore) => state,
    );
    const { title, vote_average: vote, poster_path: poster } = film;

    const hasFavorite = favorites.includes(id);
    const hasWatchLater = watchLaterList.includes(id);

    // console.log(favorites);
    // console.log(watchLaterList);

    function handleIcon(type: string) {
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
    }

    setStorageData(FAVORITES, favorites);
    setStorageData(WATCH_LATER, watchLaterList);

    return (
        <Grid item xs={12} sm={6} xl={4} sx={{ height: 'fit-content' }}>
            <Card
                sx={{
                    display: 'flex',
                    maxWidth: '500px',
                    border: '1px solid rgba(0, 0, 0, .1)',
                    boxShadow: '4px 4px 8px 0px rgba(34, 60, 80, 0.2)',
                }}
            >
                <CardMedia
                    component="img"
                    height="300px"
                    image={`https://image.tmdb.org/t/p/w300${poster}`}
                    alt="film poster"
                    sx={{ width: '200px' }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <CardContent>
                        <CardActions sx={{ padding: 0, mb: '20px' }}>
                            <Typography sx={{ mr: '20px' }}>Рейтинг: {vote}</Typography>
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
                        <Typography gutterBottom variant="h6" component="h3">
                            {title}
                        </Typography>
                    </CardContent>
                    <CardActionArea component={Link} to={`movie-app/film/${id}`}>
                        <Typography
                            variant="h6"
                            component="p"
                            sx={{
                                padding: '15px 0 15px 30px',
                                borderTop: '1px solid rgba(0, 0, 0, .1)',
                            }}
                        >
                            Подробнее
                        </Typography>
                    </CardActionArea>
                </Box>
            </Card>
        </Grid>
    );
}

export default MovieCard;
