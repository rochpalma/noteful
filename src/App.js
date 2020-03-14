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

class App extends Component {   
  state = {
    folders: dummyStore.folders,
    notes: dummyStore.notes
  }

  render(){
    return (
      <div className="App">
        <Header />
        <div>
          <nav>
            <Route exact path="/" component={Sidebar} />
            <Route exact path="/folder/:folderId" component={Sidebar} />    
          </nav>
          <main>
            <Switch>
              <Route exact path='/' component={NoteList} />
              <Route path='/folder/:folderId' component={Folder} />
              <Route path='/note/:noteId' component={NotePage} />
            </Switch>
          </main>
        </div>        
      </div>
    );
  } 
}

export default App;
