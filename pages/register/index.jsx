import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Form, Button } from 'reactstrap';
import Link from 'next/link';
import palletes from '../../theme';
import BaseContainer from '../../components/layout/BaseContainer';

const Wrapper = styled.div`
  padding: 22px;
`;

const Logo = styled.img`
  height: 32px;
`;

const ContentWrapper = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`;

const Heading = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 24px;
  margin-top: 64px;
  margin-bottom: 5px;
`;

const SubHeading = styled.h5`
  font-size: 12px;
  margin-bottom: 24px;
`;

const SryInput = styled.input`
  border: 1px solid ${({ theme }) => theme.GreenPrimary};
  border-radius: 100px;
  width: 100%;
  padding: 12px 18px;
  margin-bottom: 12px;
  font-size: 12px;

  &:hover,
  :active,
  :focus {
    outline: none;
  }
`;

const SryLabel = styled.label`
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
`;

const PrimaryButton = styled(Button)`
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  font-size: 16px;
  padding: 10px 24px;
  background: ${({ theme }) => theme.GreenPrimary};
  transition: all 0.2s;
  position: absolute;
  bottom: 22px;
  right: 22px;
  border-radius: 100px;
  border: none;

  &:hover,
  :active,
  :focus {
    background: ${({ theme }) => theme.GreenSecondary};
    transform: translateY(-1px);
  }
`;

const Register = () => {
  return (
    <ThemeProvider theme={palletes}>
      <BaseContainer show={false}>
        <Wrapper>
          <Link href="/">
            <Logo src="/logo.png" alt="Sayuraya" />
          </Link>
          <ContentWrapper>
            <Heading>Daftar</Heading>
            <SubHeading>Bergabung dan nikmati segala fasilitas Sayuraya</SubHeading>
            <Form>
              <>
                <SryLabel>Nama</SryLabel>
                <SryInput type="text" placeholder="eg. Fulan Ferdi" />
              </>
              <>
                <SryLabel>Email</SryLabel>
                <SryInput type="email" placeholder="eg. fulan@mail.com" />
              </>
              <>
                <SryLabel>No.Whatsapp</SryLabel>
                <SryInput type="number" placeholder="eg. 08555555555" />
              </>
              <>
                <SryLabel>Password</SryLabel>
                <SryInput type="password" placeholder="Masukkan password" />
              </>
              <>
                <SryLabel>Ketik Ulang Password</SryLabel>
                <SryInput type="password" placeholder="Masukkan ulang password" />
              </>
              <PrimaryButton type="submit">Daftar</PrimaryButton>
            </Form>
          </ContentWrapper>
        </Wrapper>
      </BaseContainer>
    </ThemeProvider>
  );
};

export default Register;
