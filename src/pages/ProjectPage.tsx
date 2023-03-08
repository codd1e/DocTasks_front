import React, {FC} from 'react';

import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../store";
import Documentation from "../components/Documentation";
import Button from "@mui/material/Button";

const ProjectPage: FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const currentProject = useAppSelector(state => state.projects.projectsData.projects.find(project => project.id === Number(params.id)));

    return (
        <div className="project">
            {
                currentProject ?
                    <>
                        <div className="project__title">{currentProject.title}</div>
                        <div className="project__description">Описание проекта: {currentProject.sub}</div>
                        <div className="project__documentation">Документация:</div>
                        <Documentation/>
                    </>
                    :
                    <>
                        <p>Проект не найден</p>
                    </>
            }
            <div className="project__back">
                <Button variant="contained" size="medium" color="error" onClick={() => navigate(-1)} className="project__back__btn">Back</Button>
            </div>
        </div>

    );
};

export default ProjectPage;
