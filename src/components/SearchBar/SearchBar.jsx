import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Row, Col } from 'antd';
import cx from 'classnames';
import './search.scss';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    // this.initialSearchBarPos = 264 - 100;
    this.initialSearchBarPos = null;

    this.state = {
      active: false,
      top: 264
    };
  }

  componentDidMount() {
    this.initialPos = window.scrollY;
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e) => {
    if (!this.ref) return;
    const elm = this.ref && this.ref.getBoundingClientRect();
    if (!elm) return;
    
    
    // const elm2 = document.getElementById('hello') && document.getElementById('hello').getBoundingClientRect();
    
    const { top } = this.state;
    const { scrollY, screenY } = window;
    const { top: elmTop1 } = elm;
    // const { top: elmTop2 } = elm2;
    if (this.initialSearchBarPos === null) this.initialSearchBarPos = elmTop1;

    // let nextTop = top - scrollY;
    const diff = this.initialPos - scrollY;
    const next = this.initialSearchBarPos + diff;

    // this.ref.style.top = `${next}px`;

    // this.setState({ active: scrollY > 264 - 100 });
    
    // if (!renderPortal) {
      // const active = scrollY > this.initialSearchBarPos;
      // console.log(scrollY, active);
      // console.log('top:', top);
      // this.setState({
      //   active: active,
      //   searchBarPos: top,
      // }, () => {
      //   if (active) {
      //     setTimeout(() => {
      //       this.setState({
      //         renderPortal: true,
      //         active: false
      //       });
      //     }, 250);
      //   }
      // });
    // } else {
    //   const active = scrollY < this.initialSearchBarPos;
    //   console.log('1:', scrollY, active);
    // }
  }

  render() {
    const { active, searchBarPos, renderPortal, top } = this.state;
    // return (
    //   <div
    //     ref={r => this.ref = r}
    //     className={cx("search", {
    //       "search--active": active
    //     })}
    //     style={{
    //       // top: top && `${top}px`
    //       // top: `264px`
    //     }}
    //     >
        
    //   </div>
    // );
    return createPortal(
      <div className="search">

      </div>,
      document.body
    );
  }
}

export default SearchBar;