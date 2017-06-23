import React from 'react';
import Form from './Form';

// TODO: Change key values!
// TODO: prop types!

export default class AddProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            product: ''
        };

        this.onStateChange = this.onStateChange.bind(this);
    }

    render() {
        return (
            <Form onStateChange={this.onStateChange} legend='Add Product'>
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
                    <label htmlFor='street'>Product:</label>

                    <input
                        id='product'
                        name='product'
                        type='text'
                        value={this.state.product}
                        onChange={this.props.onChange} />
                </div>
            </Form>
        );
    }

    onStateChange(state) {
        this.setState(state);
    }
}

