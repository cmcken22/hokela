import React, { useState, useRef, useEffect } from 'react';
import cx from 'classnames';

const Comment = ({ text, name, title, index, onClick, large }) => {
  const [hasOverflow, setOverflow] = useState(false)
  const inputRef = useRef(null);
  let timer = null;

  const detectOverflow = () => {
    if (inputRef && inputRef.current && index === 1 && !large) {
      if (!!timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(() => {
        const { current: element } = inputRef;
        const overflow = element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
        if (!hasOverflow && overflow) setOverflow(true);
        else setOverflow(false);
      }, 200);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', detectOverflow);
    return () => window.addEventListener('resize', detectOverflow);
  }, [text]);

  useEffect(() => {
    detectOverflow();
  }, [text]);

  const openLink = (link) => {
    if (link) window.open(link, '_blank');
  }

  const renderUserInfo = () => {
    return (
      <>
        <div className="comment__name">{name}</div>
        {title && (
          <div className="comment__title">{title}</div>
        )}
      </>
    );
  }

  const renderHeader = () => {
    if (large) {
      return (
        <div className="comment__header">
          {renderUserInfo()}
          <div className="comment__close-btn" onClick={onClick} />
        </div>
      );
    }
    return (
      <div className="comment__header" />
    );
  }

  const renderFooter = () => {
    if (!large) return null;

    return (
      <div className="comment__footer">
        <div className="comment__icon comment__icon--website" onClick={openLink("")} />
        <div className="comment__icon comment__icon--facebook" onClick={openLink("")} />
        <div className="comment__icon comment__icon--instagram" onClick={openLink("")} />
        <div className="comment__icon comment__icon--linkedIn" onClick={openLink("")} />
      </div>
    );
  }

  const handleClick = () => {
    if (onClick) onClick();
  }

  return (
    <div className={cx("comment", {
      "comment--large": large
    })}>
      {renderHeader()}
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

      {!large && (
        <>
          <div className="comment__divider" />
          {renderUserInfo()}
        </>
      )}
      {renderFooter()}
    </div>
  );
}

export default Comment;