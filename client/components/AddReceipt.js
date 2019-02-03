// @flow
import React from 'react';
import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { List } from 'immutable';

import Error from './Error';
import ListItems from './ListItems';
import {
    PRODUCTS_URL,
    RECEIPTS_URL,
    STORES_URL,
    incr
} from '../config';

import { Stores as StoresQuery } from '../queries/Stores';

type State = {
    storeId: string,
    totalCost: number,
    purchaseDate: string,
    items: Array<any>,
    errors: Array<any>
};

const ADD_RECEIPT = gql`
    mutation AddReceipt($storeId: ID!, $totalCost: Float!, $purchaseDate: String!, $items: [Item]) {
        addReceipt(storeId: $storeId, totalCost: $totalCost, purchaseDate: $purchaseDate, items: $items) {
            id
        }
    }
`;

export default class AddReceipt extends React.Component<{}, State> {
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
            errors: List([])
        };

        this.onAdd = this.onAdd.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onListItemChange = this.onListItemChange.bind(this);
        this.onListItemRemove = this.onListItemRemove.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    async onSubmit(addReceipt: Function, e: SyntheticMouseEvent<HTMLFormElement>) {
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
            await addReceipt({
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

    render() {
        return (
            <>
                <Mutation
                    mutation={ADD_RECEIPT}
                >
                    {(addReceipt, { loading, error, data }) => {
                        if (loading) return 'Loading...';
                        if (error) return `[Error] ${error.message}`;

                        return (
                            <form className='add-receipt' onSubmit={this.onSubmit}>
                                <fieldset>
                                    <legend>Add Receipt</legend>

                                    <div>
                                        <label htmlFor='stores'>Select Store:</label>
                                        { StoresQuery(this.state.storeId, this.onChange) }
                                    </div>

                                    <div id='items'>
                                        <h3>Items</h3>
                                        <button onClick={this.onAdd}>+</button>

                                        <ListItems
                                            items={this.state.items}
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
                                            placeholder='YYYY-MM-DD'
                                            value={this.state.purchaseDate}
                                            onChange={this.onChange} />
                                    </div>

                                    <div>
                                        <button
                                            onClick={this.onSubmit.bind(this, addReceipt)}
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
                        );
                    }}
                </Mutation>

                { !!this.state.errors.length && <Error fields={this.state.errors} /> }
            </>
        );
    }
}

