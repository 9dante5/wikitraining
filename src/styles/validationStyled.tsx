import styled from "styled-components";
import { familyFont, familyFontDefault, firstColor, light, medium, secondColor, semiBold, thirdColor } from "./styleSheet";

export const ContainerValidation = styled.div`
width: 100%;
height: 100%;
background-color: ${firstColor};
display: flex;
flex-direction: column;
align-items: center;
`
//----------------------------------------------------------------
export const ContainerTitulo = styled.div`
width: fit-content;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 40px;
`

export const LogoValidation = styled.img`
width: 160px;
height: 160px;
`

export const TituloValidation = styled.h2`
font-size: 35px;
font-family: ${familyFont}, ${familyFontDefault};
font-weight: ${semiBold};
color: ${thirdColor};
margin-top: 10px;
`
//----------------------------------------------------------------
export const ContainerTextoInfo = styled.div`
width: fit-content;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 20px;
`

export const TextInfo = styled.span`
font-size: 14px;
font-family: ${familyFont}, ${familyFontDefault};
font-weight: ${light};
color: ${thirdColor};
`
//----------------------------------------------------------------

export const ContainerFormValidation = styled.form`
width: fit-content;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 20px;
`

export const ContainerInput = styled.div`
width: 250px;
height: 55px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`

export const InputValidation = styled.input`
width: 20%;
height: inherit;
border: 1px solid ${secondColor};
border-radius: 13px;
font-size: 36px;
text-align: center;
font-weight: ${medium};
font-family: ${familyFont}, ${familyFontDefault};
`
export const BotonValidation = styled.button`
width: 250px;
height: 40px;
background-color: ${secondColor};
border: 0;
border-radius: 50px;
color: ${thirdColor};
font-size: 20px;
font-family: ${familyFont}, ${familyFontDefault};
font-weight: ${medium};
margin-top: 60px;
cursor: pointer;
`
//----------------------------------------------------------------

export const ContainerReenviarCodigo = styled.div`
width: fit-content;
height: fit-content;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
margin-top: 20px;
`

export const TextoReenviarCodigo = styled.span`
font-size: 14px;
font-family: ${familyFont}, ${familyFontDefault};
font-weight: ${light};
color: ${secondColor};
cursor: pointer;
`