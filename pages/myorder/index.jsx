import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import palletes from '../../theme';
import BaseContainer from '../../components/layout/BaseContainer';
import TabHeader from '../../components/tabHeader';
import HistoryCard from '../../components/cards/HistoryCard';

const Wrapper = styled.div`
  background: #ffffff;
  width: 100%;
`;

const Header = styled.div`
  position: sticky;
  padding: 24px 16px 8px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
`;
const CardListWrapper = styled.div`
  background: #fff;
  padding: 16px;
`;

const MyOrder = () => {
  // const [openSearch, setOpenSearch] = useState(false);
  return (
    <>
      <ThemeProvider theme={palletes}>
        <Wrapper>
          <BaseContainer>
            <Header>Pesanan Saya</Header>
            <TabHeader />
            <CardListWrapper>
              {[1, 2, 3, 4].map((item) => (
                <HistoryCard key={item} />
              ))}
            </CardListWrapper>
          </BaseContainer>
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default MyOrder;
