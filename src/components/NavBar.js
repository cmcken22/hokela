import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ user }) => {
  return (
    <div className='nav'>
      <header className='nav__header'>
        <div className='logo'><img alt='logo'/></div>
        <h1>Hokela</h1>
      </header>
      <ul className='nav__list'>
        <li><NavLink className='nav__item' activeClassName='nav__item--active' to='/'>Home</NavLink></li>
        <li><NavLink className='nav__item' activeClassName='nav__item--active' to='/causes'>Find Causes</NavLink></li>
        <li><NavLink className='nav__item' activeClassName='nav__item--active' to='/volunteers'>Find Volunteers</NavLink></li>
        <li><NavLink className='nav__item' activeClassName='nav__item--active' to='/contact'>Contact Us</NavLink></li>
        {user ?
          <li><NavLink className='nav__item' activeClassName='nav__item--active' to='/:user_id'>{user.name}</NavLink></li> :
          <li><NavLink className='nav__item' activeClassName='nav__item--active' to='/login'>Login</NavLink></li>
        }
      </ul>
    </div>
  )
}

export default NavBar
