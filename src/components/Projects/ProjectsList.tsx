import React, {FC, useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../store";
import {setDocumentation, setProjects} from "../../store/projects/actionCreators";
import ProjectItem from "./ProjectItem";
import {Backdrop, CircularProgress} from "@mui/material";

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const ProjectsList: FC = () => {
    const dispatch = useAppDispatch();
    const {projects, loading} = useAppSelector((state) => state.projects.projectsData);

    useEffect(() => {
        dispatch(setProjects())
        dispatch(setDocumentation())
    }, [])

    return (
        <>
            {!loading ? (
                <Grid container rowSpacing={4} columnSpacing={0.5} columns={12} minHeight={160} className="projects">
                    {projects.map(project => (
                        <Grid xs={6}>
                            <ProjectItem key={project.id} {...project} />
                        </Grid>
                    ))}
                </Grid>
            ): <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>}
        </>
    );
};

export default ProjectsList;
