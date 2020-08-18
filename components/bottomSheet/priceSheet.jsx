import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import propTypes from 'prop-types';
import palletes from '../../theme';

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  border-top: ${({ theme }) => theme.GreyDark} solid 0.7px;
  background: #fff;
  max-width: 480px;
  width: 100%;
  padding: 8px 16px;
  display: flex;
  z-index: 200;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  outline: none;
  border: none;
  color: #ffffff;
  background: ${({ theme }) => theme.GreenPrimary};
  border-radius: 5px;
  padding: 8px 32px;
  font-weight: bold;
`;

const PriceSheet = ({ children }) => {
  return (
    <ThemeProvider theme={palletes}>
      <Wrapper>
        <div>{children}</div>
        <Button>Beli</Button>
      </Wrapper>
    </ThemeProvider>
  );
};

PriceSheet.propTypes = {
  children: propTypes.node.isRequired,
};

export default PriceSheet;
