import styled from "styled-components";
import { familyFont, familyFontDefault, firstColor, light, medium, regular, secondColor, semiBold, thirdColor } from "./styleSheet";

export const ContainerLogin = styled.div`
width: 100%;
height: 100%;
background-color: ${firstColor};
display: flex;
flex-direction: column;
align-items: center;
`
//-----------------------------------------------
export const ContainerTitulo = styled.div`
width: fit-content;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 40px;
`

export const LogoLogin = styled.img`
width: 160px;
height: 160px;
`

export const TituloLogin = styled.h2`
font-size: 48px;
font-family: ${familyFont}, ${familyFontDefault};
font-weight: ${semiBold};
color: ${thirdColor};
margin-top: 10px;
`
//-----------------------------------------------
export const FormLogin = styled.form`
width: fit-content;
height: fit-content;
margin-top: 20px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

export const InputLogin = styled.input`
width: 320px;
height: 40px;
background-color: ${secondColor};
border: 0;
margin: 10px 0; 
border-radius: 50px;
color: ${thirdColor};
font-size: 17px;
font-weight: ${light};
font-family: ${familyFont}, ${familyFontDefault};
padding-left: 32px;

&::placeholder{
color: ${thirdColor};
opacity: .5;
}
`

export const ButtonLogin = styled.button`
width: 320px;
height: 40px;
background-color: ${secondColor};
border: 0;
border-radius: 50px;
color: ${thirdColor};
font-size: 20px;
font-family: ${familyFont}, ${familyFontDefault};
font-weight: ${medium};
margin-top: 20px;
cursor: pointer;
`

export const MensajeErrorLogin = styled.div`
width: 85%;
text-align: left;
font-size: 16px;
font-family: ${familyFont}, ${familyFontDefault};
font-weight: ${regular};
color: ${thirdColor};
`
//----------------------------------------------------
export const ContainerOtrosInicios = styled.div`
width: fit-content;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
margin-top: 40px;
`

export const TituloOtrosInicios = styled.span`
font-size: 14px;
font-family: ${familyFont}, ${familyFontDefault};
font-weight: ${regular};
color: ${thirdColor};
`

export const OtrosInicios = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-around;
margin-top: 10px;
`

export const Inicios = styled.div`
width: fit-content;
height: fit-content;
cursor: pointer;
`
//----------------------------------------------------------------
export const ContainerIrRegister = styled.div`
width: fit-content;
height: fit-content;
margin-top: 50px;
`

export const TextoIrregister1 = styled.span`
font-size: 14px;
font-family: ${familyFont}, ${familyFontDefault};
font-weight: ${regular};
color: ${thirdColor};
`

export const TextoIrRegister2 = styled.span`
font-size: 14px;
font-family: ${familyFont}, ${familyFontDefault};
font-weight: ${semiBold};
color: ${secondColor};
cursor: pointer;
`