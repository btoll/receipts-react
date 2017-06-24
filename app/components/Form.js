import React from 'react';

// TODO: Change key values!
// TODO: prop types!

export default class Form extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
            <form className={this.props.className} onChange={this.onChange}>
                <fieldset>
                    <legend>{this.props.legend}</legend>

                    {this.props.children}

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

    onSubmit(e) {
        e.preventDefault();
        alert('submit!');
    }

    onChange(e) {
        const target = e.target;

        this.props.onStateChange({
            [target.name]: target.value
        });
    }
}

