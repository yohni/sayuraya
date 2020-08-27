import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import propTypes from 'prop-types';
import palletes from '../../theme';

const WrapperButton = styled.div`
  background: ${(props) => props.theme.GreenPrimary};
  color: #ffffff;
  border-radius: 5px;
  padding: 8px 0;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  width: inherit;
`;

const WrapperCounter = styled.div`
  border: ${(props) => props.theme.GreenPrimary} solid 1px;
  border-radius: 5px;
  font-weight: 600;
  color: #000000;
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  font-size: 14px;
  width: inherit;
`;

const CounterButton = (props) => {
  const { onClick, handleDecrease, handleIncrease, sumProduct } = props;
  return (
    <ThemeProvider theme={palletes}>
      {sumProduct <= 0 ? (
        <WrapperButton onClick={onClick}>Beli</WrapperButton>
      ) : (
        <WrapperCounter>
          <div
            className="w-100 text-center"
            role="button"
            onClick={handleDecrease}
            onKeyup={handleDecrease}
            tabIndex="0"
          >
            -
          </div>
          <div>{sumProduct}</div>
          <div
            className="w-100 text-center"
            role="button"
            onClick={handleIncrease}
            onKeyup={handleIncrease}
            tabIndex="0"
          >
            +
          </div>
        </WrapperCounter>
      )}
    </ThemeProvider>
  );
};

CounterButton.propTypes = {
  onClick: propTypes.func.isRequired,
  handleDecrease: propTypes.func.isRequired,
  handleIncrease: propTypes.func.isRequired,
  sumProduct: propTypes.number.isRequired,
};

export default CounterButton;
