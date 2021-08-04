import React, { useState, useRef, useEffect } from 'react';
import cx from 'classnames';

const Comment = ({ text, name, title, index }) => {
  const [hasOverflow, setOverflow] = useState(false)
  const inputRef = useRef(null);
  

  useEffect(() => {
    if (inputRef && inputRef.current) {
      const { current: element } = inputRef;
      const overflow = element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
      if (!hasOverflow && overflow) setOverflow(true);
      else setOverflow(false);
    }
  }, [text]);

  const handleClick = () => {
    console.clear();
    console.log('click');
  }

  return (
    <div className="comment">
      <div className="comment__header"></div>
      <div className="comment__text" ref={inputRef}>
        <p>{text}</p>
      </div>

      {hasOverflow && index === 1 && (
        <div
          onClick={handleClick}
          className="comment__see-more-toggle"
        >
          <p>Click here for the full review</p>
        </div>
      )}

      <div className="comment__divider" />
      <div className="comment__name">{name}</div>
      {title && (
        <div className="comment__title">{title}</div>
      )}
    </div>
  );
}

export default Comment;