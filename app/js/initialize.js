import React from 'react';
import ReactDOM from 'react-dom';



document.addEventListener('DOMContentLoaded', () => {
    console.log('app initialized!!!!!!');


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

    class IndecisionApp extends React.Component {
        
        render () {
            const subtitle = 'The world is big';

            return (
                <div>
                    <Header subtitle={ subtitle } />
                </div>
            );
        }
    }


    ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
   

});