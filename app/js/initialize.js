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

            this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
            this.handlePick = this.handlePick.bind(this);
            this.handleAddOption = this.handleAddOption.bind(this);
            this.state = {
                options: []
            }
        }

        handlePick() {
            const randomIndex = Math.floor(Math.random() * this.state.options.length);
            const option = this.state.options[randomIndex];
            alert(option);
        };
        
        handleDeleteOptions() {
            this.setState(() => {
                return {
                    options: []
                }
            });
        };

        handleAddOption(option) {
            if(!option) {
                return 'Enter valid value to add item';
            } else if (this.state.options.indexOf(option) > -1) {
                return 'This option already exists'
            }

            this.setState((prevState) => {
                return {
                    options: prevState.options.concat(option)
                }
            });
        }
        
        render () {
            const subtitle = 'The world is big';

            return (
                <div>
                    <Header subtitle={ subtitle } />
                    <Action 
                        handlePick={this.handlePick}
                        hasOptions={this.state.options.length > 0}
                    />
                    <Options 
                        options={this.state.options}
                        handleDeleteOptions={this.handleDeleteOptions}
                    />
                    <AddOption 
                        handleAddOption={this.handleAddOption}
                    /> 
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

    const Options = (props) => (
        <div>
            { 
                props.options.map((option, i) => <Option key={i} optionText={ option } />)
            }
            <button onClick={props.handleDeleteOptions}>Remove All</button>
        </div>
    );

    // option
    const Option = (props) => (
        <div>
            { props.optionText }
        </div>
    );

    class AddOption extends React.Component {
        // since we are using 'this', we need to build the constructor
        constructor(props) {
            super(props);
            this.handleAddOption = this.handleAddOption.bind(this);
            this.state = {
                error: undefined
            };
        }

        handleAddOption(e) {
            if(e) e.preventDefault();

            const option = e.target.elements.option.value.trim();
            const error = this.props.handleAddOption(option);
            
            this.setState(() => {
                return {
                    error
                    //error: error
                }
            });

            e.target.elements.option.value = '';
        }

        render() {
            return (
                <div>
                    {this.state.error && <p>{this.state.error}</p> }
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