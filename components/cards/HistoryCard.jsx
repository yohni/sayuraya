import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import palletes from '../../theme';

const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 8px 16px rgba(65, 65, 65, 0.25);
  border-radius: 3px;
  margin-bottom: 12px;
  padding: 16px;
  color: ${({ theme }) => theme.GreyDark};
  font-size: 10px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`;

const HistoryVal = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.GreyText};
`;

const OrderCode = styled(HistoryVal)`
  color: ${({ theme }) => theme.GreenPrimary};
`;

const OrderStatus = styled(HistoryVal)`
  background: ${(props) => (props.isDone ? props.theme.GreenPrimary : props.theme.GreyDark)};
  color: ${(props) => (props.isDone ? '#ffffff' : props.theme.GreyText)};
  border-radius: 5px;
  text-align: center;
  display: inline;
  padding: 0 8px;
`;

const HistoryCard = () => {
  return (
    <ThemeProvider theme={palletes}>
      <Wrapper>
        <div>
          <div className="mb-2">
            <div>Kode order</div>
            <OrderCode>KD-19-kdjash-dsakh12</OrderCode>
          </div>
          <div>
            <div>Tanggal Pengiriman</div>
            <HistoryVal>Selasa, 12 Desember 2020</HistoryVal>
          </div>
        </div>
        <div>
          <div className="mb-2">
            <div>Total</div>
            <HistoryVal>Rp 109.000</HistoryVal>
          </div>
          <div>
            <div>Status</div>
            <OrderStatus isDone>Selesai</OrderStatus>
          </div>
        </div>
      </Wrapper>
    </ThemeProvider>
  );
};

export default HistoryCard;
