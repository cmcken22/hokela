import React from 'react';

const Comment = ({ text, name }) => {
  return (
    <div className="comment">
      <div className="comment__header"></div>
      <div className="comment__text">{text}</div>
      <div className="comment__divider" />
      <div className="comment__name">{name}</div>
    </div>
  );
}

export default Comment;