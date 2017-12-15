import React from 'react';

export default class AddOption extends React.Component {
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
        
        this.setState( () => ({error}) );

        if (!error) {
            e.target.elements.option.value = '';
        }
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