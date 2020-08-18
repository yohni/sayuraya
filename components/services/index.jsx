import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Link from 'next/link';
import propTypes from 'prop-types';
import palletes from '../../theme';
import ServiceIcon from '../icons/ServiceIcon';

const Wrapper = styled.div`
  padding: 16px 0;
  display: flex;
`;

const TextWrapper = styled.div`
  padding: 4px 0;
  margin-left: 12px;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.GreyText};
`;

const Title = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600 !important;
  font-size: 12px;
  line-height: 15px;
  color: #000;
`;

const ServiceLink = styled.span`
  color: ${({ theme }) => theme.GreenPrimary};
`;

const Services = ({ title, text }) => {
  return (
    <ThemeProvider theme={palletes}>
      <Wrapper>
        <ServiceIcon color={palletes.RedCalm} />
        <TextWrapper>
          <Title>{title}</Title>
          <span>{`${text}. `}</span>
          <Link href="yohni">
            <ServiceLink>Klik disini.</ServiceLink>
          </Link>
        </TextWrapper>
      </Wrapper>
    </ThemeProvider>
  );
};

Services.propTypes = {
  title: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
};

export default Services;
