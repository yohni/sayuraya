import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import palletes from '../../theme';

import CounterButton from '../buttons/CounterButton';
import ButtonFav from '../buttonFavorite';

const Wrapper = styled.div`
  width: 100%;
  border-radius: 8px;
  background: #ffffff;
  padding: 8px;
  margin-bottom: 16px;
`;

const CardHeader = styled.div`
  display: flex;
`;

const CardImage = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 5px;
  object-fit: cover;
  margin-right: 8px;
`;

const CardTitle = styled.h4`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre-wrap;
  line-height: 1.29;
  margin-bottom: 0;
`;

const CardSub = styled.small`
  font-size: 12px;
  color: ${({ theme }) => theme.GreyText};
`;

const CardFooter = styled.div`
  padding: 8px 0;
  display: flex;
  width: 100%;
  align-items: center;
`;

const PCbasePrice = styled.div`
  text-decoration: line-through;
  color: red;
  font-size: 10px;
  margin-top: 5px;
`;

const CutPrice = styled.h3`
  color: ${(props) => props.theme.GreenPrimary};
  font-size: 14px;
  font-weight: 600;
`;

const FavWrapper = styled.div`
  padding: 0 8px;
`;

const HorizontalCard = () => {
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
    <ThemeProvider theme={palletes}>
      <Wrapper className="shadow-sm">
        <CardHeader>
          <CardImage src="/banner.png" alt="Gambar" />
          <div>
            <CardTitle>Jamur Kacang Merah</CardTitle>
            <CardSub>1-2 kg/piece</CardSub>
            <div>
              <PCbasePrice>Rp 10.000</PCbasePrice>
              <CutPrice>Rp 8.000</CutPrice>
            </div>
          </div>
        </CardHeader>
        <CardFooter>
          <CounterButton
            style={{ marginRight: '12px' }}
            sumProduct={sumProduct}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            onClick={handleIncrease}
          />
          <FavWrapper>
            <ButtonFav />
          </FavWrapper>
        </CardFooter>
      </Wrapper>
    </ThemeProvider>
  );
};

export default HorizontalCard;
