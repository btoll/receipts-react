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
                <NavLink activeClassName='active' to='/add-receipt'>
                    Add Receipt
                </NavLink>
            </li>

            <li>
                <NavLink activeClassName='active' to='/add-store'>
                    Add Store
                </NavLink>
            </li>

            <li>
                <NavLink activeClassName='active' to='/add-product'>
                    Add Product
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

