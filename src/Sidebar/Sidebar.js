import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import './Sidebar.css'

class Sidebar extends Component{
    static contextType = NotefulContext;

    countNotesForFolder = (notes, folderId) => {
        return (notes.filter(note => note.folder_id === folderId).length);
    };

    render() {
        const { folders = [], notes = [] } = this.context;
        return (                    
            <div className='NoteList'>
                <ul className='NoteList__list'>
                    { folders.map(folder => 
                        <li key={ folder.id }>
                            <NavLink
                                className='NoteList__folder-link' 
                                to={`/folder/${ folder.id }`}
                            >
                                <span className='NoteList__num-notes'>
                                    {this.countNotesForFolder(notes, folder.id)}
                                </span>
                                { folder.folder_name }
                            </NavLink>
                        </li>
                    ) }
                </ul>
                <div className='NoteList__button-wrapper'>
                    <Link 
                        to='/addFolder'
                        className="folderLink"
                    >
                        <button className='NavCircleButton NoteList__add-folder-button'>
                            +
                            {' '}
                            Folder
                        </button>
                    </Link>
                </div>
            </div>         
        )
    }  
}

export default Sidebar;