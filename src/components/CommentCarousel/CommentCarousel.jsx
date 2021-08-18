import React, { Component } from 'react'
import cx from 'classnames';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Comment from './Comment';
import { Row, Col } from 'Components/Grid';

const ANIMATION_DURATION = 500;
const BASE_CONTAINER_HEIGHT = 434;

class CommentCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      containerHeight: BASE_CONTAINER_HEIGHT,
      fullView: false,
      content: [
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
          name: 'Jane Doe',
          title: 'Executive Director at Hope for Ataxia'
        },
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
          name: 'John Smith',
          title: 'Executive Director at Hope for Ataxia'
        },
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
          name: 'Jessica Sanchez',
          title: 'Executive Director at Hope for Ataxia'
        },
        {
          text: "Tan bonitoooooo...",
          name: 'Gabi Nunez',
          title: 'Executive Director at Hope for Ataxia'
        },
        {
          text: 'Spikeball??!',
          name: 'Matt From Montreal',
          title: 'Executive Director at Hope for Ataxia'
        },
      ]
    };
    this.timerId = null;
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    if (!this.contentRef) return;

    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.timerId = setTimeout(() => {
      let maxHeight = BASE_CONTAINER_HEIGHT;
      for (let key in this.contentRef) {
        const { height } = this.contentRef[key].getBoundingClientRect();
        if (height > maxHeight) maxHeight = height;
      }
      this.setState({ containerHeight: maxHeight });
    }, 200);
  }

  createRef = (type, ref) => {
    if (!this.contentRef) this.contentRef = {};
    if (!this.contentRef[type]) {
      this.contentRef[type] = ref;
      if (Object.keys(this.contentRef).length === 4) {
        this.handleResize();
      }
    }
  }

  handleLeftArrowClick = () => {
    const { fullView } = this.state;
    if (fullView) {
      const nextContent = this.shiftLeft();
      return this.setState({ content: nextContent });
    }

    this.beginAnimation('left');
  }

  handleRightArrowClick = () => {
    const { fullView } = this.state;
    if (fullView) {
      const nextContent = this.shiftRight();
      return this.setState({ content: nextContent });
    }

    this.beginAnimation('right');
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
      }, ANIMATION_DURATION);
    });
  }

  renderItem = (type, item, callback, index) => {
    const { text, name, title } = item;

    return (
      <div className={`item item__${type}`}>
        <div className="item__content" ref={callback ? (ref) => callback(type, ref) : undefined}>
          <Comment
            key={`comment--${index}`}
            index={index}
            title={title}
            text={text}
            name={name}
            onClick={this.toggleFullView}
          />
        </div>
      </div>
    );
  }

  renderLargeComments = (type, item, index) => {
    const { fullView } = this.state;
    const { text, name, title } = item;
    if (!fullView) return null;

    return (
      <div className="comment-carousel__large-container">
        <Row>
          <Col span={8} offset={2}>
            <div className="content">
              <Comment
                key={`comment--${index}`}
                index={index}
                title={title}
                text={text}
                name={name}
                onClick={this.toggleFullView}
                large
              />
            </div>
          </Col>
        </Row>
        {this.renderArrows()}
      </div>
    );
  }

  renderArrows = () => {
    return (
      <>
        <div
          onClick={this.handleLeftArrowClick}
          className="comment-carousel__button comment-carousel__button--left"
        >
          <LeftOutlined style={{ color: 'white', fontSize: 16 }} />
        </div>
        <div
          onClick={this.handleRightArrowClick}
          className="comment-carousel__button comment-carousel__button--right"
        >
          <RightOutlined style={{ color: 'white', fontSize: 16 }} />
        </div>
      </>
    );
  }

  toggleFullView = () => {
    const { fullView } = this.state;
    this.setState({ fullView: !fullView });
  }

  render() {
    const { active, content, containerHeight, fullView } = this.state;

    return (
      <div className="comment-carousel-container">
        <div
          className={cx("comment-carousel", {
            "comment-carousel--active-right": active === 'right',
            "comment-carousel--active-left": active === 'left',
          })}
          style={{
            height: `${containerHeight}px`
          }}
        >
          {this.renderLargeComments('main', content[1], 1)}
          <div className="content">
            {content[0] && this.renderItem('prev', content[0], this.createRef, 0)}
            {content[1] && this.renderItem('main', content[1], this.createRef, 1)}
            {content[2] && this.renderItem('next', content[2], this.createRef, 2)}
            {content[3] && this.renderItem('last', content[3], this.createRef, 3)}
          </div>
        </div>
        {!fullView && this.renderArrows()}
      </div>
    );
  }
}

CommentCarousel.constants = {
  en: {
    labels: {}
  }
};

export default CommentCarousel;
