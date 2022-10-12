import {
    Checkbox,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import genreList from '../../data/genreList';
import { genre, iStore } from '../../interfaces';
import { setGenres } from '../../redux/actions';

function FilterGenres() {
    const dispatch = useDispatch();
    const checked = useSelector((state: iStore) => state.genreList);

    function handleCheck(id: number) {
        const newChecked = [...checked];
        const currentIndex = checked.indexOf(id);
        const hasNotId = currentIndex === -1;

        if (hasNotId) {
            newChecked.push(id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        dispatch(setGenres(newChecked));
    }

    return (
        <List>
            {genreList.map((item: genre) => {
                const { name, id } = item;
                const labelId = `checkbox-list-label-${id}`;

                return (
                    <ListItem key={id} sx={{ padding: 0 }}>
                        <ListItemButton
                            dense
                            sx={{ padding: 0 }}
                            onClick={() => handleCheck(id)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(id) !== -1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={name} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}

export default FilterGenres;
