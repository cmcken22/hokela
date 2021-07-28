import React, { Component } from 'react';
import cx from 'classnames';

import Footer from '../Footer';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { className, children, large } = this.props;

    return (
      <>
        <div className={cx("page", {
          "page--large": large,
          [className]: !!className
        })}>
          {children}
        </div>
        <Footer />
      </>
    );
  }
}


export default Page;
