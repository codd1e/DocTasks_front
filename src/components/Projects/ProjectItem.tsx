import React, {FC} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {useNavigate} from "react-router-dom";
export interface IProjectProps {
    id: number;
    title: string;
    sub: string;
}

const ProjectItem: FC<IProjectProps> = ({id, title, sub}) => {
    const navigate = useNavigate();
    return (
        <Card sx={{ maxWidth: 540 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {`${id}. ${title}`}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {sub}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate(`/projects/${id}`)}>Открыть</Button>
            </CardActions>
        </Card>
    );
};

export default ProjectItem;
