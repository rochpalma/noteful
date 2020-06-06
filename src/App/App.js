import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import NoteList from '../NoteList/NoteList';
import Sidebar from '../Sidebar/Sidebar';
import NoteSidebar from '../NoteSidebar/NoteSidebar';
import NotePage from '../NotePage/NotePage';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import NotefulContext from "../NotefulContext";
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import './App.css';

class App extends Component {   
  state = {
    folders: [],
    notes: [],
    error: null
  }

   static contextType = NotefulContext;

  componentDidMount() {
    Promise.all([
      fetch(`https://secure-forest-85364.herokuapp.com/folders`),
      fetch(`https://secure-forest-85364.herokuapp.com/notes`)
    ])
      .then(([foldersResponse, notesResponse]) => {
        if(!foldersResponse.ok || !notesResponse.ok){
          throw new Error("Failed to retrieve data");  
        }
      
        return Promise.all([
          foldersResponse.json(),
          notesResponse.json()
        ])
      })
      .then(([folders, notes]) => {
        this.setState({
          folders,
          notes,
          error: null
        });
      })
      .catch(err => {
        console.log({error: err.message});
      })
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    });
  };

  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    });
  };

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  render(){
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote
    };
    
    return (
      <NotefulContext.Provider value={ contextValue }>
        <div className='App'>
          <ErrorBoundary>
            <nav className='App__nav '>
              <Switch>
                <Route 
                  exact 
                  path="/" 
                  component={ Sidebar } 
                  />
                 <Route 
                  path="/folder/:folderId" 
                  component={ Sidebar } 
                  />
                <Route  
                  path="/note/:noteId" 
                  component={ NoteSidebar } 
                  />
                <Route 
                  path="/addFolder" 
                  component={ NoteSidebar } 
                  /> 
                <Route 
                  path="/addNote" 
                  component={ NoteSidebar }  
                  /> 
              </Switch>             
            </nav>
          </ErrorBoundary>
            <Header /> 
          <ErrorBoundary>

            <main className='App__main'>
               <Switch>
                <Route 
                    exact 
                    path="/" 
                    component={ NoteList } 
                    />
                  <Route 
                    path="/folder/:folderId" 
                    component={ NoteList } 
                    />
                   <Route  
                    path="/note/:noteId" 
                    component={ NotePage } 
                    />
                  <Route 
                    path="/addFolder" 
                    component={ AddFolder } 
                    /> 
                  <Route 
                    path="/addNote" 
                    component={ AddNote }  
                    />  
              </Switch>
            </main>       
          </ErrorBoundary>
        </div>
      </NotefulContext.Provider>
    );
  } 
}

export default App;
