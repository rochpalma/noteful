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
            error: null
        }
    }

    static contextType = NotefulContext;

    handleFolderChange = (folder) =>{
        this.setState({
            folder: {
                value: folder,
                touched: true
            }
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const newFolder = {
            name: this.state.folderName.value
        }
        const url = `http://localhost:9090/folders`;
        const options = { 
            method: 'POST',
            body: JSON.stringify(newFolder),
            headers: {
                'content-type': 'application/json'
            }
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
            this.context.addFolder(newFolder);
            this.props.history.push('/'); 
        })
        .catch(error => this.setState({
            error: error.message
        }))

    }
    render() {          
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
                            onChange={e => this.updateFolderName(e.target.value)}
                            required
                            aria-required='true'
                            aria-describedby={this.validateFolderName} 
                        />
                    </div>
                    {this.state.folderName.touched && <ValidationError message={this.validateFolderName}/>}
                    <div className='buttons'>
                        <button type='submit'>
                            Add folder
                        </button>
                    </div>
                </form>
            </section>  
        );
    }
}
 
export default AddFolder;
