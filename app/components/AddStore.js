import React from 'react';
import axios from 'axios';

// TODO: Change key values!
// TODO: prop types!

export default class AddStore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            store: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            phone: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
            <form className='add-store' onSubmit={this.onSubmit}>
                <fieldset>
                    <legend>Add Store</legend>

                    <div>
                        <label htmlFor='store'>Name:</label>

                        <input
                            id='store'
                            name='store'
                            type='text'
                            value={this.state.store}
                            onChange={this.onChange} />
                    </div>

                    <div>
                        <label htmlFor='street'>Street:</label>

                        <input
                            id='street'
                            name='street'
                            type='text'
                            placeholder='Optional'
                            value={this.state.street}
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

    onChange(e) {
        const target = e.target;

        this.setState({
            [target.name]: target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        // TODO: Clear state when submitted.
        // TODO: Move uri out of this file.
        axios.post('http://localhost:3000/stores', this.state)
        .then(() => console.log('success'))
        .catch(() => console.log('error'));
    }
}

