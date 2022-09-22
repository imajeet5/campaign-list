import { FaSpinner } from 'react-icons/fa';

import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

const spin = keyframes`
0% {transform: rotate(0deg)}
100% {transform: rotate(360deg)}
`;

export const Spinner = styled(FaSpinner)`
  animation: ${spin} 1s linear infinite;
`;

export const StyleFullContainer = styled.div`
  font-size: 4em;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FullPageSpinner = () => {
  return (
    <StyleFullContainer>
      <Spinner />
    </StyleFullContainer>
  );
};
