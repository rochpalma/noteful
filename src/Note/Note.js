import React from 'react';
import NotefulContext from '../NotefulContext';

function Note(props){
    return(
    <NotefulContext.Consumer>
      {context => {
          const handleDelete = noteId => {
            const url = `http://localhost:9090/notes/${noteId}`;
            const options = { 
              method: 'DELETE',
              headers: {
                'content-type': 'application/json'
              }
            }
            fetch(url, options)
              .then(response => {
                if(!response.ok) {
                  return(response.json()).then(error => {throw new Error("Failed", error.message)})
                }
              })
              .then(() => {
                if(props.history) {
                  props.history.push('/')
                }
                context.deleteNote(noteId)
                
              })
              .catch(error => console.log(error.message))
            }
      
        const formattedDate = new Date(props.note.modified).toDateString();
        return(
            <div>
                <h2>{ props.note.name }</h2>
                <div>
                    <p>Date modified on { formattedDate }</p>
                    <button id={props.note.id} onClick={
                        e => this.deleteNote(e.target.id)}>
                            Delete Note</button>
                </div>
            </div>

        );
      }}
    </NotefulContext.Consumer>
    )
    
}

Note.defaultProps = {
    deleteNote: () => {}
  }

export default Note;