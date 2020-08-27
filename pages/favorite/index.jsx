import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import palletes from '../../theme';
import BaseContainer from '../../components/layout/BaseContainer';
import HorizontalCard from '../../components/cards/HorizontalCard';

const Wrapper = styled.div`
  width: 100%;
  padding: 0 16px;
`;

const Header = styled.div`
  position: -webkit-sticky;
  position: sticky;
  padding: 24px 16px 8px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
`;

const Wishlist = () => {
  return (
    <BaseContainer>
      <ThemeProvider theme={palletes}>
        <Wrapper>
          <Header>Favorit</Header>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <HorizontalCard key={item} />
          ))}
        </Wrapper>
      </ThemeProvider>
    </BaseContainer>
  );
};

export default Wishlist;
