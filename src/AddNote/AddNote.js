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
            modified: '',
            error: null
        }
    }
    static contextType = NotefulContext;

    handleSubmit = e => {
        e.preventDefault();
        const { noteName, content, folderId, modified } = this.state;
        const newNote = {
            name: noteName.value,
            content: content.value,
            folderId: folderId.value,
            modified: new Date()
        }
        console.log(newNote);

        const url = `http://localhost:9090/notes/`;
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
        .then(() => {
            console.log(newNote);
            this.context.addNote(newNote)
            this.props.history.push(`/folder/${newNote.folderId}`)
          })
        .catch(err => {
            console.log({error: err.message}, 'error to');
            // this.setState({
            //     error: err.message
            // })
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
        if(!this.state.noteName.value.length){
            return "Note title is required";
        }
    }

    validateContent(){
        if(!this.state.content.value.length){
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
            <option key={ folder.id } value={ folder.id }>{ folder.name }</option>
        ));
        
        return (
            <section className='AddNote'>
                <h2>Create a note</h2>
                <form className='Noteful-form' onSubmit={e => this.handleSubmit(e)}>
                    <div className='field'>
                        <label htmlFor='folder-name-input'>
                        Name
                        </label>
                        <input 
                            type='text' 
                            id='note-name-input' 
                            name='note-name-input'
                            onChange={e => this.handleNoteNameChange(e.target.value)}
                            required
                            aria-required='true'
                            aria-describedby={this.validateNoteName} 
                        />
                        {this.state.noteName.touched && <ValidationError message={this.validateNoteName}/>}
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
                            aria-describedby={this.validateContent}
                         />
                          {this.state.content.touched && <ValidationError message={this.validateContent}/>}
                    </div>                                       
                    <div className='field'>
                        <label htmlFor='note-folder-select'>
                            Folder
                        </label>
                        <select
                            id='note-folder-select' 
                            name='note-folder-id' 
                            onChange={e => this.handleNoteFolderChange(e.target.value)}
                            required
                            aria-required='true'
                            aria-describedby={this.validateFolder}
                        >
                            <option value=''>Select a Folder...</option>
                            {folderList}
                        </select>
                        {this.state.folderId.touched && <ValidationError message={this.validateFolder}/>}
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
