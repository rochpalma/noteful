import React from 'react';
import { PropTypes } from 'prop-types';
import './ValidationError.css'

const ValidationError = (props) => {
    if(props.message){
        return (
            <div className='error'>
                { props.message }
            </div>
        )
    }
    return <></>
}

ValidationError.propTypes = {
    message: PropTypes.string
}
 
export default ValidationError;


