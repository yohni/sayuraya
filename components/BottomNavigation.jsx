import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

import palletes from '../theme';
import HomeIcon from './icons/HomeIcon';
import ListIcon from './icons/ListIcon';
import LoveIcon from './icons/LoveIcon';
import PersonIcon from './icons/PersonIcon';

const BottomNavigation = () => {
  const [activedLink, setActivedLink] = useState(0);
  const router = useRouter();

  const Wrapper = styled.div`
    position: fixed;
    bottom: 0;
    max-width: 480px;
    width: 100%;
    padding: 8px 8px 2px;
    display: flex;
  `;

  const Item = styled.div`
    width: 25%;
    padding: 8px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: ${(props) => props.theme.GreyDark};
  `;

  const ItemText = styled.div`
    padding-top: 2px;
    font-size: 12px;
    color: ${({ color }) => color};
  `;

  const ActiveLink = () => {
    switch (router.pathname) {
      case '/wishlist':
        setActivedLink(1);
        break;
      case '/myorder':
        setActivedLink(2);
        break;
      case '/me':
        setActivedLink(3);
        break;
      default:
        setActivedLink(0);
        break;
    }
  };

  useEffect(() => {
    ActiveLink();
  }, []);

  return (
    <ThemeProvider theme={palletes}>
      <Wrapper>
        <Link href="/">
          <Item>
            <HomeIcon color={activedLink === 0 ? palletes.GreenPrimary : palletes.GreyDark} />
            <ItemText color={activedLink === 0 ? palletes.GreenPrimary : palletes.GreyDark}>
              Belanja
            </ItemText>
          </Item>
        </Link>
        <Link href="/wishlist">
          <Item>
            <LoveIcon color={activedLink === 1 ? palletes.GreenPrimary : palletes.GreyDark} />
            <ItemText color={activedLink === 1 ? palletes.GreenPrimary : palletes.GreyDark}>
              Wishlist
            </ItemText>
          </Item>
        </Link>
        <Link href="/myorder">
          <Item>
            <ListIcon color={activedLink === 2 ? palletes.GreenPrimary : palletes.GreyDark} />
            <ItemText color={activedLink === 2 ? palletes.GreenPrimary : palletes.GreyDark}>
              Pesanan
            </ItemText>
          </Item>
        </Link>
        <Link href="/me">
          <Item>
            <PersonIcon color={activedLink === 3 ? palletes.GreenPrimary : palletes.GreyDark} />
            <ItemText color={activedLink === 3 ? palletes.GreenPrimary : palletes.GreyDark}>
              Profil
            </ItemText>
          </Item>
        </Link>
      </Wrapper>
    </ThemeProvider>
  );
};

BottomNavigation.propTypes = {
  theme: PropTypes.string,
};

BottomNavigation.defaultProps = {
  theme: '#fffff',
};

export default BottomNavigation;
