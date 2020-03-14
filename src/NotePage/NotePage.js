import React from 'react';
import dummyStore from '../dummy-store';

function NotePage(props) {
    const note = dummyStore.notes.find(note => (
        note.id === props.match.params.noteId
    ));
    console.log(note);
    
    const folder = dummyStore.folders.find(folder => (
        folder.id === note.folderId
    ));
    return (
        <div>
            <div>
                <h3>{ folder.name }</h3>
                <button onClick={ () => props.history.goBack() }>Back</button>
            </div>
            <div>
                <h2>{ note.name }</h2>
                <p>{ note.content }</p>
                <button>Delete</button>
            </div>
        </div>
    );
}

export default NotePage;