import styled from "styled-components";
import { familyFont, familyFontDefault, firstColor, light, medium, regular, secondColor, semiBold, thirdColor } from "./styleSheet";

export const ContainerLandingPage = styled.div`
width: 100%;
height: 100%;
background-color: ${firstColor};
display: flex;
flex-direction: column;
align-items: center;
justify-content: start;
`

// ----------------------------------------------------------------
export const NavBarLadingPage = styled.div`
width: 100%;
height: 65px;
position: fixed;
top: 0;
left: 0;
background-color: ${secondColor};
display: flex;
align-items: center;
justify-content: space-between;
z-index: 1000;
border-bottom: 1px solid;
`

export const TituloNavBar = styled.h3`
font-family: ${familyFont}, ${familyFontDefault};
font-size: 20px;
font-weight: medium;
margin-left: 20px;
cursor: pointer;
color: ${firstColor};
`

export const ContainerMenu = styled.div`
width: fit-content;
height: 48px;
margin-right: 20px;
`

export const BotonDashboard = styled.button`
width: 100px;
height: inherit;
background-color: transparent;
decoration: none;
color: ${firstColor};
border: 2px solid ${firstColor};
border-radius: 20px;
font-family: ${familyFont}, ${familyFontDefault};
font-size: 14px;
font-weight: ${medium};
cursor: pointer;
`
// --------------------------------------------------------------------
export const ContainerFraseDia = styled.div`
width: 98%;
height: fit-content;
margin-top: 65px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

export const FraseDia = styled.span`
color: ${thirdColor};
font-size: 21px;
font-weight: ${regular};
font-family: ${familyFont}, ${familyFontDefault};
text-align: center;
padding: 0 50px;
margin-bottom: 15px;
`

export const ImgPoster = styled.img`
width: 100%;
`

export const AutorFraseDia = styled.span`
color: ${thirdColor};
font-size: 21px;
font-family: ${familyFont}, ${familyFontDefault};
font-weight: ${light};
font-style: italic;
`
// ---------------------------------------------------------------------
export const ContainerSobreNosotros = styled.div`
width: 100%;
height: fit-content;
margin-top: 100px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: ${secondColor};
padding: 20px 0;
`

export const TituloSobreNosotros = styled.h2`
color: ${thirdColor};
text-align: center;
font-size: 35px;
font-weight: ${semiBold};
font-family: ${familyFont};
margin-bottom: 10px;
`

export const TextoSobreNosotros = styled.p`
width: 95%;
color: ${thirdColor};
text-align: justify;
margin: 10px 0;
font-size: 20px;
font-weight: ${light};
font-family: ${familyFont}, ${familyFontDefault};
line-height: 1.3;
`
// ---------------------------------------------------------------------
export const ContainerMusculos = styled.div`
width: 98%;
height: fit-content;
margin-top: 100px;
display:flex;
flex-wrap: wrap;
gap: 13px;
align-items: center;
justify-content: center;
`

export const ContainerNombremusculo = styled.div`
width: 120px;
height: 50px;
border-radius: 20px;
background-color: ${secondColor};
display: flex;
align-items: center;
justify-content: center;
transition: 800ms;
cursor: pointer;

&:hover {
width: 135px;
height: 60px;
transition: 800ms;
}
`

export const NombreMusculos = styled.span`
text-align: center;
font-family: ${familyFont}, ${familyFontDefault};
font-size: 16px;
font-weight: ${regular};
color: ${thirdColor};
`
// ----------------------------------------------------
export const ContainerInfoMusculo = styled.div`
width: 90%;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
margin-top: 50px;
background-color: ${firstColor};
border: 5px solid ${secondColor};
border-radius: 30px;
`

export const TituloInfoMusculo = styled.h4`
color: ${thirdColor};
text-align: center;
font-size: 30px;
font-weight: ${semiBold};
font-family: ${familyFont}, ${familyFontDefault};
margin-top: 20px;
`

export const SubtituloInfoMusculo = styled(TituloInfoMusculo)`
width: 95%;
font-size: 22px;
text-align: left;
`

export const ImgInfoMusculo = styled.img`
width: 300px;
height: 300px;
margin-top: 30px;
`

export const DescripcionInfoMusculo = styled.p`
margin-top: 30px;
font-size: 18px;
font-family: ${familyFont}, ${familyFontDefault};
font-weight: ${regular};
line-height: 1.3;
padding: 0 30px 30px;
text-align: justify;
color: ${thirdColor};
`

export const OtrasDescripciones = styled(DescripcionInfoMusculo)`
width: 95%;
padding: 0 30px;
margin-top: 15px;
`

//----------------------------------------------------------------

export const ContainerFooter = styled.div`
width: 100%;
height: 180px;
background-color: ${secondColor};
margin-top: 80px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
export const Logo = styled.img`
height: 100px;
margin-top: 10px;
`

export const TextoFooter = styled.span`
color: ${thirdColor};
font-size: 16px;
font-family: ${familyFont}, ${familyFontDefault};
margin: 20px 0; 
`
