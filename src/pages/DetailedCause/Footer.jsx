import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";

import * as causeActions from 'Actions/causeActions';
import { fromJS } from 'immutable';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: -1
    };
    this.loading = false;
  }

  componentDidMount() {
    const { currentIndex } = this.state;
    const { currentPage } = this.props;
    if (currentIndex === -1) {
      this.detectCurrentCauseIndex();
      this.skipToCurrentPage(currentPage);
    }
  }

  componentDidUpdate(prevProps) {
    const { currentIndex } = this.state;
    const { causes } = this.props;
    const { causes: prevCauses } = prevProps;

    if (causes !== prevCauses && currentIndex === -1 && !this.loading) {
      this.skipToCurrentPage();
    }
    if (causes !== prevCauses) {
      this.detectCurrentCauseIndex();
    }
  }

  skipToCurrentPage = async () => {
    const { cause, causes, causeActions, nextPageToken } = this.props;
    const currentCauseId = cause.get('_id');
    if (!causes) return;

    const currentCause = causes.get(currentCauseId);
    if (!currentCause && nextPageToken && !this.loading) {
      this.loading = true;
      const nextCausesRes = await causeActions.loadMoreCauses(null, null, nextPageToken);
      if (nextCausesRes) {
        this.loading = false;
        const { docs } = nextCausesRes;
        const currentCause = fromJS(docs).get(currentCauseId);
        if (!currentCause) return this.skipToCurrentPage();
      }
    }
  }

  detectCurrentCauseIndex = () => {
    const { cause, causes, currentPage, pages } = this.props;
    let counter = 0;
    let currentCauseIndex = -1;
    causes && causes.find(item => {
      if (item.get('_id') === cause.get('_id')) {
        currentCauseIndex = counter;
        return true;
      }
      counter++
    });
    // console.clear();
    // console.log('currentCauseIndex:', currentCauseIndex, currentPage);
    // console.log('pages:', pages);
    const currentCause = pages && pages.get(currentPage).get('docs').toIndexedSeq().get(currentCauseIndex);
    // console.log('currentCause:', currentCause);
    if (currentCause.get('_id') === cause.get('_id')) {
      // console.log('YESSSS');
      this.setState({ currentIndex: currentCauseIndex });
    }
  }

  handleNextCause = () => {
    const { currentIndex } = this.state;
    const { causes, causeActions, nextPageToken, currentPage, setCause, history } = this.props;

    const nextCauseIndex = currentIndex + 1;
    if (nextCauseIndex > causes.count() - 1) {
      if (nextPageToken) {
        causeActions.loadMoreCauses(null, null, nextPageToken).then(res => {
          if (res) {
            const { docs } = res;
            const nextCause = fromJS(docs[0]);
            const nextCauseId = nextCause.get('_id');
            history.push(`/causes/${nextCauseId}`);
            if (setCause) {
              setCause(nextCause);
              return causeActions.updatePage('ALL', currentPage + 1);
            }
          }
        });
      }
      return;
    }

    const nextCause = causes && causes.toIndexedSeq().get(nextCauseIndex);
    if (nextCause) {
      const nextCauseId = nextCause.get('_id');
      if (setCause) {
        this.setState({ currentIndex: nextCauseIndex }, () => {
          history.push(`/causes/${nextCauseId}`);
          setCause(nextCause);
        });
      }
    }
  }

  handlePrevCause = () => {
    const { currentIndex } = this.state;
    const { causes, causeActions, pages, currentPage, setCause, history } = this.props;

    const prevCauseIndex = currentIndex - 1;
    console.clear();
    console.log('currentPage:', currentPage);
    console.log('prevCauseIndex:', prevCauseIndex);
    // debugger;
    if (prevCauseIndex < 0) {
      console.log('NOPEEE');
      console.log('currentPage - 1:', currentPage - 1);
      const prevPage = pages.get(currentPage - 1);
      console.log('prevPage:', prevPage);
      debugger;
      if (prevPage) {
        const docs = prevPage.get('docs');
        const size = docs.count();
        const prevCause = docs.toIndexedSeq().get(size - 1);
        const prevCauseId = prevCause.get('_id');
        console.log('prevCause:', prevCause);
        history.push(`/causes/${prevCauseId}`);
        this.setState({ currentIndex: size - 1 }, () => {
          if (setCause) {
            history.push(`/causes/${prevCauseId}`);
            setCause(prevCause);
            return causeActions.updatePage('ALL', currentPage - 1);
          }
          });
      }
      return;
    }

    const prevCause = causes && causes.toIndexedSeq().get(prevCauseIndex);
    console.log('prevCause:', prevCause);
    // debugger;
    if (prevCause) {
      console.log('YASSSS');
      const prevCauseId = prevCause.get('_id');
      if (setCause) {
        this.setState({ currentIndex: prevCauseIndex }, () => {
          history.push(`/causes/${prevCauseId}`);
          setCause(prevCause);
          return causeActions.updatePage('ALL', currentPage - 1);
        });
      }
    }
  }

  render() {
    // const { currentPage } = this.props;
    // console.clear();
    // console.log('currentPage:', currentPage);

    return (
      <div className="cause__footer">
        <div className="cause__footer__buttons">
        </div>
        <div
          onClick={this.handlePrevCause}
          className="cause__footer__btn cause__footer__btn--left">
        </div>
        <div
          onClick={this.handleNextCause}
          className="cause__footer__btn cause__footer__btn--right">
        </div>
      </div>
    );
  }
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