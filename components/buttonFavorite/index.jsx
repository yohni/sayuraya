import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import palletes from '../../theme';
import HeartIcon from '../icons/HeartIcon';

const ButtonFav = () => {
  const [liked, setLikes] = useState(false);

  const Wrapper = styled.button`
    outline: none;
    border: none;
    padding: 4px;
    background: ${({ theme }) => theme.GreyCalm};
    border-radius: 100%;
  `;

  return (
    <ThemeProvider theme={palletes}>
      <Wrapper onClick={() => setLikes(!liked)}>
        <HeartIcon color={liked ? palletes.RedRadical : palletes.GreyDark} />
      </Wrapper>
    </ThemeProvider>
  );
};

export default ButtonFav;
