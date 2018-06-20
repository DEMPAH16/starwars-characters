import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ()=> (
    <header>
        <Link to="/">
            <h1>Store Destroyer</h1>
        </Link>
        <nav></nav>
    </header>
)

export default Header;