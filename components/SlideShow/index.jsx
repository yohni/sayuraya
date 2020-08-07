import React, { useState } from 'react';
import styled from 'styled-components';
import { Carousel, CarouselItem, CarouselControl } from 'reactstrap';
import PropTypes from 'prop-types';

const SlideShow = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { items } = props;

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const SlideImage = styled.img`
    height: 160px;
    width: 100%;
    object-fit: cover;

    @media (min-width: 480px) {
      height: 240px;
    }
  `;

  const SlideControl = styled(CarouselControl)`
    opacity: 0;
  `;

  const slides = items.map((item) => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={item.src}
    >
      <SlideImage src={item.src} alt={item.altText} />
    </CarouselItem>
  ));

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      {slides}
      <SlideControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <SlideControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
};

SlideShow.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SlideShow;
