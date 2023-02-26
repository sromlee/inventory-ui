import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  h1 {
    font-size: 24px;
  }

  p {
    font-size: 18px;
  }

  @media (max-width: 576px) {
    h1 {
      font-size: 20px;
    }

    p {
      font-size: 16px;
    }
  }
`