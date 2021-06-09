import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

const Footer = ({ cause, causes, setCause, history }) => {
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    let counter = 0;
    let currentCauseIndex = -1;
    causes && causes.find(item => {
      if (item.get('_id') === cause.get('_id')) {
        currentCauseIndex = counter;
        return true;
      }
      counter++
    });
    setCurrentIndex(currentCauseIndex);
  }, [cause.get('_id')]);

  const handleNextCause = () => {
    const nextCauseIndex = currentIndex + 1;
    const nextCause = causes && causes.toIndexedSeq().get(nextCauseIndex);
    if (nextCause) {
      const nextCauseId = nextCause.get('_id');
      if (setCause) {
        history.push(`/causes/${nextCauseId}`);
        setCause(nextCause);
      }
    }
  }

  const handlePrevCause = () => {
    const nextCauseIndex = currentIndex - 1;
    const nextCause = causes && causes.toIndexedSeq().get(nextCauseIndex);
    if (nextCause) {
      const nextCauseId = nextCause.get('_id');
      if (setCause) {
        history.push(`/causes/${nextCauseId}`);
        setCause(nextCause);
      }
    }
  }

  return (
    <div className="cause__footer">
      <div className="cause__footer__buttons">
      </div>
      <div
        onClick={handlePrevCause}
        className="cause__footer__btn cause__footer__btn--left">
      </div>
      <div
        onClick={handleNextCause}
        className="cause__footer__btn cause__footer__btn--right">
      </div>
    </div>
  );
}

export default connect(
  state => {
    const currentPage = state.getIn(['causes', 'ALL', 'currentPage']);
    return ({
      causes: state.getIn(['causes', 'ALL', 'pages', currentPage, 'docs']),
    })
  }
)(withRouter(Footer));