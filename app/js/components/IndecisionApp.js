import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

/*****************************
* App starts here!!!
*****************************/

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selected: undefined
    };

    handlePick = () => {
        const randomIndex = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomIndex];
        // alert(option);
        this.setState( () => ({
            selectedOption: option
        }));
    };
    
    handleDeleteOptions = () => {
        this.setState( () => ({ options: [] }) );
    };

    handleDeleteOption = (optionToRemove) => {
        this.setState( (prevState) => ({
            options: prevState.options.filter( (option) => optionToRemove !== option )
        }) );
    };

    handleAddOption = (option) => {
        if(!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists'
        }

        this.setState( (prevState) => ({options: prevState.options.concat(option)}) );
    }

    handleClearSelectedOption = () => {
        this.setState( () => ({ selectedOption: undefined }) );
    };

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if(options) {
                this.setState(() => ({options}) );
            }
        } catch (e) {
            // do nothing if error, that is if not a valid JSON
        }
        
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
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
                <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption 
                    handleAddOption={this.handleAddOption}
                />
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                />
            </div>
        );
    }
};
