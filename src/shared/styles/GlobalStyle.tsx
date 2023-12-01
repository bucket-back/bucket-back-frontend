import { Global, css } from '@emotion/react';
import { COMMON } from './Common';

const style = css`
  body {
    font-family: 'Cafe24Regular';
    color: ${COMMON.COLORS.FONT_COLOR};
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Cafe24Bold';
    color: ${COMMON.COLORS.FONT_COLOR};
  }
`;

const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;
