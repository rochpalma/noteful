import React from 'react';
import { PropTypes } from 'prop-types';

const ValidationError = (props) => {
    if(props.hasError){
        return (
            <div>
                { props.message }
            </div>
        )
    }
    return <></>
}

ValidationError.propTypes = {
    hasError: PropTypes.bool,
    message: PropTypes.string
}
 
export default ValidationError;


