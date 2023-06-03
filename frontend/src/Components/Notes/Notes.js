import React, { useEffect } from 'react';
import NoteForm from '../NoteForm/NoteForm';
import NoteList from '../NoteList/NoteList';
import { useGlobalContext } from '../../context/globalContext';

function Notes() {
    const { getNotes } = useGlobalContext();

    useEffect(() => {
        getNotes();
    }, [])

    return (
        <div>
            <NoteForm />
            <NoteList />
        </div>
    );
}

export default Notes;
