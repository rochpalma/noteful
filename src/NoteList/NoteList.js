import React, { Component } from 'react';
import Note from '../Note/Note';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';

class NoteList extends Component{
    static defaultProps = {
        deleteNote: () => {}
    };
    static contextType = NotefulContext;

    deleteNote = id => {
        const noteId = id;
        const url = "http://localhost:9090/notes/";
        console.log(noteId);
        fetch(url + `${noteId}`, {
            method: "DELETE",
            headers: {
            "content-type": "application/json"
            }
        })
        .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
        })
        .then(() => {
        this.context.deleteNote(noteId);
        })
        .catch(error => {
        console.error({ error });
        });
    };
    static contextType = NotefulContext;
    render(){
        const { notes = [] } = this.context;
        return(
            <div>
                <ul>                 
                    { notes.map(note =>
                        <li key={note.id}>
                            <Link to={ `/note/${note.id}` }>
                                {note.name}
                            </Link>
                            <button onClick={ e => {
                                e.preventDefault();
                                this.deleteNote(note.id)}}>
                            Delete Note</button>
                        </li>
                    ) }
                    
                </ul>
                <button>Add Note</button>
            </div>
        )
    }   
}

export default NoteList;