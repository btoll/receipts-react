import React from 'react';
import Form from './Form';

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
            name: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            phone: ''
        };

        this.onStateChange = this.onStateChange.bind(this);
    }

    render() {
        return (
            <Form onStateChange={this.onStateChange} legend='Add Store'>
                <div>
                    <label htmlFor='name'>Name:</label>

                    <input
                        id='name'
                        name='name'
                        type='text'
                        value={this.state.name}
                        onChange={this.props.onChange} />
                </div>

                <div>
                    <label htmlFor='street'>Street:</label>

                    <input
                        id='street'
                        name='street'
                        type='text'
                        placeholder='Optional'
                        value={this.state.street}
                        onChange={this.props.onChange} />
                </div>

                <div>
                    <label htmlFor='city'>City:</label>

                    <input
                        id='city'
                        name='city'
                        type='text'
                        value={this.state.city}
                        onChange={this.props.onChange} />
                </div>

                <div>
                    <label htmlFor='state'>State:</label>

                    <input
                        id='state'
                        name='state'
                        type='text'
                        placeholder='MA'
                        value={this.state.state}
                        onChange={this.props.onChange} />
                </div>

                <div>
                    <label htmlFor='zip'>Zip:</label>

                    <input
                        id='zip'
                        name='zip'
                        type='text'
                        placeholder='Optional'
                        value={this.state.zip}
                        onChange={this.props.onChange} />
                </div>

                <div>
                    <label htmlFor='phone'>Phone:</label>

                    <input
                        id='phone'
                        name='phone'
                        type='text'
                        placeholder='717-737-8879'
                        value={this.state.phone}
                        onChange={this.props.onChange} />
                </div>
            </Form>
        );
    }

    onStateChange(state) {
        this.setState(state);
    }
}

