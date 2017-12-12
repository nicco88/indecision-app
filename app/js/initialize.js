import React from 'react';
import ReactDOM from 'react-dom';



document.addEventListener('DOMContentLoaded', () => {
    console.log('app initialized!!!!!!');

    class IndecisionApp extends React.Component {

        handlePick = () => {
            alert('handlepick');
        };
        
        render () {
            const subtitle = 'The world is big';
            const options = ['opt1', 'opt2'];

            return (
                <div>
                    <Header subtitle={ subtitle } />
                    <Action 
                        handlePick={this.handlePick}
                    />
                    <Options options={options} />
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

    const Action = (props) => (
        <div>
            <button onClick={props.handlePick}>What should I do?</button>
        </div>
    );

    class Options extends React.Component {
        handleRemoveAll = () => {
            alert('handleRemoveAll');
        };

        render() {
            return (
                <div>
                    { 
                        this.props.options.map((option, i) => <Option key={i} optionText={ option } />)
                    }
                    <button onClick={this.handleRemoveAll}>Remove All</button>
                </div>
            );
        }
    };

    // option
    const Option = (props) => (
        <div>
            { props.optionText }
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