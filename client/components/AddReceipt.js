// @flow
import React from 'react';
import { List } from 'immutable';
import { graphql, compose } from 'react-apollo';

import Error from './Error';
import ListItems from './ListItems';
import {
    PRODUCTS_URL,
    RECEIPTS_URL,
    STORES_URL,
    incr
} from '../config';

import {
    addReceiptMutation,
    getProductsQuery,
    getStoresQuery
} from '../queries/queries';

type State = {
    storeId: string,
    totalCost: number,
    purchaseDate: string,
    items: Array<any>,
    errors: Array<any>,
    products: Array<any>,
    stores: Array<any>
};

class AddReceipt extends React.Component<{}, State> {
    onAdd: Function;
    onCancel: Function;
    onChange: Function;
    onListItemChange: Function;
    onListItemRemove: Function;
    onReset: Function;
    onSubmit: Function;

    constructor() {
        super();

        this.state = {
            storeId: '',
            totalCost: 0.00,
            purchaseDate: '',
            items: List([]),
            errors: List([]),
            // The following shouldn't be in state b/c they won't change in the form, but ???
            products: List([]),
            stores: List([])
        };

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
            <>
                <form className='add-receipt' onSubmit={this.onSubmit}>
                    <fieldset>
                        <legend>Add Receipt</legend>

                        <div>
                            <label htmlFor='stores'>Select Store:</label>
                            <select
                                autoFocus
                                id='stores'
                                name='storeId'
                                value={this.state.storeId}
                                onChange={this.onChange}
                            >
                                <option>Select Store</option>
                                {
                                    !this.props.getStoresQuery.loading && this.props.getStoresQuery.stores.map((store) =>
                                        <option key={store.id} value={store.id}>{store.name}</option>
                                    )
                                }
                            </select>
                        </div>

                        <div id='items'>
                            <h3>Items</h3>
                            <button onClick={this.onAdd}>+</button>

                            <ListItems
                                items={this.state.items}
                                products={this.props.getProductsQuery.loading ? [] : this.props.getProductsQuery.products}
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
                                disabled={this.state.purchaseDate === '' || this.state.storeId === '' || this.state.totalCost === '' ? 'disabled' : ''}
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
            </>
        );
    }

    onAdd(e: SyntheticMouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        const items = List([
            ...this.state.items,
            {
                id: incr(),
                productId: 0,
                cost: 0,
                quantity: 0
            }
        ]);

        this.setState({
            items: items
        });
    }

    onCancel(e: SyntheticMouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.onReset();
    }

    onChange(e: SyntheticEvent<>) {
        const currentTarget = e.currentTarget;

        this.setState({
            // https://github.com/facebook/flow/issues/2099#issuecomment-272372086
            [(currentTarget: window.HTMLInputElement).name]: (currentTarget: window.HTMLInputElement).value
        });
    }

    onListItemChange(item: { id: string }, e: SyntheticEvent<>) {
        const currentTarget = e.currentTarget;

        const items = this.state.items.map(it => {
            if (it.id === item.id) {
                return Object.assign({}, it, {
                    // https://github.com/facebook/flow/issues/2099#issuecomment-272372086
                    [(currentTarget: window.HTMLInputElement).name]: (currentTarget: window.HTMLInputElement).value
                });
            }

            return it;
        });

        this.setState({
            items: List(items)
        });
    }

    onListItemRemove(item: { id: string }, e: SyntheticMouseEvent<HTMLButtonElement>) {
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
            items: List([]),
            errors: List([])
        });
    }

    async onSubmit(e: SyntheticMouseEvent<HTMLFormElement>) {
        // TODO: More robust validation!
        e.preventDefault();

        // TODO: Immutable
        const errors = Object.keys(this.state)
            .filter(key => !['errors', 'products', 'stores'].includes(key) && !this.state[key]);

        const items = this.state.items.filter(item => {
            let res = true;

            if (item.productId <= 0 || item.quantity <= 0) {
                res = false;
            }

            return res;
        })
        .map(({id, productId, cost, quantity}) => (
            {
                id,
                productId,
                cost: parseFloat(cost) || 0,
                quantity: parseFloat(quantity) || 0
            }
        ));

        if (!errors.length) {
            await this.props.addReceiptMutation({
                variables: {
                    storeId: this.state.storeId,
                    totalCost: Number(this.state.totalCost),
                    purchaseDate: this.state.purchaseDate,
                    items
                }
            });

            this.onReset();

            /*
            this.setState({
                errors: List([
                    msg === 'Network Error' ?
                        `${msg} - Are you offline?` :
                        `${msg} - Make sure your data types match!`
                ])
            });
            */
        } else {
            this.setState({
                errors: !items ?
                    List([...errors, 'One or more of the items is blank']) :
                    errors
            });
        }
    }
}

export default compose(
    graphql(addReceiptMutation, {name: 'addReceiptMutation'}),
    graphql(getProductsQuery, {name: 'getProductsQuery'}),
    graphql(getStoresQuery, {name: 'getStoresQuery'})
)(AddReceipt);

