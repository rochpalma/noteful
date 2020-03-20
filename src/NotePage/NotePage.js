import React, { Component } from 'react';
import NotefulContext from "../NotefulContext";

class NotePage extends Component {
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
  render(){
    const { notes = [], folders = [] } = this.context;
    const { noteId } = this.props.match.params;

    const note = notes.find(note => note.id === noteId);
    const noteFolder = folders.find(f => f.id === note.folderId);
    return (
        <div>
            <div>
                <h3>{ noteFolder.name }</h3>
                <button onClick={ () => this.props.history.goBack() }>Back</button>
            </div>
            <div>
                <h2>{ note.name }</h2>
                <p>{ note.content }</p>
                <button onClick={ e => {
                            e.preventDefault();
                            this.deleteNote(note.id)}}>
                        Delete Note</button>
            </div>
        </div>
    );
  }
}
          
export default NotePage;