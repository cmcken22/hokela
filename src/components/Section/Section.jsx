import React, { Component } from 'react';
import { Row, Col } from 'antd';
import cx from 'classnames';

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderIcon = () => {
    const { icon, hideIcon } = this.props;

    if (hideIcon) return null;
    if (!!icon) return this.renderDisplayIcon();
    return this.renderLine();
  }

  renderDisplayIcon = () => {
    const { icon } = this.props;

    return (
      <div className="section__icon">
        <img src={icon} />
      </div>
    );
  }

  renderLine = () => {
    return (
      <div className="section__line" />
    );
  }

  render() {
    const {
      title,
      content,
      dark,
      darkGradient,
      icon,
      className
    } = this.props;

    return (
      <div className={cx("section", {
        "section--dark": dark,
        "section--dark-gradient": darkGradient,
        [className]: !!className
      })}>
        <div className="section__inner">
          <Row gutter={[20, 16]}>
            <Col span={24}>
              <div className="section__header">
                {title && (<h2>{title}</h2>)}
                {this.renderIcon()}
              </div>
            </Col>
          </Row>
          {content && content()}
          <div className="section__outer" />
        </div>
      </div>
    );
  }
}


export default Section;
