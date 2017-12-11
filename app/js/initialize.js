import React from 'react';
import ReactDOM from 'react-dom';



document.addEventListener('DOMContentLoaded', () => {
    console.log('app initialized!!!!!!');

    class IndecisionApp extends React.Component {
        
        render () {
            const subtitle = 'The world is big';
            const options = ['opt1', 'opt2'];

            return (
                <div>
                    <Header subtitle={ subtitle } />
                    <Action />
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

    const Action = () => (
        <div>
            <button>What should I do?</button>
        </div>
    );

    class Options extends React.Component {
        render(props) {
            return (
                <div>
                    { 
                        this.props.options.map((option, i) => <Option key={i} optionText={ option } />)
                    }
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