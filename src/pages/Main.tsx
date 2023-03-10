import React, {FC} from 'react';
import ProjectsList from "../components/Projects/ProjectsList";
import {Container} from "@mui/material";

const Main: FC = () => {
    return (
        <Container maxWidth="lg" className="main">
            <ProjectsList/>
        </Container>
    );
};

export default Main;
