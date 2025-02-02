import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Link from 'next/link';
import propTypes from 'prop-types';
import pallete from '../../theme';

import CounterButton from '../buttons/CounterButton';
import ButtonFav from '../buttonFavorite';

const PCWrapper = styled.div`
  overflow: hidden;
  max-width: calc(100% - 8px);
  margin: 0 4px 4px;
  width: 100%;
  height: 316px;
  background: #ffffff;
  border-radius: 5px;
  cursor: pointer;
`;

const PCImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  overflow: hidden;
`;

const PCLink = React.forwardRef(({ href, children }, ref) => {
  return (
    <a href={href} ref={ref}>
      {children}
    </a>
  );
});

PCLink.propTypes = {
  href: propTypes.string.isRequired,
  children: propTypes.node.isRequired,
};

const DiscBadge = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 4px 12px;
  background: ${(props) => props.theme.GreenPrimary};
  color: #ffffff;
  font-weight: 600;
  font-size: 12px;
  border-radius: 0 5px 5px 0;
`;

const FavWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const CardBody = styled.div`
  padding: 12px;
  position: relative;
  height: 92px;
`;

const CardTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  width: 132px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
`;

const PCpeace = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  color: ${(props) => props.theme.GreyText};
`;

const PCbasePrice = styled(PCpeace)`
  text-decoration: line-through;
  color: red;
  font-size: 10px;
`;

const PriceWrapper = styled.div`
  position: absolute;
  bottom: 0;
`;

const CutPrice = styled.h3`
  color: ${(props) => props.theme.GreenPrimary};
  font-size: 14px;
  font-weight: 600;
`;

const CardContainer = styled.div`
  padding: 0 8px;
`;

const ProductCard = (props) => {
  const { src, discount, name, price, pcs, href } = props;

  const [sumProduct, setSumProduct] = useState(0);

  const handleDecrease = () => {
    if (sumProduct > 0) {
      setSumProduct(sumProduct - 1);
    }
  };

  const handleIncrease = () => {
    setSumProduct(sumProduct + 1);
  };

  return (
    <ThemeProvider theme={pallete}>
      <PCWrapper className="shadow-sm">
        <Link href={href}>
          <div>
            <div className="position-relative">
              <PCImage src={src} alt="Image" />
              <FavWrapper onClick={(e) => e.stopPropagation()}>
                <ButtonFav />
              </FavWrapper>
              {discount > 0 && <DiscBadge>{`Hemat ${discount}%`}</DiscBadge>}
            </div>
            <CardBody>
              <CardTitle>{name}</CardTitle>
              <PCpeace>{pcs}</PCpeace>
              <PriceWrapper>
                {discount > 0 && <PCbasePrice>{price}</PCbasePrice>}
                <CutPrice>{discount > 0 ? price - (discount / 100) * price : price}</CutPrice>
              </PriceWrapper>
            </CardBody>
          </div>
        </Link>
        <CardContainer>
          <CounterButton
            sumProduct={sumProduct}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            onClick={handleIncrease}
          />
        </CardContainer>
      </PCWrapper>
    </ThemeProvider>
  );
};

ProductCard.propTypes = {
  src: propTypes.string.isRequired,

  discount: propTypes.string,
  name: propTypes.string.isRequired,
  price: propTypes.string.isRequired,
  pcs: propTypes.string.isRequired,
  href: propTypes.string.isRequired,
};

ProductCard.defaultProps = {
  discount: '0',
};

export default ProductCard;
