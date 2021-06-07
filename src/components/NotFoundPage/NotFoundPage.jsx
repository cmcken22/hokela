import React from 'react';
import { withRouter } from "react-router-dom";
import Page from '../Page';
import { Row, Col } from '../Grid';
import './not-found-page.scss';
import Button from '../Button';

const NotFoundPage = ({ history }) => {
  const { en: { labels } } = NotFoundPage.constants;

  const sendUserHome = () => {
    console.clear();
    console.log('history:', history);
    history.push('/home');
  }

  return (
    <Page>
      <div className="not-found-page">

        <Row>
          <Col span={6}>
            <div className="not-found-page__col not-found-page__col--left">

            </div>
          </Col>
          <Col span={6}>
            <div className="not-found-page__col not-found-page__col--right">
              <h1>{labels.title}</h1>
              <p>{labels.messagePart1}</p>
              <p>{labels.messagePart2}</p>
              <Button
                caseSensitive
                onClick={sendUserHome}
              >
                {labels.acceptBtn}
              </Button>
            </div>
          </Col>
        </Row>

      </div>
    </Page>
  );
}

NotFoundPage.constants = {
  en: {
    labels: {
      title: 'Oops!',
      messagePart1: 'We searched all over this galaxy but couldn’t find what you were looking for. ',
      messagePart2: 'Try going back to the previous page or let us take you back to home base.',
      acceptBtn: 'Return home'
    }
  }
};

export default withRouter(NotFoundPage);