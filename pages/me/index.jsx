import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Link from 'next/link';
import palletes from '../../theme';
import BaseContainer from '../../components/layout/BaseContainer';
import Services from '../../components/services';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.GreenPrimary};

  position: relative;
`;

const Greeting = styled.h3`
  padding: 27px 16px 0;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
`;

const Thanks = styled.div`
  padding: 0 16px;
  color: #ffffff;
  font-size: 12px;
`;

const MyImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  object-fit: cover;
  margin: 24px 0 8px;
`;

const MyName = styled.div`
  font-size: 13px;
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 48px;
`;

const StaticSheet = styled.div`
  background: #ffffff;
  border-radius: 35px 35px 0px 0px;
  padding: 48px 16px 16px;
`;

const SheetHeading = styled.h5`
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const SheetContex = styled.div`
  font-size: 12px;
  margin-bottom: 18px;
  color: ${({ theme }) => theme.GreyText};
`;

const SheetLink = styled.a`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.GreenPrimary};

  &:visited {
    color: ${({ theme }) => theme.GreenSecondary} !important;
  }

  &:active {
    color: ${({ theme }) => theme.GreenSecondary} !important;
  }

  &:hover {
    color: ${({ theme }) => theme.GreenSecondary} !important;
  }
`;

const ProfilePage = () => {
  return (
    <ThemeProvider theme={palletes}>
      <BaseContainer>
        <Wrapper>
          <Greeting>
            Hey, Achmad
            <span role="img" aria-label="wave">
              👋
            </span>
          </Greeting>
          <Thanks>Terimakasih telah berlangganan Sayuraya</Thanks>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <MyImg
              src="data:image/jpeg;base64,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"
              alt="Foto"
            />
            <MyName>Achmad Yohni</MyName>
          </div>
          <StaticSheet>
            <SheetHeading>Alamat Saya</SheetHeading>
            <SheetContex>Jl. Ledjend Suprapto 24 Kediri</SheetContex>

            <SheetHeading>No. Whatsapp</SheetHeading>
            <SheetContex>+62867 8768 6576</SheetContex>

            <SheetHeading>Email</SheetHeading>
            <SheetContex>achmadyohni11@gmail.com</SheetContex>

            <Services
              title="Punya usaha makanan?"
              text="Pastikan kualitas makananmu dengan berlangganan Sayuraya dan daparkan diskon sebesar - besarnya"
            />

            <div>
              <Link href="/me">
                <SheetLink>Tentang Hari</SheetLink>
              </Link>
            </div>
            <div>
              <Link href="/me">
                <SheetLink>Syarat dan Ketentuan</SheetLink>
              </Link>
            </div>
          </StaticSheet>
        </Wrapper>
      </BaseContainer>
    </ThemeProvider>
  );
};

export default ProfilePage;
