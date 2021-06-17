import React, { Component } from 'react'
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { Button } from "antd";

import * as causeActions from '../../actions/causeActions';
import * as bannerActions from '../../actions/bannerActions';
import { Row } from 'Components/Grid';
import Comment from './Comment';

class CommentCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      content: [
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
          name: 'Jane Doe'
        },
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
          name: 'John Smith'
        },
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
          name: 'Jessica Sanchez'
        },
        {
          text: "Tan bonitoooooo...",
          name: 'Gabi Nunez'
        },
        {
          text: 'Spikeball??!',
          name: 'Matt From Montreal'
        },
      ]
    };
  }

  shiftLeft = () => {
    const { content } = this.state;
    const nextContent = [...content];

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
  
  shiftRight = () => {
    const { content } = this.state;
    const nextContent = [...content];

    let firstItem = null;
    const newArray = [];
    for (let i = nextContent.length - 1; i >= 0; i--) {
      const item = nextContent[i];
      if (i === nextContent.length - 1 && firstItem === null) {
        firstItem = item;
      } else {
        newArray.unshift(item);
      }
    }
    newArray.unshift(firstItem);
    return newArray;
  }

  beginAnimation = (direction) => {
    this.setState({ active: direction }, () => {
      setTimeout(() => {
        const nextContent = direction === 'right' ? this.shiftRight() : this.shiftLeft();
        this.setState({ active: false, content: nextContent });
      }, 500);
    });
  }

  render() {
    const { active, content } = this.state;

    return(
      <>
      <div className={cx("comment-carousel", {
        "comment-carousel--active-right": active === 'right',
        "comment-carousel--active-left": active === 'left',
      })}>
        <div className="content">
          {content[0] && (
            <div className="item item__prev">
              <div className="item__content">
                <Comment
                  text={content[0].text}
                  name={content[0].name}
                />
              </div>
            </div>
          )}
          {content[1] && (
            <div className="item item__main">
              <div className="item__content">
                <Comment
                  text={content[1].text}
                  name={content[1].name}
                />
              </div>
            </div>
          )}
          {content[2] && (
            <div className="item item__next">
              <div className="item__content">
                <Comment
                  text={content[2].text}
                  name={content[2].name}
                />
              </div>
            </div>
          )}
          {content[3] && (
            <div className="item item__last">
              <div className="item__content">
                <Comment
                  text={content[3].text}
                  name={content[3].name}
                />
              </div>
            </div>
          )}

        </div>
      </div>
      <button onClick={() => this.beginAnimation('left')}>left</button>
      <button onClick={() => this.beginAnimation('right')}>right</button>
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
