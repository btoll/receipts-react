import React from 'react';
import ListItems from './ListItems';
import axios from 'axios';

// TODO: Change key values!
// TODO: prop types!

// const stores = [
//     { name: "Lowe's", street: 'Lancaster Road', city: 'Leominster', state: 'MA' },
//     { name: 'Tractor Supply Co.', street: 'Lancaster Road', city: 'Leominster', state: 'MA' },
//     { name: 'Pickity Place', street: '248 Nutting Hill Road', city: 'Mason', state: 'NH' },
//     { name: 'Gardner Agway', street: '3 West Broadway', city: 'Gardner', state: 'MA' }
// ];

export default class AddReceipt extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: '',
            items: [],
            totalCost: 0.00,
            purchaseDate: '',
            stores: []
        };

        this.onAddItem = this.onAddItem.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onItemChange = this.onItemChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // TODO
//         this.onRemoveItem = this.onRemoveItem.bind(this);
    }

    render() {
        const items = [];

        return (
            <form className='add-receipt' onSubmit={this.onSubmit}>
                <fieldset>
                    <legend>Add Receipt</legend>

                    <div>
                        <label htmlFor='stores'>Select Store:</label>
                        <select
                            id='stores'
                            name="list"
                            value={this.state.list}
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

                    <ListItems onAddItem={this.onAddItem} onItemChange={this.onItemChange} />

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
        axios.get('http://localhost:3000/stores')
        .then(results => {
            console.log(results);
            this.setState({
                stores: results.data
            })
        })
        .catch(console.log);
    }

    onAddItem(itemState) {
        this.setState(() => (
            this.state.items.push(itemState),
            this.state
        ));
    }

    onChange(e) {
        const target = e.target;

        this.setState({
            [target.name]: target.value
        });
    }

    onItemChange(id, name, value) {
        this.setState(() => (
            this.state.items[id][name] = value,
            this.state
        ));
    }

    onSubmit(e) {
        e.preventDefault();
    }
}

