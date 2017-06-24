import React from 'react';

/*
 * TODO
 *
 *      - disable all Add buttons except the most recent
 *      - since the item html names are the same, will itemCost and itemQuantity be arrays of values upon form submission?
 *
 */

export default class ListItems extends React.Component {
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
            items.push(<Item key={i} onAddItem={this.onAddItem} onRemoveItem={this.onRemoveItem} />);
        }

        return (
            <div id='items'>
                <h3>Items</h3>
                {items}
            </div>
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

class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemCost: 0.00,
            itemId: 0,
            itemQuantity: 0
        };

        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <div>
                <label htmlFor='itemId'>Item:
                    <select
                        name="itemId"
                        value={this.state.itemId}
                        onChange={this.onChange}
                    >
                        <option>Select Item</option>
                    </select>
                </label>

                <label htmlFor='itemCost'>Cost:
                    <input
                        name='itemCost'
                        type='text'
                        value={this.state.itemCost}
                        onChange={this.onChange}
                        />
                </label>

                <label htmlFor='itemQuantity'>Quantity:
                    <input
                        name='itemQuantity'
                        type='text'
                        value={this.state.itemQuantity}
                        onChange={this.onChange}
                    />
                </label>

                <label>
                    <button onClick={this.props.onAddItem}>+</button>
                    <button onClick={this.props.onRemoveItem}>-</button>
                </label>
            </div>
        );
    }

    onChange(e) {
        const target = e.target;

        this.setState({
            [target.name]: target.value
        });
    }
}

