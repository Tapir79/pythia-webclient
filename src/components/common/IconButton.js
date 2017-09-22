import React from 'react';
import cx from 'classnames';
import './IconButton.css';

/**
 * An icon with a role of button
 * @param {object} props
 * @param {string} props.className
 * @param {function} props.onClick
 */
const IconButton = ({ className, onClick }) => (
  <i
    className={cx('IconButton fa', className)}
    role="button"
    tabIndex="0"
    onClick={onClick}
  />
);

export default IconButton;
