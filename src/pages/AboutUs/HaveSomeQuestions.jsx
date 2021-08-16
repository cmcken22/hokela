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
    <div className="about__section about__section--questions">
      <Row>
        <Col span={12}>
          <h1>Have some questions?</h1>
          <div className="about__action-container about__action-container--small">
            <Button
              secondary
              caseSensitive
              onClick={openContactUsModal}
            >
              Contact us
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  state => ({}),
  dispatch => ({
    modalActions: bindActionCreators(modalActions, dispatch),
  })
)(HaveSomeQuestions);