// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav() {
    return (
        <ul className='nav'>
            <li>
                <NavLink exact activeClassName='active' to='/'>
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink activeClassName='active' to='/receipts'>
                    Receipts
                </NavLink>
            </li>

            <li>
                <NavLink activeClassName='active' to='/stores'>
                    Stores
                </NavLink>
            </li>

            <li>
                <NavLink activeClassName='active' to='/products'>
                    Products
                </NavLink>
            </li>

            <li>
                <NavLink activeClassName='active' to='/query'>
                    Query
                </NavLink>
            </li>
        </ul>
    );
}

