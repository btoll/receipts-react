import React from 'react';
import axios from 'axios';

/*
 * TODO
 *
 *
 */

export default class ListItems extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            items: []
        };

        this.onAdd = this.onAdd.bind(this);
        this.onItemChange = this.onItemChange.bind(this);
    }

    render() {
        const items = [];

        for (let i = 0, len = this.state.count; i < len; i++) {
            items.push(<Item key={i} id={i} items={this.state.items} onItemChange={this.onItemChange} />);
        }

        return (
            <div id='items'>
                <h3>Items</h3>
                <button onClick={this.onAdd}>+</button>
                {items}
            </div>
        );
    }

    componentDidMount() {
        axios.get('http://localhost:3000/products')
        .then(results =>
            this.setState({
                items: results.data
            })
        )
        .catch(console.log);
    }

    onAdd(e) {
        e.preventDefault();

        this.setState({
            count: this.state.count + 1
        });

        // Pass up a new item with default values.
        this.props.onAddItem({
            itemId: 0,
            itemCost: 0,
            itemQuantity: 0
        });
    }

    onItemChange(id, name, value) {
        this.props.onItemChange(id, name, value);
    }

    onRemove(e) {
        // TODO
    }
}

class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            itemId: 0,
            itemCost: 0,
            itemQuantity: 0
        };

        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <div>
                <label htmlFor='itemId'>Item:
                    <select
                        name='itemId'
                        value={this.state.itemId}
                        onChange={this.onChange}
                    >
                        <option>Select Store</option>
                        {
                            this.props.items.map(item =>
                                <option key={item.id} value={item.id}>{item.product} {item.brand}</option>
                            )
                        }
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
                    <button>-</button>
                </label>
            </div>
        );
    }

    onChange(e) {
        const target = e.target;

        this.setState({
            [target.name]: target.value
        });

        this.props.onItemChange(this.state.id, target.name, target.value);
    }
}

