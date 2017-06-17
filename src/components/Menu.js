import React from 'react';

function MenuItems(props) {
    return (
        <ul>
            {
                props.items.map((name, index) =>
                    <li key={index}>{name}</li>
                )
            }
        </ul>
    );
}

export default class Menu extends React.Component {
    render() {
        return (
            <div className="menu" onClick={this.props.onItemClick}>
                <MenuItems items={this.props.items} />
            </div>
        );
    }
}

