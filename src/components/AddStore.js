import React from 'react';

// TODO: Change key values!
// TODO: prop types!

const stores = [
    { name: "Lowe's", street: 'Lancaster Road', city: 'Leominster', state: 'MA' },
    { name: 'Tractor Supply Co.', street: 'Lancaster Road', city: 'Leominster', state: 'MA' },
    { name: 'Pickity Place', street: '248 Nutting Hill Road', city: 'Mason', state: 'NH' },
    { name: 'Gardner Agway', street: '3 West Broadway', city: 'Gardner', state: 'MA' }
];

export default class AddStore extends React.Component {
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
                    <legend>Add Store</legend>

                    <div>
                        <label htmlFor='name'>Name:</label>

                        <input
                            id='name'
                            name='name'
                            type='text'
                            value={this.state.name}
                            onChange={this.onChange} />
                    </div>

                    <div>
                        <label htmlFor='street'>Street:</label>

                        <input
                            id='street'
                            name='street'
                            type='text'
                            placeholder='Optional'
                            value={this.state.purchaseDate}
                            onChange={this.onChange} />
                    </div>

                    <div>
                        <label htmlFor='city'>City:</label>

                        <input
                            id='city'
                            name='city'
                            type='text'
                            value={this.state.city}
                            onChange={this.onChange} />
                    </div>

                    <div>
                        <label htmlFor='state'>State:</label>

                        <input
                            id='state'
                            name='state'
                            type='text'
                            placeholder='MA'
                            value={this.state.state}
                            onChange={this.onChange} />
                    </div>

                    <div>
                        <label htmlFor='zip'>Zip:</label>

                        <input
                            id='zip'
                            name='zip'
                            type='text'
                            placeholder='Optional'
                            value={this.state.zip}
                            onChange={this.onChange} />
                    </div>

                    <div>
                        <label htmlFor='phone'>Phone:</label>

                        <input
                            id='phone'
                            name='phone'
                            type='text'
                            placeholder='717-737-8879'
                            value={this.state.phone}
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

