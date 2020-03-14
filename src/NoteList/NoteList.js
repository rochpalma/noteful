import React, { Component } from 'react';
import Note from '../Note/Note';
import { Link } from 'react-router-dom';
import dummyStore from '../dummy-store';

class NoteList extends Component{
    render(){
        return(
            <div>
                <ul>
                    { dummyStore.notes.map(note =>
                        <li key={note.id}>
                            <Link to={ `/note/${note.id}` }>
                                {note.name}
                            </Link>
                            <button>Delete</button>
                        </li>
                    ) }
                </ul>
                <button>Add Note</button>
            </div>
        )
    }   
}

export default NoteList;