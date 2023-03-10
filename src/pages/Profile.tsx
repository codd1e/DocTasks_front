import React, {FC} from 'react';
import {useAppSelector} from "../store";
import {Container} from "@mui/material";

const Profile:FC = () => {
    const profile = useAppSelector((state) => state.auth.profileData.profile)
    return (
        <Container maxWidth="lg" className="main">
            <div>
                {profile.avatar}
            </div>
            <div>
                {profile.login}
                {profile.team}
            </div>
        </Container>
    );
};

export default Profile;
