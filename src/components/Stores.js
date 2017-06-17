import React from 'react';

class StoresList extends React.Component {
    render() {
        return (
            <select>
                <option>Select Store</option>
                {
                    this.props.stores.map((store, index) =>
                        <option key={index}>{store.name}</option>
                    )
                }
            </select>
        );
    }
}

export default class StoresTable extends React.Component {
    render() {
        return (
            <div>
                <StoresList stores={this.props.stores} />
            </div>
        );
    }
}

