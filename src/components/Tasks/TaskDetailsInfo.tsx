import React, {FC, useEffect, useState} from 'react';
import {
    Backdrop,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, FormControlLabel,
    FormLabel, Radio,
    RadioGroup
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store";
import Loader from "../Loader";
import TextField from "@mui/material/TextField";
import {updateTask} from "../../store/tasks/actionCreators";
import {ITaskDetailsItem} from "../../store/tasks/tasksReducer";

interface TypeProps {
    open: boolean;
    setIsOpen: (open: boolean) => void;
}

const TaskDetailsInfo: FC<TypeProps> = ({open, setIsOpen}) => {

    const dispatch = useAppDispatch();

    const details = useAppSelector((state) => state.tasks.taskDetailsData.taskDetails);

    const [detailsState, setDetailsState] = useState<ITaskDetailsItem>(details);

    const loading = useAppSelector((state) => state.tasks.taskDetailsData.loading);

    useEffect(() => {
        setDetailsState({...details})
    }, [])

    const saveEdition = (): void => {
        const editedTaskDetails = {
            ...details,
            timeSpent: detailsState.timeSpent ? detailsState.timeSpent : details.timeSpent,
            jobDescription: detailsState.jobDescription ?? details.jobDescription,
            status: detailsState.status ?? details.status
        }
        dispatch(updateTask(editedTaskDetails))
    }

    const update = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetailsState({
            ...detailsState,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            {loading ? <Dialog open={open} maxWidth='md' fullWidth={true}>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <Loader></Loader>
                </Backdrop>
            </Dialog> : <Dialog open={open} maxWidth='md' fullWidth={true}>
                <DialogTitle>
                    Задача #{details.id}
                </DialogTitle>
                <DialogContent>
                    <div style={{marginBottom: '36px', border:'none'}} className="taskConstantInfo">
                        <TextField fullWidth id="standard-basic" label={details.previewName} disabled={true} variant="standard"/>
                        <TextField fullWidth id="standard-basic" label={details.responsible} disabled={true} variant="standard"/>
                    </div>
                    <TextField
                        style={{marginBottom: '28px'}}
                        fullWidth
                        id="outlined-multiline-static"
                        label="Описание задачи"
                        multiline
                        rows={3}
                        defaultValue={details.description}
                    />
                    <TextField style={{marginBottom: '28px'}} name="timeSpent" id="outlined-basic" label="Количество потраченного времени" variant="outlined" onChange={update} defaultValue={details.timeSpent} />
                    <TextField
                        style={{marginBottom: '28px'}}
                        fullWidth
                        id="outlined-multiline-static"
                        label="Описание выполненной работы"
                        multiline
                        rows={3}
                        name="jobDescription"
                        onChange={update} defaultValue={details.jobDescription}
                    />
                    <FormControl>
                        <FormLabel id="controlled-radio-buttons-group">Статус</FormLabel>
                        <RadioGroup row name="status" onChange={update} value={details.status}>
                            <FormControlLabel value="inProgress" control={<Radio />} label="В процессе" />
                            <FormControlLabel value="completed" control={<Radio />} label="Выполнено" />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions className="taskSuccessButtonWrapper">
                    <Button color="success" variant="contained" onClick={() => saveEdition()}>Сохранить</Button>
                    <Button onClick={() => {setIsOpen(false)}}>Закрыть</Button>
                </DialogActions>
            </Dialog>}
        </>
    );
};

export default TaskDetailsInfo;
