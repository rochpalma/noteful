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
        const folder_name = this.state.folderName.value;
        const url = `https://secure-forest-85364.herokuapp.com/folders`;
        const options = { 
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ folder_name })
        }
        console.log(options.body)
        fetch(url, options)
        .then(response => {
            if(!response.ok) {
                return(response.json()).then(error => {
                    throw new Error("Failed to add folder", error.message)
                })
            }
            return response.json();
        })
        .then(folder => {
            this.context.addFolder(folder);
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
        return (
            <section className='AddFolder'> 
                <h2>Create a folder</h2>      
                <form className='Noteful-form' onSubmit={ e => this.handleSubmit(e) } >    
                    <div className='field'>
                        <label htmlFor='folder-name-input'>
                            Name
                        </label>
                        <input 
                            type='text' 
                            id='folder-name-input' 
                            name='folder-name-input'
                            onChange={ e => this.handleFolderChange(e.target.value) }
                            required
                            aria-required='true' 
                            aria-describedby='folderError'
                        />
                    </div>
                    { this.state.folderName.touched && (
                        <ValidationError message={ this.validateFolder() } id ='folderError'/>
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
