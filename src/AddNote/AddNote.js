import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import ValidationError from '../ValidationError/ValidationError';
import './AddNote.css';

class AddNote extends Component {
    constructor(props){
        super(props)
        this.state = {
            noteName: {
                value: '',
                touched: false
            },
            content: {
                value: '',
                touched: false
            },
            folderId: {
                value: '',
                touched: false
            },
            id: '',
            modified: '',
            error: null
        }
    }
  
    static contextType = NotefulContext;

    handleSubmit = e => {
        e.preventDefault();
        const { noteName, content, folderId } = this.state;
        const newNote = {
            note_name: noteName.value,
            modified: new Date(),
            folder_id: Number(folderId.value),
            content: content.value            
        }

        const url = `http://localhost:8000/api/notes`;
        const options = { 
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newNote)
        }
        
        fetch(url, options)
        .then(response => {
            if(!response.ok) {
                return(response.json()).then(error => {
                    throw new Error("Failed to add note", error.message)
                })
            }
            return response.json();
            
        })
        .then(note => {
            this.context.addNote(note)
            this.props.history.push(`/folder/${note.folder_id}`)
          })
        .catch(error => {
            this.setState({
                error: error.message
            })
        })
    }

    handleNoteNameChange(noteName) {
        this.setState({
            noteName: {
                value: noteName, 
                touched: true
            }
        });
    }

    handleNoteFolderChange(folder) {
        this.setState({
            folderId: {
                value: folder, 
                touched: true
            }
        });        
    }

    handleNoteContentChange(content) {
        this.setState({
            content: {
                value: content, 
                touched: true
            }
        });        
    }

    //add validations method
    validateNoteName(){
        const name = this.state.noteName.value.trim();
        if (name.length === 0) {
            return 'Note title is required';
        } else if (name.length < 3) {
            return 'Name must be at least 3 characters long';
        }
    }

    validateContent(){
        const content = this.state.content.value.trim();
        if (content.length === 0) {
            return "Content is required";
        }
    }

    validateFolder(){
        if(!this.state.folderId.value){
            return "Must select a folder";
        }
    }

    render() {
        const folderList = this.context.folders.map(folder => (
            <option key={ folder.id } value={ folder.id }>{ folder.folder_name }</option>
        ));
        
        return (
            <section className='AddNote'>
                <h2>Create a note</h2>
                <form className='Noteful-form' onSubmit={ e => this.handleSubmit(e) }>
                    <div className='field'>
                        <label htmlFor='note-name-input'>
                        Name
                        </label>
                        <input 
                            type='text' 
                            id='note-name-input' 
                            name='note-name-input'
                            onChange={e => this.handleNoteNameChange(e.target.value)}
                            required
                            aria-required='true' 
                            aria-describedby='noteNameError'
                        />
                        { this.state.noteName.touched && (
                            <ValidationError message={ this.validateNoteName() } id ='noteNameError'/>
                        ) }
                    </div>
                    <div className='field'>
                        <label htmlFor='note-content-input'>
                            Content
                        </label>
                        <textarea 
                            id='note-content-input' 
                            name='note-content'
                            onChange={e => this.handleNoteContentChange(e.target.value)}
                            required
                            aria-required='true' 
                            aria-describedby='contentError'
                         />
                          { this.state.content.touched && (
                              <ValidationError message={ this.validateContent() } id='contentError'/>
                          ) }
                    </div>                                       
                    <div className='field'>
                        <label htmlFor='note-folder-select'>
                            Folder
                        </label>
                        <select
                            id='note-folder-select' 
                            name='note-folder-id' 
                            onChange={ e => this.handleNoteFolderChange(e.target.value) }
                            required
                            aria-required='true' 
                            aria-describedby='noteFolderError'
                        >
                            <option value=''>Select a Folder...</option>
                            {folderList}
                        </select>
                        { this.state.folderId.touched && (
                            <ValidationError message={ this.validateFolder() } id='noteFolderError'/>
                        ) }
                    </div>
                    <div className='buttons'>
                        <button 
                            type='submit'
                            disabled={
                                this.validateNoteName() ||
                                this.validateFolder() ||
                                this.validateContent()

                            }
                        >
                            Create Note
                        </button>
                    </div>
                </form>
            </section>   
         );
    }
}
 
export default AddNote;
