import styled from 'styled-components';
import { theme } from 'constants/theme';

export const Container = styled.nav`
  ul {
    display: flex;
    list-style: none;
    padding: 0;

    li {
      font-family: ${theme.fonts.heading}
      font-weight: 700;
      font-size: 1.2rem;

      & + li {
        margin-left: 2rem;
      }
      a{
        color:${theme.colors.Whites[100]};
        position: relative;
        z-index: 1;
        display: inline-flex;
        padding-left: 10px;
        padding-bottom: 5px;
        padding-right: 10px;
}
a:hover {
  color:${theme.colors.Whites[100]};
}
a::before{
	content: "";
	width: 0;
	height: 100%;
	background-image: linear-gradient(to top, ${
    theme.colors.Blues[100]
  } 15%, rgba(0, 0, 0, 0) 15%);
	position: absolute;
	left: 0;
	bottom: 2px;
	z-index: -1;	
	will-change: width;
	transform-origin: left bottom
}

a:hover::before{
	width: 100%;
}

a::before{
	transition: width .1s ease-out;
}

a:hover::before{
	transition-duration: .25s;
}
    }
  }
`;
