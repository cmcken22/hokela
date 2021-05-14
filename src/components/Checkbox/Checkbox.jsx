import React, { Component } from 'react'
import cx from 'classnames';
import { CheckOutlined } from '@ant-design/icons';


import "./checkbox.scss";

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
    };
  }

  handleClick = () => {
    const { checked } = this.state;
    const { onClick, title } = this.props;

    const nextChecked = !checked;
    this.setState({ checked: nextChecked }, () => {
      if (onClick) onClick(title);
    });
  }

  render() {
    const { checked } = this.state;
    const { title } = this.props;

    return(
      <div
        onClick={this.handleClick}
        className="xcheckbox"
      >
        <div className={cx("xcheckbox__icon", {
          "xcheckbox__icon--active": checked
        })}
        >
          <CheckOutlined
            // style={{
            //   color: 'white'
            // }}
          />
        </div>
        <p>{title}</p>
      </div>
    );
  }
}

export default Checkbox;
