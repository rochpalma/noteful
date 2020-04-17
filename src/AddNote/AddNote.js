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
            //id: '',
            modified: '',
            error: null
        }
    }
    static contextType = NotefulContext;

    handleChange = e => {
        const { value, noteName } = e.target;
        this.setState({
            [noteName]: {
                value: value,
                touched: true
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const { noteName, content, folderId, modified } = this.state;
        const newNote = {
            name: noteName,
            content,
            folderId,
            modified
        }
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
        .then(note => {
            this.context.addNote(note)
            this.props.history.push(`/folder/${note.folderId}`)
          })
        .catch(err => {
            console.log({error: err.message});
            // this.setState({
            //     error: err.message
            // })
        })
    }

    //add validations method
    validateNoteName(){
        if(!this.state.noteName.value.length){
            return "Note title is required";
        }
    }

    validateContent(){
        if(!this.state.noteContent.value.length){
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
                            value={this.state.folderId.value}
                            onChange={e => this.handleChange(e)}
                            required
                            aria-required='true'
                            aria-describedby={this.validateNoteName} 
                        />
                        {this.state.noteName.touched && <ValidationError message={this.validateNoteName}/>}
                    </div>
                    
                    
                    <div className='field'>
                        <label htmlFor='note-folder-select'>
                            Folder
                        </label>
                        <select
                            id='note-folder-select' 
                            name='note-folder-id' 
                            value={this.state.folderId.value}
                            onChange={e => this.handleChange(e)}
                            required
                            aria-required='true'
                            aria-describedby={this.validateFolder}
                        >
                            <option value=''>Select a Folder...</option>
                            {folderList}
                        </select>
                        {this.state.folderId.touched && <ValidationError message={this.validateFolder}/>}
                    </div>
                    <div className='field'>
                        <label htmlFor='note-content-input'>
                            Content
                        </label>
                        <textarea 
                            id='note-content-input' 
                            name='note-content'
                            value={this.state.content.value}
                            onChange={e => this.handleChange(e)}
                            required
                            aria-required='true'
                            aria-describedby={this.validateContent}
                         />
                          {this.state.content.touched && <ValidationError message={this.validateContent}/>}
                    </div>
                    <div className='buttons'>
                        <button 
                            type='submit'
                            disabled={
                                this.validateNoteName() ||
                                this.validateFolder ||
                                this.validateContent
                        }>
                            Create Note
                        </button>
                    </div>
                </form>
            </section>   
         );
    }
}
 
export default AddNote;
