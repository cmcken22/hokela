import React, { Component } from 'react';
import { Row, Col } from 'antd';
import cx from 'classnames';

import './section.scss';

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderIcon = () => {
    const { icon } = this.props;
    return (
      <div className="section__icon">
        <img src={icon} />
      </div>
    );
  }

  render() {
    const { title, content, dark, icon } = this.props;
    return (
      <div className={cx("section", {
        "section--dark": dark
      })}>
        <div className="section__inner">
          <Row gutter={[20, 16]}>
            <Col span={24}>
              <div className="section__header">
                <h2>{title}</h2>
                {!!icon ? this.renderIcon() : (
                  <div className="section__line" />
                )}
              </div>
            </Col>
          </Row>
          {content && content()}
        </div>
      </div>
    );
  }
}


export default Section;
