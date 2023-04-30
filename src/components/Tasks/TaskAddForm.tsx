import React, {FC, useEffect, useRef, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel, FormLabel, Radio,
    RadioGroup
} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useAppDispatch, useAppSelector} from "../../store";
import {useSelector} from "react-redux";
import {INewTask} from "../../types/TASKS";
import {addTaskToList} from "../../store/tasks/actionCreators";

interface TypeProps {
    open: boolean;
    setIsOpen: (open: boolean) => void;
    addTask?: () => {};
}

const TaskAddForm:FC<TypeProps> = ({open, setIsOpen, addTask}) => {
    const tasksList = useAppSelector((state) => state.tasks.tasksListData.tasksList);
    const currentId = tasksList ? tasksList.length + 1 + '' : '1';
    const [previewName, setPreviewName] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [status, setStatus] = useState<string>('inProgress');

    const dispatch = useAppDispatch();

    const addNewTask = () => {
        const newTask: INewTask = {
            id: currentId,
            previewName: previewName,
            description: description,
            status: status
        }
        dispatch(addTaskToList(newTask))
        setIsOpen(false);
    }

    return (
        <Dialog open={open} maxWidth='md' fullWidth={true}>
            <DialogTitle>
                Создание задачи #{currentId}
            </DialogTitle>
            <DialogContent>
                <TextField
                    className="newTaskInput"
                    fullWidth
                    id="standard-previewName-input"
                    label="Введите наименование задачи"
                    type="text"
                    variant="standard"
                    onChange={(e) => {setPreviewName(e.target.value)}}
                />
                <TextField
                    className="newTaskInput"
                    fullWidth
                    id="filled-multiline-static"
                    label="Описание задачи"
                    multiline
                    rows={4}
                    variant="standard"
                    onChange={(e) => {setDescription(e.target.value)}}
                />
                <FormControl>
                    <FormLabel id="controlled-radio-buttons-group">Статус</FormLabel>
                    <RadioGroup row value={status} onChange={(e) => {setStatus(e.target.value)}} className="newTaskInput">
                        <FormControlLabel value="inProgress" control={<Radio />} label="В процессе" />
                        <FormControlLabel value="completed" control={<Radio />} label="Выполнено" />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {addNewTask()}}>Создать задачу</Button>
                <Button onClick={() => {setIsOpen(false)}}>Отменить</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskAddForm;
