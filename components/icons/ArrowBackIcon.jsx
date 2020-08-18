import React from 'react';
import propTypes from 'prop-types';

const ArrowBackIcon = ({ color }) => {
  return (
    <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.85663 5.83333L5.96996 7.94667L4.79163 9.125L0.666626 5L4.79163 0.875L5.96996 2.05333L3.85663 4.16667H9.83329C11.6014 4.16667 13.2971 4.86905 14.5473 6.11929C15.7976 7.36953 16.5 9.06522 16.5 10.8333C16.5 12.6014 15.7976 14.2971 14.5473 15.5474C13.2971 16.7976 11.6014 17.5 9.83329 17.5H2.33329V15.8333H9.83329C11.1594 15.8333 12.4311 15.3066 13.3688 14.3689C14.3065 13.4312 14.8333 12.1594 14.8333 10.8333C14.8333 9.50725 14.3065 8.23548 13.3688 7.2978C12.4311 6.36012 11.1594 5.83333 9.83329 5.83333H3.85663Z"
        fill={color}
      />
    </svg>
  );
};

ArrowBackIcon.propTypes = {
  color: propTypes.string,
};

ArrowBackIcon.defaultProps = {
  color: 'white',
};

export default ArrowBackIcon;
