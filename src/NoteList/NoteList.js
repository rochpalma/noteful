import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import Note from '../Note/Note';
import './NoteList.css';

class NoteList extends Component{
    static contextType = NotefulContext;

    render(){
        const { notes } = this.context; 
        const { folderId } = this.props.match.params;
        const getNotes = folderId 
              ? notes.filter(note => note.folderId === folderId)
              : notes;
        return(   
            <div className='NoteList'>
                <ul>                 
                    { getNotes.map(note =>
                        <li key={ note.id }>
                            <Note
                                id={ note.id }
                                name={ note.name }
                                modified={ note.modified }
                            />
                        </li>
                    ) }
                    <div className='NoteList__button-container'>
                        <Link 
                            to='/addNote'
                            className="noteLink"
                        >
                            <button className='NavCircleButton NoteList__add-note-button'>
                                +
                                { ' ' }
                                Note
                            </button>
                        </Link>
                    </div>
                </ul>
            </div>
        )
    }   
}

export default NoteList;