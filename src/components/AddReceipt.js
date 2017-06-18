import React from 'react';

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

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <fieldset>
                    <legend>Add Receipt</legend>
                    <div>
                        <label htmlFor='stores'>Select Store:</label>

                        <select id='stores' name="list" value={this.state.list} onChange={this.onChange}>
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
                            className='submit'
                            type='submit'>
                            Submit
                        </button>
                    </div>
                </fieldset>
            </form>
        );
    }

    onSubmit(e) {
        e.preventDefault();
        alert('pete!');
    }

    onChange(e) {
        const target = e.target;

        this.setState({
            [target.name]: target.value
        });
    }
}

