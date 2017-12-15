import React from 'react';

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

export default Header;