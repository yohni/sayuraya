import React from 'react';
import Slider from 'react-slick';
import propTypes from 'prop-types';

const CardSlider = ({ children }) => {
  const responsive = [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ];
  return (
    <Slider
      arrows={false}
      className="w-100"
      dots={false}
      infinite={false}
      speed={500}
      slidesToShow="3"
      slidesToScroll="1"
      responsive={responsive}
    >
      {children}
    </Slider>
  );
};

CardSlider.propTypes = {
  children: propTypes.oneOfType([propTypes.arrayOf(propTypes.node), propTypes.node]).isRequired,
};

export default CardSlider;
