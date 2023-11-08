import { Global, css } from '@emotion/react';

const style = css`
  body {
    font-family: 'Cafe24Regular';
  }
`;

const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;
