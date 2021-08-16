import React, { Component } from 'react'
import cx from 'classnames';
import { Modal } from 'antd';
import Button from '../Button';

class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderCloseBtn = () => {
    const { onCancel } = this.props;

    return (
      <div
        onClick={onCancel}
        className="custom-modal__close-btn"
      />
    );
  }

  renderHeader = () => {
    const { title, subTitle } = this.props;
    if (!title) return null;

    return (
      <div className="custom-modal__header">
        <h1>{title}</h1>
        <p>{subTitle}</p>
      </div>
    );
  }

  renderFooter = () => {
    const { okBtnText, cancelBtnText, onOk, onCancel, hideCancelBtn } = this.props;

    return (
      <div className="custom-modal__footer">
        {hideCancelBtn !== true && (
          <Button
            secondary
            caseSensitive
            onClick={onCancel}
          >
            {cancelBtnText || 'Cancel'}
          </Button>
        )}
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

  getContainer = () => {
    return this.mount || document.getElementById('modal-mount');
  }

  render() {
    const {
      title,
      visible,
      onOk,
      onCancel,
      okButtonProps,
      cancelButtonProps,
    } = this.props;

    if (!visible) return null;

    return(
      <div ref={r => this.mount = r} id="modal-mount" className="custom-modal">
        <Modal
          title={title}
          visible={visible}
          getContainer={this.getContainer}
          onOk={onOk}
          onCancel={onCancel}
          okButtonProps={okButtonProps}
          cancelButtonProps={cancelButtonProps}
          footer={this.renderFooter()}
          centered
          width={740}
        >
          {this.renderHeader()}
          {this.renderCloseBtn()}
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
