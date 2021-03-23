import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { Col as AntCol } from 'antd'

class Col extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, span, offset, className, mobile } = this.props;

    const formattedSpan = !isNaN(span) ? span * 2 : 0;
    const formattedOffset = !isNaN(offset) ? offset * 2 : 0;

    return (
      <AntCol
        className={cx({
          [className]: !!className
        })}
        xl={{
          span: formattedSpan,
          offset: formattedOffset
        }}
        md={{
          // span: mobile ? 24 : formattedSpan,
          // offset: mobile ? 0 : formattedOffset
          span: formattedSpan,
          offset: formattedOffset
        }}
        sm={{
          span: 24,
          offset: 0
        }}
        xs={{
          span: 24,
          offset: 0
        }}
      >
        {children}
      </AntCol>
    );
  }
}


export default connect(
  state => ({
    mobile: state.getIn(['app', 'mobile']),
  })
)(Col);
