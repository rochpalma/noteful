import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Note.css';

class Note extends Component {
  // static defaultProps = {
  //   onDeleteNote: () => {}
  // }

  static contextType = NotefulContext;

  handleDelete = e => {
    e.preventDefault();
    const noteId = this.props.id;
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
          return(response.json()).then(error => {throw new Error("Failed to delete", error.message)})
        }
      })
      .then(() => {
        // if(props.history) {
        //   props.history.push('/')
        // }
        this.context.deleteNote(noteId)  
      })
      .catch(error => console.log(error.message))
  }

  render() {
    const { name, id, modified } = this.props;
    console.log("try");
    console.log(name);
    const formattedDate = new Date(modified).toDateString(); 
    return (    
      <div className='Note'>
          <h2 className='Note__title'>
            <Link to={`/note/${ id }`}>
              { name }
            </Link>
          </h2>
          <button
                className='Note__delete' 
                onClick={this.handleDelete}
          >
                <FontAwesomeIcon icon='trash-alt' />
          {' '}
                Delete
            </button>
          <div className='Note__dates'>
              <div className='Note__dates-modified'>
                <p>Modified on <span className='Date'>{ formattedDate }</span></p>                
              </div>      
          </div>
      </div>    
    );
  }
}
 
Note.propTypes = {
  note: PropTypes.object.isRequired
}

export default Note;