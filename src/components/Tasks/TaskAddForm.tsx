import React, {FC, useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel, FormLabel, InputLabel, MenuItem, Radio,
    RadioGroup, Select
} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useAppDispatch, useAppSelector} from "../../store";
import {INewTask} from "../../types/TASKS";
import {addTaskToList, getResponsible} from "../../store/tasks/actionCreators";

interface TypeProps {
    open: boolean;
    setIsOpen: (open: boolean) => void;
    addTask?: () => {};
}

interface IResponsible {
    name: string
}

const TaskAddForm:FC<TypeProps> = ({open, setIsOpen, addTask}) => {
    const tasksList = useAppSelector((state) => state.tasks.tasksListData.tasksList);
    const currentId = tasksList ? tasksList.length + 1 + '' : '1';
    const [previewName, setPreviewName] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [responsibleList, setResponsibleList] = useState<IResponsible[]>();
    const [currentResponsible, setCurrentResponsible] = useState<string | null>(null);
    const [status, setStatus] = useState<string>('inProgress');

    const dispatch = useAppDispatch();

    const addNewTask = () => {
        const newTask: INewTask = {
            id: currentId,
            previewName: previewName,
            description: description,
            responsible: currentResponsible,
            status: status,
        }
        dispatch(addTaskToList(newTask))
        setIsOpen(false);
    }

    useEffect(() => {
        getResponsible().then((response) => {
            setResponsibleList(response);
        })
    }, [])

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
                <FormControl fullWidth className="newTaskInput" variant="standard">
                    <InputLabel id="select-label" variant="standard">Ответственный</InputLabel>
                    <Select labelId="select-label" fullWidth value={currentResponsible} onChange={(e) => {setCurrentResponsible(e.target.value)}}>
                        {responsibleList ? responsibleList.map((responsible) => (
                            <MenuItem key={responsible.name} value={responsible.name}>{responsible.name}</MenuItem>
                        )) : <MenuItem key='clear' value={''}>Ничего не найдено</MenuItem>}
                    </Select>
                </FormControl>
                <FormControl className="newTaskInput">
                    <FormLabel id="controlled-radio-buttons-group">Статус</FormLabel>
                    <RadioGroup row value={status} onChange={(e) => {setStatus(e.target.value)}}>
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
