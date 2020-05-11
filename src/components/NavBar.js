import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

const NavBar = ({ email, onLogin, onLogout }) => {
  return (
    <div className='nav'>
      <header className='nav__header'>
        <div className='nav__logo--icon' />
        <div className='nav__logo--text' />
      </header>
      <ul className='nav__list'>
        <li><NavLink className='nav__item' activeClassName='nav__item--active' to='/'>Home</NavLink></li>
        <li><NavLink className='nav__item' activeClassName='nav__item--active' to='/causes'>Find Causes</NavLink></li>
        <li><NavLink className='nav__item' activeClassName='nav__item--active' to='/volunteers'>Find Volunteers</NavLink></li>
        <li><NavLink className='nav__item' activeClassName='nav__item--active' to='/contact'>Contact Us</NavLink></li>
        {email ? (
          // <li><NavLink className='nav__item' activeClassName='nav__item--active' to='/:user_id'>{email}</NavLink></li> 
          <li><a onClick={onLogout}>Logout</a></li>
        ) : (
          <li><a onClick={onLogin}>Login</a></li>
        )}
      </ul>
    </div>
  )
}

export default connect(
  state => ({
    userInfo: state.get('user'),
    email: state.getIn(['user', 'email'])
  }),
  dispatch => ({

  })
)(withRouter(NavBar));
