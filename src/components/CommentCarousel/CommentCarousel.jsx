import React, { Component } from 'react'
import cx from 'classnames';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Comment from './Comment';

const ANIMATION_DURATION = 500;
const BASE_CONTAINER_HEIGHT = 434;

class CommentCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      containerHeight: BASE_CONTAINER_HEIGHT,
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
      console.clear();
      let maxHeight = BASE_CONTAINER_HEIGHT;
      for (let key in this.contentRef) {
        const { height } = this.contentRef[key].getBoundingClientRect();
        console.log('key:', key, this.contentRef[key], height, height > maxHeight);
        if (height > maxHeight) maxHeight = height;
      }
      console.log('maxHeight:', maxHeight);
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

  renderItem = (type, item, callback) => {
    const { text, name } = item;
    return (
      <div className={`item item__${type}`}>
        <div className="item__content" ref={callback ? (ref) => callback(type, ref) : undefined}>
          <Comment
            text={text}
            name={name}
          />
        </div>
      </div>
    );
  }

  render() {
    const { active, content, containerHeight } = this.state;

    return(
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
          <div className="content">
            {content[0] && this.renderItem('prev', content[0], this.createRef)}
            {content[1] && this.renderItem('main', content[1], this.createRef)}
            {content[2] && this.renderItem('next', content[2], this.createRef)}
            {content[3] && this.renderItem('last', content[3], this.createRef)}
          </div>
        </div>
        <div
          onClick={() => this.beginAnimation('left')}
          className="comment-carousel__button comment-carousel__button--left"
        >
          <LeftOutlined style={{ color: 'white', fontSize: 16 }} />
        </div>
        <div
          onClick={() => this.beginAnimation('right')}
          className="comment-carousel__button comment-carousel__button--right"
        >
          <RightOutlined style={{ color: 'white', fontSize: 16 }} />
        </div>
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
