import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { Button } from "antd";

import * as causeActions from '../../actions/causeActions';
import * as bannerActions from '../../actions/bannerActions';
import { Row } from 'Components/Grid';

class CommentCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      content: ["hello", "worldworldworldworld worldworldworldworld", "hello2"]
    };
  }

  shiftContent = () => {
    const { content } = this.state;
    const nextContent = [...content];

    // const firstItem = nextContent[0];
    // const lastItem = nextContent[nextContent.length - 1];

    let firstItem = null;
    const newArray = [];
    for (let i = 0; i < nextContent.length; i++) {
      const item = nextContent[i];
      if (i === 0 && firstItem === null) {
        firstItem = item;
      } else {
        newArray.push(item);
      }
    }
    newArray.push(firstItem);
    return newArray;
  }
  

  beginAnimation = () => {
    this.setState({ active: true }, () => {
      setTimeout(() => {
        const nextContent = this.shiftContent();
        this.setState({ active: false, content: nextContent });
      }, 500);
    });
  }

  render() {
    const { active, content } = this.state;

    return(
      <>
      <div className={cx("comment-carousel", {
        "comment-carousel--active": active
      })}>
        <div className="content">
          {content[0] && (
            <div className="item item__prev">
              <div className="item__content">
                <p>{content[0]}</p>
              </div>
            </div>
          )}
          {content[1] && (
            <div className="item item__main">
              <div className="item__content">
                <p>{content[1]}</p>
              </div>
            </div>
          )}
          {content[2] && (
            <div className="item item__next">
              <div className="item__content">
                <p>{content[2]}</p>
              </div>
            </div>
          )}
          {content[3] && (
            <div className="item item__last">
              <div className="item__content">
                <p>{content[3]}</p>
              </div>
            </div>
          )}

        </div>
      </div>
      <button onClick={this.beginAnimation}>click</button>
      </>
    );
  }
}

CommentCarousel.constants = {
  en: {
    labels: {}
  }
};

export default connect(
  state => ({
    // active: state.getIn(['banner', 'active']),
    // message: state.getIn(['banner', 'message']),
    // status: state.getIn(['banner', 'status']),
    // actions: state.getIn(['banner', 'actions'])
  }),
  dispatch => ({
    // bannerActions: bindActionCreators(bannerActions, dispatch),
    // causeActions: bindActionCreators(causeActions, dispatch)
  })
)(CommentCarousel);
