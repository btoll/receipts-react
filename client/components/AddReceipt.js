import React from 'react';
import Error from './Error';
import ListItems from './ListItems';
import axios from 'axios';
import {
    PRODUCTS_URL,
    RECEIPTS_URL,
    STORES_URL,
    incr
} from '../config';

export default class AddReceipt extends React.Component {
    constructor() {
        super();

        this.state = {
            storeId: '',
            totalCost: 0.00,
            purchaseDate: '',
            items: [],
            disabled: false,
            errors: [],
            // The following shouldn't be in state b/c they won't change in the form, but ???
            products: [],
            stores: []
        };

        this.exclude = new Set(['disabled', 'errors', 'products', 'stores']);

        this.onAdd = this.onAdd.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onListItemChange = this.onListItemChange.bind(this);
        this.onListItemRemove = this.onListItemRemove.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
            <div>
                <form className='add-receipt' onSubmit={this.onSubmit}>
                    <fieldset>
                        <legend>Add Receipt</legend>

                        <div>
                            <label htmlFor='stores'>Select Store:</label>
                            <select
                                id='stores'
                                name='storeId'
                                value={this.state.storeId}
                                onChange={this.onChange}
                            >
                                <option>Select Store</option>
                                {
                                    this.state.stores.map((store) =>
                                        <option key={store.id} value={store.id}>{store.store}</option>
                                    )
                                }
                            </select>
                        </div>

                        <div id='items'>
                            <h3>Items</h3>
                            <button onClick={this.onAdd}>+</button>

                            <ListItems
                                items={this.state.items}
                                products={this.state.products}
                                onListItemChange={this.onListItemChange}
                                onListItemRemove={this.onListItemRemove}
                            />
                        </div>

                        <div>
                            <label htmlFor='totalCost'>Total Cost:</label>
                            <input
                                id='totalCost'
                                name='totalCost'
                                type='text'
                                value={this.state.totalCost}
                                onChange={this.onChange} />
                        </div>

                        <div>
                            <label htmlFor='purchaseDate'>Date of Purchase:</label>
                            <input
                                id='purchaseDate'
                                name='purchaseDate'
                                type='text'
                                placeholder='mm/dd/yyyy'
                                value={this.state.purchaseDate}
                                onChange={this.onChange} />
                        </div>

                        <div>
                            <button
                                onClick={this.onSubmit}
                                className='submit'
                                disabled={this.state.disabled ? 'disabled' : ''}
                                type='submit'>
                                Submit
                            </button>

                            <button onClick={this.onCancel}>
                                Cancel
                            </button>
                        </div>
                    </fieldset>
                </form>

                { !!this.state.errors.length && <Error fields={this.state.errors} /> }
            </div>
        );
    }

    componentDidMount() {
        axios.all([
            axios.get(STORES_URL),
            axios.get(PRODUCTS_URL)
        ])
        .then(axios.spread((stores, products) =>
            this.setState({
                stores: stores.data,
                products: products.data
            })
        ))
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
    }

    onCancel(e) {
        e.preventDefault();
        this.onReset();
    }

    onChange(e) {
        const target = e.target;

        this.setState({
            [target.name]: target.value
        });
    }

    onListItemChange(item, e) {
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
    }

    onListItemRemove(item, e) {
        e.preventDefault();

        const items = this.state.items.filter(
            it => it.id !== item.id
        );

        this.setState({
            items: items
        });
    }

    onReset() {
        this.setState({
            storeId: '',
            totalCost: 0.00,
            purchaseDate: '',
            items: [],
            errors: [],
            disabled: false
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const errors = Object.keys(this.state)
            .filter(key => (!this.exclude.has(key)) && !this.state[key])
            .map(key => key);

        if (!errors.length) {
            this.setState({
                disabled: true
            });

            axios.post(RECEIPTS_URL, this.state)
            .then(this.onReset)
            .catch(() => console.log('error'));
        } else {
            this.setState({
                errors: errors
            });
        }
    }
}

