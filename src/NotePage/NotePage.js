import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import Note from '../Note/Note';
import './NotePage.css';

class NotePage extends Component {
  static contextType = NotefulContext;

  render(){
    const { notes } = this.context;
    const { noteId } = this.props.match.params;
    const note = notes.find(note => note.id == noteId) || {};
    console.log(note); 
    
    return (
      <section className='NotePage'>
        <Note
          id={ note.id }
          name= { note.note_name }
          modified = { note.modified }
          onDelete={ () => this.props.history.push('/') }
        />
        <div className='NotePage__content'>
          <p>{ note.content }</p>
        </div>      
      </section>
    );
  }
}
          
export default NotePage;