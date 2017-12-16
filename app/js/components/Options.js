import React from 'react';
import Option from './Option';

const Options = (props) => (
    <div>
        <button 
            onClick={props.handleDeleteOptions}
            className="button button--link"
        >
            Remove All
        </button>

        {props.options.length === 0 && <p>Please, add an option to get started!</p>}
        { 
            props.options.map((option, i) => (
                <Option 
                    key={i} 
                    optionText={ option } 
                    handleDeleteOption={props.handleDeleteOption}
                    />
            ))
        }
        
    </div>
);

export default Options;