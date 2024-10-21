import styled from "styled-components";
import { bold, familyFont, familyFontDefault, firstColor, thirdColor } from "./styleSheet";

export const ContainerInicio = styled.div`
width: 100vw;
height: 100vh;
background-color: ${firstColor};
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

export const ImgLogoInicio = styled.img`
width: 270px;
height: 270px;
`

export const TituloInicio = styled.h1`
font-family: ${familyFont}, ${familyFontDefault};
font-weight: ${bold};
font-size: 30px;
margin-top: 20px;
color: ${thirdColor}

`