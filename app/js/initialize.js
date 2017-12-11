import React from 'react';
import ReactDOM from 'react-dom';



document.addEventListener('DOMContentLoaded', () => {
    console.log('app initialized!!!!!!');

    class IndecisionApp extends React.Component {
        
        render () {
            const subtitle = 'The world is big';

            return (
                <div>
                    <Header subtitle={ subtitle } />
                    <Action />
                    <Options />
                    <AddOption /> 
                </div>
            );
        }
    };

    const Header = (props) => (
        <div>
            <div>
                <h1>{ props.title }</h1>
                { props.subtitle && <h2>{ props.subtitle }</h2> }
            </div>
        </div>
    );

    Header.defaultProps = {
        title: 'Nicco\'s Indecision App'
    };

    const Action = () => (
        <div>
            <button>What should I do?</button>
        </div>
    );

    class Options extends React.Component {
        render() {
            return (
                <div>
                    Options component here:
                    <Option />
                </div>
            );
        }
    };

    // option
    const Option = () => (
        <div>
            Option component
        </div>
    );

    class AddOption extends React.Component {
        render() {
            return (
                <div>AddOption component</div>
            );
        }
    };

    


    ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
   

});