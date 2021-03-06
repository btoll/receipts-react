// @flow
import React from 'react';
import { graphql, Mutation } from 'react-apollo';
import Calendar from 'react-calendar'
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

import StoresList from '../queries/StoresList';
import ReceiptsGrid from '../queries/data-grid/Receipts';
import { GET_RECEIPTS } from '../queries/queries';

type State = {
    display: string,
    storeId: string,
    totalCost: number,
    purchaseDateString: string,
    purchaseDateDate: Date,
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

const getDateString = d =>
    `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;

export default class Receipts extends React.Component<{}, State> {
    onAdd: Function;
    onCancel: Function;
    onDateChange: Function;
    onFormControlChange: Function;
    onListItemChange: Function;
    onListItemRemove: Function;
    onReset: Function;
    onSubmit: Function;
    onToggle: Function;

    constructor() {
        super();

        const today = (new Date());

        this.state = {
            display: 'hide',
            storeId: '',
            totalCost: 0.00,
            purchaseDateString: getDateString(today),
            purchaseDateDate: today,
            items: List([]),
            errors: List([])
        };

        this.onAdd = this.onAdd.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onFormControlChange = this.onFormControlChange.bind(this);
        this.onListItemChange = this.onListItemChange.bind(this);
        this.onListItemRemove = this.onListItemRemove.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onToggle = this.onToggle.bind(this);
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

    onDateChange(d: Date) {
        this.setState({
            purchaseDateString: getDateString(d),
            purchaseDateDate: d
        });
    }

    onFormControlChange(e: SyntheticEvent<>) {
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
            purchaseDateString: '',
            purchaseDateDate: (new Date()),
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
                    purchaseDate: this.state.purchaseDateString,
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

    onToggle() {
        this.setState({
            display: this.state.display === 'show' ? 'hide' : 'show'
        });
    }

    render() {
        const cls = `add-receipt ${this.state.display}`;

        return (
            <>
                <Mutation
                    mutation={ADD_RECEIPT}
                    refetchQueries={[{query: GET_RECEIPTS}]}
                >
                    {(addReceipt, { loading, error, data }) => {
                        return (
                            <>
                                <button className="add" onClick={this.onToggle}>Add Receipt</button>

                                <form className={cls}>
                                    <fieldset>
                                        <legend>Add Receipt</legend>

                                        <div>
                                            <label htmlFor='stores'>Select Store:</label>
                                            { StoresList(this.state.storeId, this.onFormControlChange) }
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
                                                onChange={this.onFormControlChange} />
                                        </div>

                                        <div>
                                            <label htmlFor='purchaseDate'>Date of Purchase:</label>
                                            <Calendar
                                                id='purchaseDate'
                                                name='purchaseDate'
                                                value={this.state.purchaseDateDate}
                                                onChange={this.onDateChange}
                                            />
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

                                { ReceiptsGrid() }
                                { loading && <p>Loading...</p> }
                                { error && <p>Error :( Please try again</p> }
                            </>
                        );
                    }}
                </Mutation>

                { !!this.state.errors.length && <Error fields={this.state.errors} /> }
            </>
        );
    }
}

