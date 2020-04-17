import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import Note from '../Note/Note';
import './NotePage.css';

class NotePage extends Component {
  static contextType = NotefulContext;

  // deleteNote = id => {
  //   const noteId = id;
  //   const url = "http://localhost:9090/notes/";
  //   console.log(noteId);
  //   fetch(url + `${noteId}`, {
  //     method: "DELETE",
  //     headers: {
  //       "content-type": "application/json"
  //     }
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(response.status);
  //       }
  //       return response.json();
  //     })
  //     .then(() => {
  //       this.context.deleteNote(noteId);
  //     })
  //     .catch(error => {
  //       console.error({ error });
  //     });
  // };
  render(){
    const { notes, folders } = this.context;
    const { noteId } = this.props.match.params;

    const note = notes.find(note => note.id === noteId) || {};
    //const noteFolder = folders.find(f => f.id === note.folderId);
    console.log(note); 
    //console.log(noteFolder);
    
    return (
      <section className='NotePage'>
        <Note
          id={ note.id }
          name= { note.name }
          modified = { note.modified }
          onDelete={() => this.props.history.push('/')}
        />
        <div className='NotePage__content'>
          <p>{ note.content }</p>
        </div>
        
      </section>
    );
  }
}
          
export default NotePage;