import React, {FC, useState} from 'react';
import {useParams} from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {useAppDispatch, useAppSelector} from "../store";
import {saveDoc} from "../store/projects/actionCreators";
import {useSelector} from "react-redux";
import {selectCurrentRole} from "../selectors/isLogged";

const Documentation: FC = () => {
    const params = useParams();
    const dispatch = useAppDispatch()
    const currentDocumentation = useAppSelector(state => state.projects.documentationData.documents.find(document => document.projectId === Number(params.id)))
    const id = currentDocumentation ? currentDocumentation.projectId : 0;
    const [isEdition, setIsEdition] = useState<boolean>(false)
    const [text, setText] = useState<string>(
        currentDocumentation
            ? currentDocumentation.text
            : ''
    )
    const role = useSelector(selectCurrentRole)

    const handleEdit = () => {
        setIsEdition(true);
    }

    const handleSave = () => {
        setIsEdition(false)
        dispatch(saveDoc({id, text}))
    }

    return (
        <div className="documentation">
            {currentDocumentation ?
                <>
                    {
                        !isEdition
                            ? <pre className="documentation__text">{text}</pre>
                            : <textarea
                                className="documentation__text__editor"
                                value={text}
                                onChange={event => setText(event.target.value)}
                            ></textarea>
                    }
                    {
                        role === 'user' ? null
                            : (!isEdition
                                ? <Button variant="contained" className="documentation__edit__btn" onClick={handleEdit}>Редакировать</Button>
                                : <Button variant="contained" color="success" className="documentation__edit__btn" onClick={handleSave}>Сохранить</Button>)
                    }
                </>
                : <div>Документация не найдена</div>}
        </div>
    );
};

export default Documentation;
