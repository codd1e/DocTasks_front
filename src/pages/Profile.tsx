import React, {FC} from 'react';
import {useAppSelector} from "../store";
import {Container} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import Typography from "@mui/material/Typography";

const Profile:FC = () => {
    const profile = useAppSelector((state) => state.auth.profileData.profile)
    return (
        <Container maxWidth="lg" className="profile">
            <div className="profile__title">
                <img src={profile.avatar!} alt="Avatar" className="profile__avatar"/>
            </div>
            {/*<div className="profile__info">*/}
            {/*    <div className="profile__info__point">*/}
            {/*        Position: {profile.post}*/}
            {/*    </div>*/}
            {/*    <div className="profile__info__point">*/}
            {/*        Team: {profile.team}*/}
            {/*    </div>*/}
            {/*</div>*/}
            <List className="profile__info">
                <Typography variant="h2">Информация</Typography>
                <ListItem disablePadding className="profile__info__point">
                    <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                    <Typography variant="h5">{profile.team}</Typography>
                </ListItem>
                <ListItem disablePadding className="profile__info__point">
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <Typography variant="h5">{profile.post}</Typography>
                </ListItem>
            </List>
        </Container>
    );
};

export default Profile;
