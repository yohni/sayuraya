import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import palletes from '../../theme';

const Wrapper = styled.div`
  background: #ffffff;
  position: --webkit-sticky;
  position: sticky;
  top: 0;
  display: flex;
  width: 100%;
`;

const TabItem = styled.button`
  width: 100%;
  outline: none;
  background: none;
  font-weight: bold;
  border: none;
  padding: 12px;
  color: ${(props) => (props.isActive ? props.theme.GreenPrimary : props.theme.GreyDark)};
`;

const TabCtx = styled.span`
  position: relative;
  padding-bottom: 12px;
  font-size: 14px;
`;

const TabHr = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${({ isActive }) => (isActive ? '24px' : '0')};
  height: 3px;
  border-radius: 5px;
  background: ${({ theme }) => theme.GreenPrimary};
  transition: all 0.5s;
`;

const TabHeader = () => {
  return (
    <ThemeProvider theme={palletes}>
      <Wrapper>
        <TabItem isActive>
          <TabCtx>
            Dalam Proses
            <TabHr isActive />
          </TabCtx>
        </TabItem>
        <TabItem>
          <TabCtx>
            Selesai
            <TabHr />
          </TabCtx>
        </TabItem>
      </Wrapper>
    </ThemeProvider>
  );
};

export default TabHeader;
