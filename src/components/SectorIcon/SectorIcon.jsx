import React from 'react';
import cx from 'classnames';

const formatType = (type) => {
  if (!type) return null;
  return type.replace(/ /g, '').replace(/&/g, '').replace(/-/g, '');
}

const Outlined = ({ type, size }) => {
  return (
    <SectorIcon
      type={type}
      outlined
      size={size - 20} // minus 20 for padding
    />
  );
}

const SectorIcon = ({ type, size, outlined }) => {
  const formattedType = formatType(type);
  return (
    <div
      className={cx("sector-icon", {
        [`sector-icon--outlined`]: !!outlined,
      })}
      >
      <div 
        className={cx("sector-icon__inner", {
          [`sector-icon__inner--${formattedType}`]: !!formattedType
        })}
        style={{
          height: `${size}px`,
          width: `${size}px`,
        }}
      />
    </div>
  );
}

SectorIcon.Outlined = Outlined;

SectorIcon.defaultProps = {
  size: 55
}

SectorIcon.Outlined.defaultProps = {
  ...SectorIcon.defaultProps
};


export default SectorIcon;