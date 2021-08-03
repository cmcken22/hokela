import React from 'react';
import cx from 'classnames';
import { Row, Col } from 'Components/Grid';
import { FormatLink } from 'Utils/string';

const downloadVolunteerPostingForm = () => {
  console.clear();
  console.log('YOOOO');
}

const Card = ({ index, children }) => {
  return (
    <div className={cx("find__intro-card", {
      [`find__intro-card--${index}`]: !!index
    })}>
      <div className={cx("find__intro-card__counter", {
        [`find__intro-card__counter--${index}`]: !!index
      })} />
      {children}
      <div className={cx("find__intro-card__image", {
        [`find__intro-card__image--${index}`]: !!index
      })} />
    </div>
  );
}

const Intro = () => {
  return (
    <div className="find__section find__section--intro">
      <Row>
        <Col span={6} offset={3}>
          <div className="find__intro-header">
            <h3>You’re on your way to finding the right candidate.</h3>
            <p>Follow the steps below to have your volunteer positions posted on our site.</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <Card index={1}>
            <p>
              <strong>Download</strong> our fillable {FormatLink("@{{Volunteer Posting Form}}", downloadVolunteerPostingForm)}
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card index={2}>
            <p>
              <strong>Complete the form</strong> with information about your organization and the position.
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card index={3}>
            <p>
              <strong>Email us</strong> the completed form at <a href="mailto:webmaster@example.com">info@hokela.ca</a>
            </p>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={8} offset={2}>
          <div className="find__intro-footer">
            <h3>Once we have recieved the form, our team will promptly contact you to finalize the process!</h3>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Intro;