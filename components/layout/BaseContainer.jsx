import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import palletes from '../../theme';

import BottomNavigation from '../BottomNavigation';

const Wrapper = styled.div`
  width: 100%;
  background: ${(props) => props.theme.GreyBasic};
`;

const Container = styled.div`
  max-width: 480px;
  background: #fff;
  margin: 0 auto 60px;
`;

const BaseContainer = ({ children }) => {
  return (
    <ThemeProvider theme={palletes}>
      <Wrapper>
        <Container>
          {children}
          <BottomNavigation />
        </Container>
      </Wrapper>
    </ThemeProvider>
  );
};

BaseContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseContainer;
