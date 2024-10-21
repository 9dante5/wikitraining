import styled from "styled-components";
import { familyFont, familyFontDefault, medium, secondColor } from "./styleSheet";

export const ContainerDrawer = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
flex-wrap: wrap;
gap: 35px;
`

export const CardOpcionsDrawer = styled.div`
width: 120px;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
border: 2px solid ${secondColor};
border-radius: 20px;
padding: 10px 0;
cursor: pointer;
`

export const TituloCardOpcionsDrawer = styled.h3`
font-family: ${familyFont}, ${familyFontDefault};
font-weight: ${medium};
font-size: 15px;
text-align: center;
margin-top: 10px;
`
//----------------------------------------------------------------

export const ContainerDashboardUser = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
flex-wrap: wrap;
gap: 10px;
margin: 30px 0 100px;
`