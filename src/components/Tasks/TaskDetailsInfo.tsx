import React, {FC} from 'react';
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
import {useAppSelector} from "../../store";
import Loader from "../Loader";
import TextField from "@mui/material/TextField";

interface TypeProps {
    open: boolean;
    setIsOpen: (open: boolean) => void;
}

const TaskDetailsInfo: FC<TypeProps> = ({open, setIsOpen}) => {

    const details = useAppSelector((state) => state.tasks.taskDetailsData.taskDetails);

    const loading = useAppSelector((state) => state.tasks.taskDetailsData.loading);

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
                    <TextField style={{marginBottom: '28px'}} id="outlined-basic" label="Количество потраченного времени" variant="outlined" defaultValue={details.timeSpent} />
                    <TextField
                        style={{marginBottom: '28px'}}
                        fullWidth
                        id="outlined-multiline-static"
                        label="Описание задачи"
                        multiline
                        rows={3}
                        defaultValue={details.jobDescription}
                    />
                    <FormControl>
                        <FormLabel id="controlled-radio-buttons-group">Статус</FormLabel>
                        <RadioGroup row value={details.status}>
                            <FormControlLabel value="inProgress" control={<Radio />} label="В процессе" />
                            <FormControlLabel value="completed" control={<Radio />} label="Выполнено" />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setIsOpen(false)}}>Закрыть</Button>
                </DialogActions>
            </Dialog>}
        </>
    );
};

export default TaskDetailsInfo;
