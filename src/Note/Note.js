import React from 'react';

function Note(props){
    const formattedDate = new Date(props.note.modified).toDateString();
    return(
        <div>
            <h2>{ props.note.name }</h2>
            <div>
                <p>Date modified on { formattedDate }</p>
                <button>Delete Note</button>
            </div>
        </div>

    );
    
}

export default Note;