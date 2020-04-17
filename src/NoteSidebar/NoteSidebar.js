import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import './NoteSidebar.css';

class NoteSidebar extends Component {
    static defaultProps = {
        history: {
            goBack: () => {}
        },
        match: {
            params: {}
          }
    }

    static contextType = NotefulContext;
    render() { 
        const { notes, folders, } = this.context;
        const { noteId } = this.props.match.params;
        const note = notes.find(note => note.id === noteId) || {};
        const folder = folders.find(f => f.id === note.folderId);
        return (
            <div>
                <button
                    onClick={() => this.props.history.goBack()}
                    className='NoteSidebar__back-button NavCircleButton'
                >
                    {`\<`}
                    <br />
                    Back
                </button>
                {folder && (
                <h3 className='NoteSidebar__folder-name'>
                    {folder.name}
                </h3>
                )}
            </div>
        )
    }
}
 
export default NoteSidebar;