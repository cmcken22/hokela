import React, { Component } from 'react';
import cx from 'classnames';
import { Row as AntRow } from 'antd'

class Row extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, className } = this.props;
    return (
      <AntRow
        gutter={[20, 16]}
        className={cx({
          [className]: !!className
        })}
      >
        {children}
      </AntRow>
    );
  }
}


export default Row;
