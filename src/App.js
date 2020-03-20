import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import dummyStore from './dummy-store';
import Header from './Header/Header';
import NoteList from './NoteList/NoteList';
import Sidebar from './Sidebar/Sidebar';
import NotePage from './NotePage/NotePage';
import Folder from './Folder/Folder';
import NotefulContext from "./NotefulContext";

class App extends Component {   
  state = {
    folders: [],
    notes: []
  }

  static contextType = NotefulContext;

  componentDidMount() {
    const url = "http://localhost:9090/";
    fetch(url + "folders")
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(folders => {
      this.setState({
        folders
      });
    })
    .catch(error => {
      console.log({ error });
    });

    fetch(url + "notes")
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(notes => {
      this.setState({
        notes
      });
    })
    .catch(error => {
      console.log({ error });
    });
  }

  deleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  render(){
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote
    };
    {console.log(contextValue)}
    return (
      <NotefulContext.Provider value={ contextValue }>
        <div className="App">
          <Header />
          <div>
            <nav>
              <Route exact path="/" component={ Sidebar } />   
            </nav>
            <main>
              <Switch>
                <Route exact path='/' component={ NoteList } />
                <Route path='/folder/:folderId' component={ Folder } />
                <Route path='/note/:noteId' component={ NotePage } />
              </Switch>
            </main>
          </div>        
        </div>
        </NotefulContext.Provider>
    );
  } 
}

export default App;
