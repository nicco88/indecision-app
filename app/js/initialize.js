import React from 'react';
import ReactDOM from 'react-dom';



document.addEventListener('DOMContentLoaded', () => {
    console.log('app initialized!!!!!!');

   /*****************************
    * App starts here!!!
    *****************************/

    class IndecisionApp extends React.Component {

        constructor(props) {
            super(props);

            this.state = {
                options: ['opt1', 'opt2']
            }
        }

        handlePick = () => {
            alert('handlepick');
        };
        
        render () {
            const subtitle = 'The world is big';

            return (
                <div>
                    <Header subtitle={ subtitle } />
                    <Action 
                        handlePick={this.handlePick}
                        hasOptions={this.state.options.length > 0}
                    />
                    <Options options={this.state.options} />
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
            <button 
                onClick={props.handlePick}
                disabled={!props.hasOptions}
            >
                What should I do?
            </button>
        </div>
    );

    class Options extends React.Component {
        constructor(props) {
            super(props);
            this.handleRemoveAll = this.handleRemoveAll.bind(this);
        };

        handleRemoveAll() {
            console.log(this.props.options);
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
        handleAddOption(e) {
            if(e) e.preventDefault();
            const option = e.target.elements.option.value.trim();
            if(option) alert(option);
            e.target.elements.option.value = '';
        }

        render() {
            return (
                <div>
                    <form onSubmit={this.handleAddOption}>
                        <input name="option" type="text"/>
                        <button>Add</button>
                    </form>
                </div>
            );
        }
    };

    


    ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
   

});