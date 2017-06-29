import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { PRODUCTS_URL, incr } from '../config';

const ListItem = props =>
    (
        <div>
            <label htmlFor='productId'>Item:
                <select
                    name='productId'
                    value={props.item.productId}
                    onChange={props.onChange}
                >
                    <option>Select Product</option>
                    {
                        props.products.map((item, index) =>
                            // These IDs care coming from the db so they are safe to use.
                            <option
                                key={item.id}
                                value={item.id}
                            >{item.product} {item.brand}</option>
                        )
                    }
                </select>
            </label>

            <label htmlFor='cost'>Cost:
                <input
                    name='cost'
                    type='text'
                    value={props.item.cost}
                    onChange={props.onChange}
                    />
            </label>

            <label htmlFor='quantity'>Quantity:
                <input
                    name='quantity'
                    type='text'
                    value={props.item.quantity}
                    onChange={props.onChange}
                />
            </label>

            <label>
                <button onClick={props.onRemove}>-</button>
            </label>
        </div>
    );

ListItem.propTypes = {
    item: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired
};

export default class ListItems extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            products: []
        };

        this.onAdd = this.onAdd.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    render() {
        return (
            <div id='items'>
                <h3>Items</h3>
                <button onClick={this.onAdd}>+</button>

                {
                    this.state.items.map((item, i) =>
                        <ListItem
                            key={i}
                            item={item}
                            products={this.state.products}
                            onChange={this.onChange.bind(this, item)}
                            onRemove={this.onRemove.bind(this, item)} />
                    )
                }
            </div>
        );
    }

    componentDidMount() {
        axios.get(PRODUCTS_URL)
        .then(results =>
            this.setState({
                products: results.data
            })
        )
        .catch(console.log);
    }

    onAdd(e) {
        e.preventDefault();

        const items = [
            ...this.state.items,
            {
                id: incr(),
                productId: 0,
                cost: 0,
                quantity: 0
            }
        ]

        this.setState({
            items: items
        });

        this.props.onListItemsChange(items);
    }

    onChange(item, e) {
        const target = e.target;

        const items = this.state.items.map(it => {
            if (it.id === item.id) {
                return Object.assign({}, it, {
                    [target.name]: target.value
                });
            }

            return it;
        });

        this.setState({
            items: items
        });

        this.props.onListItemsChange(items);
    }

    onRemove(item, e) {
        e.preventDefault();

        const items = this.state.items.filter(
            it => it.id !== item.id
        );

        this.setState({
            items: items
        });

        this.props.onListItemsChange(items);
    }
}

ListItems.propTypes = {
    onListItemsChange: PropTypes.func.isRequired
};

