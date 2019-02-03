// @flow
import React from 'react';
import { List } from 'immutable';

import { Products as ProductsQuery } from '../queries/Products';

type Single = {
    item: {
        cost: number,
        productId: string,
        quantity: number
    },
    onChange: Function,
    onRemove: Function
};

type Many = {
    items: Array<{
        cost: number,
        productId: string,
        quantity: number
    }>,
    onListItemChange: Function,
    onListItemRemove: Function
};

const ListItem = ({
    item,
    onChange,
    onRemove
}: Single) =>
    (
        <li>
            <label htmlFor='productId'>Item:
                { ProductsQuery(item.productId, onChange) }
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
    onListItemChange,
    onListItemRemove
}: Many) =>
    (
        <ul>
            {
                List(items).map((item, i) =>
                    <ListItem
                        key={i}
                        item={item}
                        onChange={onListItemChange.bind(null, item)}
                        onRemove={onListItemRemove.bind(null, item)}
                    />
                )
            }
        </ul>
    );

export default ListItems;

