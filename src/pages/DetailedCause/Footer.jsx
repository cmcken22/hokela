import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import * as causeActions from 'Actions/causeActions';
import { fromJS } from 'immutable';
import Button from 'Components/Button';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: -1,
    };
  }

  componentDidMount() {
    const { currentIndex } = this.state;

    if (currentIndex === -1) {
      this.detectCurrentCauseIndex();
    }
  }

  componentDidUpdate(prevProps) {
    const { causes } = this.props;
    const { causes: prevCauses } = prevProps;

    if (causes !== prevCauses) {
      this.detectCurrentCauseIndex();
    }
  }

  detectCurrentCauseIndex = () => {
    const { cause, causes, currentPage, pages } = this.props;
    if (!pages) return;

    let counter = 0;
    let currentCauseIndex = -1;

    causes && causes.find(item => {
      if (item.get('_id') === cause.get('_id')) {
        currentCauseIndex = counter;
        return true;
      }
      counter++
    });

    const docs = pages.get(currentPage).get('docs').toIndexedSeq();
    if (!docs) return;

    const currentCause = docs.toIndexedSeq().get(currentCauseIndex);    
    if (currentCause.get('_id') === cause.get('_id')) {
      return this.setState({ currentIndex: currentCauseIndex });
    }
  }

  handleNextCause = () => {
    const { currentIndex } = this.state;
    const { causes, causeActions, nextPageToken, currentPage, setCause, history } = this.props;

    const nextCauseIndex = currentIndex + 1;
    const nextCause = causes && causes.toIndexedSeq().get(nextCauseIndex);

    if (nextCause) {
      if (setCause) {
        this.setState({ currentIndex: nextCauseIndex }, () => {
          const nextCauseId = nextCause.get('_id');
          history.push(`/causes/${nextCauseId}`);
          setCause(nextCause);
        });
      }
      return;
    }

    if (nextCauseIndex > causes.count() - 1) {
      if (nextPageToken) {
        causeActions.loadMoreCauses(null, null, nextPageToken).then(res => {
          if (res) {
            const { docs } = res;
            if (setCause) {
              this.setState({ currentIndex: 0 }, () => {
                const nextCause = fromJS(docs[0]);
                const nextCauseId = nextCause.get('_id');
                history.push(`/causes/${nextCauseId}`);
                setCause(nextCause);
                return causeActions.updatePage('ALL', currentPage + 1);
              });
            }
          }
        });
      }
      return;
    }
  }

  handlePrevCause = () => {
    const { currentIndex } = this.state;
    const { causes, causeActions, pages, currentPage, setCause, history } = this.props;
    
    const prevCauseIndex = currentIndex - 1;
    if (currentPage === 0 && prevCauseIndex < 0) return;
    
    if (prevCauseIndex < 0) {
      const prevPage = pages.get(currentPage - 1);
      if (prevPage) {
        if (setCause) {
          const docs = prevPage.get('docs');
          const size = docs.count();

          this.setState({ currentIndex: size - 1 }, () => {
            const prevCause = docs.toIndexedSeq().get(size - 1);
            const prevCauseId = prevCause.get('_id');
            history.push(`/causes/${prevCauseId}`);
            setCause(prevCause);
            return causeActions.updatePage('ALL', currentPage - 1);
          });
        }
      }
      return;
    }

    const prevCause = causes && causes.toIndexedSeq().get(prevCauseIndex);
    if (prevCause) {
      if (setCause) {
        this.setState({ currentIndex: prevCauseIndex }, () => {
          const prevCauseId = prevCause.get('_id');
          history.push(`/causes/${prevCauseId}`);
          setCause(prevCause);
        });
      }
    }
  }

  handleFindMore = () => {
    const { history } = this.props;
    history.push('/causes');
  }

  handleApply = () => {
    const { onApply } = this.props;
    if (onApply) onApply();
  }

  renderActionButtons = () => {
    return (
      <div className="cause__footer__buttons">
        <Button
          secondary
          caseSensitive
          onClick={this.handleFindMore}
        >
          Find More
        </Button>
        <Button
          caseSensitive
          onClick={this.handleApply}
        >
          Apply
        </Button>
      </div>
    );    
  }

  render() {
    const { nextPageToken, currentPage } = this.props;
    const { currentIndex } = this.state;

    const leftDisabled = currentPage === 0 && (currentIndex - 1) < 0;
    const rightDisabled = !nextPageToken

    return (
      <div className="cause__footer">
        {this.renderActionButtons()}
        <div className={cx("cause__footer__btn-container", "cause__footer__btn-container--left", {
          "cause__footer__btn-container--disabled": leftDisabled
        })}>
          <div
            onClick={!leftDisabled ? this.handlePrevCause : undefined}
            className="cause__footer__btn"
          >
            <LeftOutlined style={{ color: 'white', fontSize: 16 }} />
          </div>
          <p>Previous Cause</p>
        </div>
        <div className={cx("cause__footer__btn-container", "cause__footer__btn-container--right", {
          "cause__footer__btn-container--disabled": rightDisabled
        })}>
          <div
            onClick={!rightDisabled ? this.handleNextCause : undefined}
            className="cause__footer__btn"
          >
            <RightOutlined style={{ color: 'white', fontSize: 16 }} />
          </div>
          <p>Next Cause</p>
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