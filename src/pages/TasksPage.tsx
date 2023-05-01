import React, {FC, useEffect, useState} from 'react';
import {Button, Container, TableHead, Tooltip} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import CommentIcon from '@mui/icons-material/Comment';
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "../store";
import {getTaskDetails, setTasks} from "../store/tasks/actionCreators";
import {selectCurrentRole} from "../selectors/isLogged";
import {useSelector} from "react-redux";
import TaskAddForm from "../components/Tasks/TaskAddForm";
import DoneIcon from '@mui/icons-material/Done';
import PendingIcon from '@mui/icons-material/Pending';
import TaskDetailsInfo from "../components/Tasks/TaskDetailsInfo";

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

const TasksPage:FC = () => {
    const [page, setPage] = useState(0);
    const [addTaskForm, setAddTask] = useState(false);
    const [taskDetails, setTaskDetails] = useState(false);
    const tasks = useAppSelector((state) => state.tasks.tasksListData.tasksList);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const role = useSelector(selectCurrentRole);

    const dispatch = useAppDispatch();

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (tasks ? tasks.length : 0)) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleTranslateStatus = (status: 'completed' | 'inProgress') => {
        return status === 'completed' ? 'Выполнена' : 'В процессе'
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        dispatch(setTasks())
    }, [])

    const openTaskDetail = (previewName: string) => {
        dispatch(getTaskDetails(previewName))
        setTaskDetails(true);
    }

    return (
        <Container maxWidth="lg" className="main">
            <Typography variant='h2' className="tasks__title">Задачи</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{backgroundColor: "#1976D2"}}>
                            <TableCell style={{color: 'white'}}>Задача</TableCell>
                            <TableCell style={{color: 'white'}}>Ответственный</TableCell>
                            <TableCell align="right" style={{color: 'white'}}>Статус</TableCell>
                            <TableCell align="right" style={{color: 'white'}}>Описание</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? tasks ? tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : []
                                : tasks ? tasks : []
                        ).map((row) => (
                            <TableRow key={row.previewName}>
                                <TableCell component="td" scope="row">
                                    {row.previewName}
                                </TableCell>
                                <TableCell component="td" scope="row" style={{ width: 80 }}>
                                    {row.responsible}
                                </TableCell>
                                <TableCell style={{ width: 40 }} align="right">
                                    <Tooltip title={handleTranslateStatus(row.status)}>
                                        {row.status === 'completed' ? <DoneIcon/> : <PendingIcon/>}
                                    </Tooltip>
                                </TableCell>
                                <TableCell style={{ width: 40 }} align="right">
                                    <CommentIcon style={{cursor: 'pointer'}} onClick={() => {openTaskDetail(row.id)}}/>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={tasks ? tasks.length : 0}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Button variant="contained" disabled={role !== 'admin'} className="tasks__add_button" onClick={() => {setAddTask(true)}}>Добавить задачу</Button>
            <TaskAddForm open={addTaskForm} setIsOpen={setAddTask} />
            <TaskDetailsInfo open={taskDetails} setIsOpen={setTaskDetails}/>
        </Container>
    );
};

export default TasksPage;
