import React, { Component } from 'react';
import { createPortal, render } from 'react-dom';
import { Row, Col } from 'antd';
import cx from 'classnames';

import './search.scss';
import SearchBarInner from './SearchBarInner';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.animationDuration = 400;

    this.state = {
      active: false,
      top: 264,
      test: false,
      small: false
    };
  }

  componentDidUpdate = async (prevProps) => {
    const { active: prevActive } = prevProps;
    const { active } = this.props;

    if (!prevActive && active) {
      await this.activate();
      render(
        <SearchBarInner small={true} />,
        document.getElementById('searchBar')
      );
    }
    if (prevActive && !active) {
      await this.deactivate();
      render(
        <SearchBarInner small={false} />,
        document.getElementById('searchBar')
      );
    }
  }

  activate = () => {
    return new Promise(resolve => {
      const oldDiv = $('#searchBar');
      const mount = $('#searchBarMount');
      const children = mount.children();
      for (let i = 1; i < children.length; i++) {
        const child = children[i];
        child.remove();
      }
      const newDiv = oldDiv.clone().appendTo('#mount');
      const temp = oldDiv.clone().appendTo('body');
      const x = document.getElementById('searchBarMount').getBoundingClientRect();

      temp
        .css('position', 'fixed')
        .css('left', x.left)
        .css('top', x.top)
        .css('width', x.width)
        .css('zIndex', 1000);
      newDiv.hide();
      oldDiv.hide();

      temp.animate({
        'top': 14,
        width: '200px',
        height: '40px',
        left: 29,
        right: 0
      }, this.animationDuration, () => {
        newDiv.css("width", "200px");
        newDiv.css("height", "40px");
        newDiv.addClass("search-bar--small");
        newDiv.show();
        oldDiv.remove();
        temp.remove();
        return resolve();
      });
    });
  }

  deactivate = () => {
    return new Promise(resolve => {
      const oldDiv = $('#searchBar');
      const mount = $('#searchBarMount');
      const children = mount.children();
      for (let i = 2; i < children.length; i++) {
        const child = children[i];
        child.remove();
      }
      const newDiv = oldDiv.clone().appendTo('#searchBarMount');
      const temp = oldDiv.clone().appendTo('body');
      const x = document.getElementById('searchBarMount').getBoundingClientRect();

      temp
        .css('position', 'fixed')
        .css('left', 0)
        .css('right', 0)
        .css('top', 10)
        .css('zIndex', 1000);
      newDiv.hide();
      oldDiv.hide();

      temp.animate({
        'top': 265,
        width: `${x.width}px`,
        height: `${x.height}px`,
        left: 0,
        right: 0,
      }, this.animationDuration, () => {
        newDiv.css("width", `${x.width}px`);
        newDiv.css("height", `${x.height}px`);
        newDiv.css("top", 265);
        newDiv.removeClass("search-bar--small");
        newDiv.show();
        oldDiv.remove();
        temp.remove();
        return resolve();
      });
    });
  }


  render() {
    const { small } = this.state;
    let mount = document.getElementById('searchBarMount');
    if (!mount) return null;

    return createPortal(
      <div id="searchBar" className="search-bar">
        <SearchBarInner small={small} />
      </div>,
      mount
    );
  }
}

export default SearchBar;