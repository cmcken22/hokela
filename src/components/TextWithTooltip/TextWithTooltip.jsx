import React, { useState } from 'react';
import { Tooltip } from 'antd';

const TextWithTooltip = ({ text, onClick }) => {
  const [hasOverflow, setHasOverflow] = useState(false);

  const isOverflown = (element) => {
    return element.scrollWidth > element.clientWidth;
  }

  const handleCreateRef = (ref) => {
    if (!ref) return;
    const nextHasOverflow = isOverflown(ref);
    if (nextHasOverflow !== hasOverflow) setHasOverflow(nextHasOverflow);
  }

  return (
    <div className="text-tp" onClick={onClick}>
      {hasOverflow ? (
        <Tooltip
          overlayClassName="text-tp__tooltip"
          title={text}
        >
          <p ref={handleCreateRef}>{text}</p>
        </Tooltip>
      ) : (
        <p ref={handleCreateRef}>{text}</p>
      )}
    </div>
  )
}

export default TextWithTooltip;