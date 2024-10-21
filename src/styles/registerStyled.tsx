import styled from "styled-components";
import { familyFont, familyFontDefault, firstColor, light, medium, regular, secondColor, semiBold, thirdColor } from "./styleSheet";

export const ContainerRegister = styled.div`
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

export const LogoRegister = styled.img`
width: 160px;
height: 160px;
`

export const TituloRegister = styled.h2`
font-size: 48px;
font-family: ${familyFont}, ${familyFontDefault};
font-weight: ${semiBold};
color: ${thirdColor};
margin-top: 10px;
`
//-----------------------------------------------
export const FormRegister = styled.form`
width: fit-content;
height: fit-content;
margin-top: 20px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

export const InputRegister = styled.input`
width: 320px;
height: 40px;
background-color: ${secondColor};
border: 0;
margin: 5px 0; 
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

export const SelectRegister = styled.select`
width: 220px;
height: 40px;
border: 0;
border-radius: 15px;
color: ${thirdColor};
background-color: ${secondColor};
font-family: ${familyFont}, ${familyFontDefault};
font-size: 15px;
font-weight: ${light};
padding-left: 10px;
margin: 5px 0;
outline: none;
`

export const OptionSelectRegister = styled.option`
font-size: 12px;
`

export const ButtonRegister = styled.button`
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

export const MensajeErrorRegister = styled.div`
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
export const ContainerIrLogin = styled.div`
width: fit-content;
height: fit-content;
margin: 50px 0;
`

export const TextoIrLogin1 = styled.span`
font-size: 14px;
font-family: ${familyFont}, ${familyFontDefault};
font-weight: ${regular};
color: ${thirdColor};
`

export const TextoIrLogin2 = styled.span`
font-size: 14px;
font-family: ${familyFont}, ${familyFontDefault};
font-weight: ${semiBold};
color: ${secondColor};
cursor: pointer;
`