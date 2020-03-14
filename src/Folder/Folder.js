import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dummyStore from '../dummy-store';

class Sidebar extends Component{
    render() {
        const folder = dummyStore.folders.find(folder => folder.id === this.props.match.params.folderId);

        const notes = dummyStore.notes.filter(note => note.folderId === this.props.match.params.folderId);
        return (
            <div>
                <h2>{ folder.name }</h2>
                <ul>
                    { notes.map(note => 
                        <li key={note.id}>
                            <Link to={`/note/${note.id}`}>
                                {note.name}
                            </Link>
                            <button>Delete</button>
                        </li>                       
                    )}
                </ul>
                <button>Add Note</button>
            </div>           
        )
    }  
}

export default Sidebar;