import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasError: false,
            error: ""
        }
    }

    static getDerivedStateFromError (error){
        return{
            hasError: true,
            error: error.message
        }
    }
    render() {
        if(this.state.hasError){ 
            return (
               <div>
                   <h2>Something went wrong, { this.state.error }</h2>
               </div> 
            );
        }
        return this.props.children;
    }
}
 
export default ErrorBoundary;