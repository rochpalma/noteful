import React, { Component } from 'react';
import Note from '../Note/Note';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import './NoteList.css';

class NoteList extends Component{
    // static defaultProps = {
    //     match: {
    //         params: {}
    //     }
    // };

    static contextType = NotefulContext;

    render(){
        const { notes } = this.context; 
        const { folderId } = this.props.match.params;
        const getNotes = folderId 
              ? notes.filter(note => note.folderId === folderId)
              : notes;
        // const notesForFolder = getNotes.map(note => {
        //     return <Note key={ note.id } note={ note } />
        // })
        //console.log("getNotes val is " + getNotes);
        return(   
            <div className='NoteList'>
                <ul>                 
                    { getNotes.map(note =>
                        <li key={ note.id }>
                            <Note
                                // key={ note.id }
                                //note={ note }
                                id={note.id}
                                name={note.name}
                                modified={note.modified}
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
                                {' '}
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