import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';
import './Note.css';

class Note extends Component {
  static contextType = NotefulContext;

  handleDelete = e => {
    e.preventDefault();
    const noteId = this.props.id;
    const url = `https://secure-forest-85364.herokuapp.com/api/notes/${ noteId }`;
    const options = { 
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    }
    fetch(url, options)
      .then(response => {
        if(!response.ok) {
          return(response.json()).then(error => {
            throw new Error("Failed to delete", error.message)
          })
        }
      })
      .then(() => {
        this.context.deleteNote(noteId);
        this.props.onDelete(noteId) ;
      })
      .catch(error => console.log(error.message))
  }

  render() {
    const { name, id, modified } = this.props;
    const formattedDate = new Date(modified).toDateString(); 
    return (    
      <div className='Note'>
          <h2 className='Note__title'>
            <Link to={ `/note/${ id }` }>
              { name }
            </Link>
          </h2>
          <button
            className='Note__delete' 
            onClick={ this.handleDelete }
          >
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
  id: PropTypes.number,
  name: PropTypes.string,
  modified: PropTypes.string
}

export default Note;