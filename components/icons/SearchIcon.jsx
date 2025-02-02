import React from 'react';
import PropTypes from 'prop-types';

const SearchIcon = ({ color, width, height }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M10.5691 0C4.74145 0 0 4.74145 0 10.5691C0 16.3971 4.74145 21.1382 10.5691 21.1382C16.3971 21.1382 21.1382 16.3971 21.1382 10.5691C21.1382 4.74145 16.3971 0 10.5691 0ZM10.5691 19.187C5.81723 19.187 1.95122 15.321 1.95122 10.5691C1.95122 5.81728 5.81723 1.95122 10.5691 1.95122C15.321 1.95122 19.187 5.81723 19.187 10.5691C19.187 15.321 15.321 19.187 10.5691 19.187Z"
        fill={color}
      />
      <path
        d="M23.7142 22.3346L18.1207 16.7411C17.7395 16.36 17.1223 16.36 16.7411 16.7411C16.36 17.1219 16.36 17.7398 16.7411 18.1207L22.3346 23.7142C22.5252 23.9047 22.7747 24 23.0244 24C23.2738 24 23.5236 23.9047 23.7142 23.7142C24.0953 23.3333 24.0953 22.7154 23.7142 22.3346Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

SearchIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

SearchIcon.defaultProps = {
  color: '#AFAFAF',
  width: '24',
  height: '24',
};

export default SearchIcon;
