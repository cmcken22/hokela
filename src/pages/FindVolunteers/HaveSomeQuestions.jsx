import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as modalActions from 'Actions/modalActions';
import { Row, Col } from 'Components/Grid';
import Button from 'Components/Button';

const HaveSomeQuestions = ({ modalActions }) => {

  const openContactUsModal = () => {
    modalActions.toggleModal('contact-us');
  };

  return (
    <div className="find__section find__section--questions">
      <Row>
        <Col span={9}>
          <h1>Have some questions?</h1>
          <p>We’d be happy to help. Contact us for any questions you may have.</p>
          <div className="find__action-container find__action-container--small">
            <Button
              caseSensitive
              onClick={openContactUsModal}
            >
              Contact us
            </Button>
          </div>
        </Col>
        <Col span={3}>
          <div className="find__questions-image" />
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  state => ({

  }),
  dispatch => ({
    modalActions: bindActionCreators(modalActions, dispatch),
  })
)(HaveSomeQuestions);