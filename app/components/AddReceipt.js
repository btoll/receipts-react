import React from 'react';
import Form from './Form';
import Item from './Item';

// TODO: Change key values!
// TODO: prop types!

const stores = [
    { name: "Lowe's", street: 'Lancaster Road', city: 'Leominster', state: 'MA' },
    { name: 'Tractor Supply Co.', street: 'Lancaster Road', city: 'Leominster', state: 'MA' },
    { name: 'Pickity Place', street: '248 Nutting Hill Road', city: 'Mason', state: 'NH' },
    { name: 'Gardner Agway', street: '3 West Broadway', city: 'Gardner', state: 'MA' }
];

export default class AddReceipt extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: '',
            purchaseDate: '',
            totalCost: 0.00
        };

        this.onStateChange = this.onStateChange.bind(this);
    }

    render() {
        const items = [];

        return (
            <div>
                <Form onStateChange={this.onStateChange} legend='Add Receipt'>
                    <div>
                        <label htmlFor='stores'>Select Store:</label>

                        <select id='stores' name="list" value={this.state.list} onChange={this.props.onChange}>
                            <option>Select Store</option> {
                                stores.map((store, index) =>
                                    <option key={index}>{store.name}</option>
                                )
                            }
                        </select>
                    </div>

                    <div>
                        <label htmlFor='totalCost'>Total Cost:</label>

                        <input
                            id='totalCost'
                            name='totalCost'
                            type='text'
                            value={this.state.totalCost}
                            onChange={this.props.onChange} />
                    </div>

                    <div>
                        <label htmlFor='purchaseDate'>Date of Purchase:</label>

                        <input
                            id='purchaseDate'
                            name='purchaseDate'
                            type='text'
                            placeholder='mm/dd/yyyy'
                            value={this.state.purchaseDate}
                            onChange={this.props.onChange} />
                    </div>

                    <div id='items'>
                        <Item />
                    </div>
                </Form>
            </div>
        );
    }

    onStateChange(state) {
        this.setState(state);
    }
}

