import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";

import * as causeActions from 'Actions/causeActions';
import { fromJS } from 'immutable';

let calling = false;

const Footer = ({
  cause,
  causes,
  setCause, 
  history,
  nextPageToken,
  causeActions,
  currentPage,
  pages
}) => {
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    detectCurrentCauseIndex();
  }, []);
  
  useEffect(() => {
    detectCurrentCauseIndex();
  }, [cause.get('_id'), causes]);

  const detectCurrentCauseIndex = () => {
    let counter = 0;
    let currentCauseIndex = -1;
    causes && causes.find(item => {
      if (item.get('_id') === cause.get('_id')) {
        currentCauseIndex = counter;
        return true;
      }
      counter++
    });

    if (currentCauseIndex === -1) {
      if (nextPageToken && !calling) {
        calling = true;
        return causeActions.loadMoreCauses(null, null, nextPageToken).then(res => {
          calling = false;
        });
      }
    }
    setCurrentIndex(currentCauseIndex);
  }

  const handleNextCause = () => {
    const nextCauseIndex = currentIndex + 1;
    if (nextCauseIndex > causes.count() - 1) {
      if (nextPageToken) {
        causeActions.loadMoreCauses(null, null, nextPageToken).then(res => {
          if (res) {
            const nextCause = fromJS(res[0]);
            const nextCauseId = nextCause.get('_id');
            history.push(`/causes/${nextCauseId}`);
            setCause(nextCause);
            return causeActions.updatePage('ALL', currentPage + 1);
          }
        });
      }
      return;
    }

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
    const prevCauseIndex = currentIndex - 1;
    if (prevCauseIndex < 0) {
      if (currentPage > 0) {
        const prevPage = pages.get(currentPage - 1);
        if (prevPage) {
          const docs = prevPage.get('docs');
          const size = docs.count();
          const prevCause = docs.toIndexedSeq().get(size - 1);
          const prevCauseId = prevCause.get('_id');
          history.push(`/causes/${prevCauseId}`);
          setCause(prevCause);
          return causeActions.updatePage('ALL', currentPage - 1);
        }
      }
      return;
    }

    const prevCause = causes && causes.toIndexedSeq().get(prevCauseIndex);
    if (prevCause) {
      const prevCauseId = prevCause.get('_id');
      if (setCause) {
        history.push(`/causes/${prevCauseId}`);
        setCause(prevCause);
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
      currentPage,
      pages: state.getIn(['causes', 'ALL', 'pages']),
      causes: state.getIn(['causes', 'ALL', 'pages', currentPage, 'docs']),
      nextPageToken: state.getIn(['causes', 'ALL', 'pages', currentPage, 'nextPageToken']),
    })
  },
  dispatch => ({
    causeActions: bindActionCreators(causeActions, dispatch)
  })
)(withRouter(Footer));