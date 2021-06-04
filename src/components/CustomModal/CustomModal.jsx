import React, { Component } from 'react'
import cx from 'classnames';
import { Modal } from 'antd';
import './custom-modal.scss';
import Button from '../Button';
// import { saveCookie } from '../../utils';
// import * as causeActions from '../../actions/causeActions';
// import * as volunteerActions from '../../actions/volunteerActions';

class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderHeader = () => {
    const { title, subTitle, onCancel } = this.props;

    return (
      <div className="custom-modal__header">
        <h1>{title}</h1>
        <p>{subTitle}</p>
        <div
          onClick={onCancel}
          className="custom-modal__close-btn"
        />
      </div>
    );
  }

  renderFooter = () => {
    const { okBtnText, cancelBtnText, onOk, onCancel } = this.props;

    return (
      <div className="custom-modal__footer">
        <Button
          secondary
          caseSensitive
          onClick={onCancel}
        >
          {cancelBtnText || 'Cancel'}
        </Button>
        <Button
          caseSensitive
          onClick={onOk}
        >
          {okBtnText || 'Continue'}
        </Button>
      </div>
    );
  }

  renderBody = () => {
    const { children } = this.props;

    return (
      <div className="custom-modal__body">
        {children}
      </div>
    )
  }

  render() {
    const {
      title,
      visible,
      onOk,
      onCancel,
      okButtonProps,
      cancelButtonProps,
      children
    } = this.props;

    return(
      <div id="modal-mount" className="custom-modal">
        <Modal
          title={title}
          visible={visible}
          getContainer={() => document.getElementById('modal-mount')}
          onOk={onOk}
          onCancel={onCancel}
          okButtonProps={okButtonProps}
          cancelButtonProps={cancelButtonProps}
          footer={this.renderFooter()}
          centered
          width={740}
        >
          {this.renderHeader()}
          {this.renderBody()}
        </Modal>
      </div>
    );
  }
}

CustomModal.constants = {
  en: {
    labels: {}
  },
};

export default CustomModal;
