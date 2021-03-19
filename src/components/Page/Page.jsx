import React, { Component } from 'react';
import cx from 'classnames';

import Footer from '../Footer';
import './page.scss';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { classNames, children } = this.props;

    return (
      <>
        <div className={cx("page", {
          [classNames]: !!classNames
        })}>
          {children}
        </div>
        <Footer />
      </>
    );
  }
}


export default Page;
