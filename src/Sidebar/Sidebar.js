import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NotefulContext from "../NotefulContext";

class Sidebar extends Component{
    static contextType = NotefulContext;
    render() {
        const { folders = [] } = this.context;
        return (
            <div>
                <ul>
                    { folders.map(folder => 
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