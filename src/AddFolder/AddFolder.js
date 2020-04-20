import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import ValidationError from '../ValidationError/ValidationError';
import './AddFolder.css';

class AddFolder extends Component {
    constructor(props){
        super(props)
        this.state = {
            folderName: {
                value: '',
                touched: false
            },
            id: '',
            error: null
        }
    }

    static contextType = NotefulContext;

    handleSubmit = e => {
        e.preventDefault();
        const newFolder = {
            id: Math.random().toString(36).substr(2,15),
            name: this.state.folderName.value
        }
        console.log(this.state.folderName.value, "newfolder");
        const url = `http://localhost:9090/folders`;
        const options = { 
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newFolder)
        }
        fetch(url, options)
        .then(response => {
            if(!response.ok) {
                return(response.json()).then(error => {
                    throw new Error("Failed to add folder", error.message)
                })
            }
            return response.json();
        })
        .then(() => {
            console.log(newFolder);
            this.context.addFolder(newFolder);
            this.props.history.push('/'); 
        })
        .catch(error => this.setState({
            error: error.message
        }))
    }

    handleFolderChange(folder){
        this.setState({
            folderName: {
                value: folder,
                touched: true
            }
        });
    }

    validateFolder(){
        const name = this.state.folderName.value.trim();
        if (name.length === 0) {
            return 'Name is required';
        } else if (name.length < 3) {
            return 'Name must be at least 3 characters long';
        }
    }

    render() { 
        console.log(this.state.folderName.touched)
        return (
            <section className='AddFolder'> 
                <h2>Create a folder</h2>      
                <form className='Noteful-form' onSubmit={e => this.handleSubmit(e)} >    
                    <div className='field'>
                        <label htmlFor='folder-name-input'>
                            Name
                        </label>
                        <input 
                            type='text' 
                            id='folder-name-input' 
                            name='folder-name-input'
                            onChange={e => this.handleFolderChange(e.target.value)}
                            required
                        />
                    </div>
                    { this.state.folderName.touched && (
                        <ValidationError message={this.validateFolder()}/>
                    ) }
                    <div className='buttons'>
                        <button 
                            type='submit'
                            disabled={
                                this.validateFolder()
                            }
                        >
                            Add folder
                        </button>
                    </div>
                </form>
            </section>  
        );
    }
}
 
export default AddFolder;
