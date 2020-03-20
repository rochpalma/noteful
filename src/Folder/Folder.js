import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from "../NotefulContext";

class Folder extends Component{
    static defaultProps = {
        deleteNote: () => {}
      };
    static contextType = NotefulContext;

    deleteNote = id => {
        const noteId = id;
        const url = "http://localhost:9090/notes/";
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

    render() {
        const { folders = [] } = this.context;
        const folder = folders.find(f => f.id === this.props.match.params.folderId);

        const { notes = {} } = this.context;
        const filteredNotes = notes.filter(
        n => n.folderId === this.props.match.params.folderId
        );
        {/*const folder = this.context.folders.find(folder => 
            folder.id === this.props.match.params.folderId);
        const notes = this.context.notes.filter(note => 
        note.folderId === this.props.match.params.folderId);*/}
        return (
            <div>
                <h2>{ folder.name }</h2>
                <ul>
                    { filteredNotes.map(note => 
                        <li key={note.id}>
                            <Link to={`/note/${note.id}`}>
                                {note.name}
                            </Link>
                            <button onClick={ e => {
                                e.preventDefault();
                                this.deleteNote(note.id)}}>
                            Delete Note</button>
                        </li>                       
                    ) }
                </ul>
                <button>Add Note</button>
            </div>           
        )
    }  
}

export default Folder;