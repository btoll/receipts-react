import React from 'react';

/*
 * TODO
 *
 *      1. Disable all Add buttons except the most recent
 *      2. Simplify this script
 *
 */

export default class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: 1
        };

        this.onAddItem = this.onAddItem.bind(this);
    }

    render() {
        const items = [];

        for (let i = 0, len = this.state.items; i < len; i++) {
            items.push(<ChildItem key={i} id={i} onAddItem={this.onAddItem} onRemoveItem={this.onRemoveItem} />);
        }

        return (
            <ParentItem>
                {items}
            </ParentItem>
        );
    }

    onAddItem(e) {
        e.preventDefault();

        this.setState({
            items: this.state.items + 1
        });
    }

    onRemoveItem(e) {
        e.preventDefault();
    }
}

function ParentItem(props) {
    return (
        <div>{props.children}</div>
    );
}

class ChildItem extends React.Component {
//     constructor(props) {
//         super(props);
// 
//         this.state = {
//             list: '',
//             purchaseDate: '',
//             totalCost: 0.00
//         };
// 
//         this.onStateChange = this.onStateChange.bind(this);
//     }

    render() {
        return (
            <div>
                <label htmlFor={'itemCost' + this.props.id}>Cost:
                    <input
                        id={'itemCost' + this.props.id}
                        name={'itemCost' + this.props.id}
                        type='text'
                        />
                </label>

                <label htmlFor={'itemQuantity' + this.props.id}>Quantity:
                    <input
                        id={'itemQuantity' + this.props.id}
                        name={'itemQuantity' + this.props.id}
                        type='text'
                    />
                </label>

                <label>
                    <button onClick={this.props.onAddItem}>+</button>
                    <button onClick={this.props.onRemoveItem} className='remove'>-</button>
                </label>
            </div>
        );
    }
}

