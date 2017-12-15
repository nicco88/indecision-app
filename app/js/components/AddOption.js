import React from 'react';

export default class AddOption extends React.Component {
    state= {
        error: undefined
    }

    // constructor(props) {
    //     super(props);
    //     this.handleAddOption = this.handleAddOption.bind(this);

    // }

    handleAddOption = (e) => {
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