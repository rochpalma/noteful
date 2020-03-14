import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import dummyStore from '../dummy-store';

class Sidebar extends Component{
    render() {
        return (
            <div>
                <ul>
                    { dummyStore.folders.map(folder => 
                        <li key={ folder.id }>
                            <NavLink to={`/folder/${ folder.id }`}>
                                { folder.name }
                            </NavLink>
                        </li>
                    ) }
                </ul>
                <button>Add Folder</button>
            </div>           
        )
    }  
}

export default Sidebar;