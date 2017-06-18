import React from 'react';
import { NavLink } from 'react-router-dom';

// TODO: Change key values!

const navItems = [
    'New Receipt',
    'New Store',
    'New Product',
    'Query'
];

const replace = s =>
    s.replace(/\s/g, '_');

export default function Nav() {
    return (
        <ul className='nav'>
            <li>
                <NavLink exact activeClassName='active' to='/'>
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink activeClassName='active' to='/new-receipt'>
                    New Receipt
                </NavLink>
            </li>

            <li>
                <NavLink activeClassName='active' to='/new-store'>
                    New Store
                </NavLink>
            </li>

            <li>
                <NavLink activeClassName='active' to='/new-product'>
                    New Product
                </NavLink>
            </li>

            <li>
                <NavLink activeClassName='active' to='/query'>
                    Query
                </NavLink>
            </li>
        </ul>
//         <ul>
//             {
//                 navItems.map(name =>
//                     <li key={name}>
//                         <NavLink activeClassName='active' to={'/' + replace(name)}>
//                             foo
//                         </NavLink>
//                     </li>
//                 )
//             }
//         </ul>
    );
}

