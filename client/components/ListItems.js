// @flow
import React from 'react';

type Single = {
    item: { cost: number, productId: string, quantity: number },
    products: Array<{ id: string, brand: string, product: string }>,
    onChange: Function,
    onRemove: Function
};

type Many = {
    items: Array<{ cost: number, productId: string, quantity: number }>,
    products: Array<{ id: string, brand: string, product: string }>,
    onListItemChange: Function,
    onListItemRemove: Function
};

const ListItem = ({
    item,
    products,
    onChange,
    onRemove
}: Single) =>
    (
        <li>
            <label htmlFor='productId'>Item:
                <select
                    name='productId'
                    value={item.productId}
                    onChange={onChange}
                >
                    <option>Select Product</option>
                    {
                        products.map(item =>
                            // These IDs care coming from the db so they are safe to use.
                            <option
                                key={item.id}
                                value={item.id}
                            >{item.product} {item.brand}</option>
                        )
                    }
                </select>
            </label>

            <label htmlFor='cost'>Cost:
                <input
                    name='cost'
                    type='text'
                    value={item.cost}
                    onChange={onChange}
                    />
            </label>

            <label htmlFor='quantity'>Quantity:
                <input
                    name='quantity'
                    type='text'
                    value={item.quantity}
                    onChange={onChange}
                />
            </label>

            <label>
                <button onClick={onRemove}>-</button>
            </label>
        </li>
    );

const ListItems = ({
    items,
    products,
    onListItemChange,
    onListItemRemove
}: Many) =>
    (
        <ul>
            {
                items.map((item, i) =>
                    <ListItem
                        key={i}
                        item={item}
                        products={products}
                        onChange={onListItemChange.bind(null, item)}
                        onRemove={onListItemRemove.bind(null, item)}
                    />
                )
            }
        </ul>
    );

export default ListItems;

