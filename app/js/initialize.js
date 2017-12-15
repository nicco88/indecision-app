import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';


document.addEventListener('DOMContentLoaded', () => {
    console.log('app initialized!!!!!!');
    
    ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
});