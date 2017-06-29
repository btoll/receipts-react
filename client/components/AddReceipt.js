import React from 'react';
import ListItems from './ListItems';
import axios from 'axios';
import { RECEIPTS_URL, STORES_URL } from '../config';

export default class AddReceipt extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            storeId: '',
            items: [],
            totalCost: 0.00,
            purchaseDate: '',
            stores: []
        };

        this.onChange = this.onChange.bind(this);
        this.onListItemsChange = this.onListItemsChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
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

                    <ListItems onListItemsChange={this.onListItemsChange} />

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
                        <label></label>
                        <button
                            onClick={this.onSubmit}
                            className='submit'
                            type='submit'>
                            Submit
                        </button>
                    </div>
                </fieldset>
            </form>
        );
    }

    componentDidMount() {
        axios.get(STORES_URL)
        .then(results => {
            // TODO: stores shouldn't be in state!
            this.setState({
                stores: results.data
            })
        })
        .catch(console.log);
    }

    onChange(e) {
        const target = e.target;

        this.setState({
            [target.name]: target.value
        });
    }

    // TODO: Is this incredibly expensive? Is it re-rendering everything, including children, everytime?
    // All loggers in render() methods are invoked...
    onListItemsChange(items) {
        this.setState({
            items: items
        });
    }

    onSubmit(e) {
        e.preventDefault();

        axios.post(RECEIPTS_URL, this.state)
        .then(() => console.log('success'))
        .catch(() => console.log('error'));
    }
}

