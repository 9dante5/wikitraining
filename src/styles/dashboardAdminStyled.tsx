import styled from "styled-components";
import { familyFont, familyFontDefault, firstColor, light, medium, regular, secondColor, semiBold, thirdColor } from "./styleSheet";

export const Navbar = styled.div`
width: 100%;
height: 70px;
position: fixed;
bottom: 0;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
background-color: ${firstColor}
`

export const NavbarIconsItems = styled.div`
width: 25%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-evenly;
cursor: pointer;
margin: 0 10px;
border-radius: 20px;
transition: 500ms;

&:hover{
background-color: ${secondColor};
transition: 500ms;
}

&:selected{
background-color: ${secondColor};
}
`

export const NavbarTituloItems = styled.h3`
color: ${thirdColor};
font-size: 12px;
font-weight: ${regular};
font-family: ${familyFont}, ${familyFontDefault};
`
//----------------------------------------------------------------

export const Container = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
`

export const ContainerForm = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 30px;
`

export const Titulo = styled.h1`
font-size: 30px;
font-weight: ${semiBold};
font-family: ${familyFont}, ${familyFontDefault};
text-align: center;
color: ${thirdColor};
`

export const FormDashboardAdmin = styled.form`
width: fit-content;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 30px;
`

export const LabelUpload = styled.label`
width: 110px;
background-color: ${secondColor};
padding: 10px 10px;
border-radius: 15px;
border: 0;
outline: none;
font-size: 16px;
font-weight: ${light};
font-family: ${familyFont}, ${familyFontDefault};
height: auto;
margin: 5px 0;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
`

export const Upload = styled.input`
opacity: 0;
width: inherit;
height: inherit;
display: inline-block;
`

export const InputDashboardAdmin = styled.input`
width: 300px;
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

&::placeholder{
color: ${thirdColor};
opacity: 0.8;
}
`

export const SelectDashboardAdmin = styled.select`
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

export const OptionSelectDashboardAdmin = styled.option`
font-size: 12px;
`

export const TextareaDashBoardAdmin = styled.textarea`
width: 300px;
height: 200px;
border: 0;
border-radius: 15px;
color: ${thirdColor};
background-color: ${secondColor};
font-family: ${familyFont}, ${familyFontDefault};
font-size: 15px;
font-weight: ${light};
padding: 10px;
margin: 5px 0;
outline: none;

&::placeholder{
color: ${thirdColor};
opacity: 0.8;
}
`

export const BotonDashboardAdmin = styled.button`
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

&:disabled{
opacity: .5;
}
`
//----------------------------------------------------------------
export const ContainerMostrar = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
flex-wrap: wrap;
gap: 10px;
margin: 60px 0 150px;
`

export const Card = styled.div`
width: 300px;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
border: 1px solid ${secondColor};
border-radius: 30px;
background-color: transparent;
padding: 10px;
`

export const TituloCard = styled.h3`
font-size: 20px;
font-weight: ${medium};
font-family: ${familyFont}, ${familyFontDefault};
color: ${thirdColor};
margin: 5px 0;
text-align: center;
`

export const ImagenCard = styled.img`
width: 150px;
height: 150px;
border-radius: 50%;
margin: 5px 0;
`

export const GrupoMuscularCard = styled.span`
font-size: 15px;
font-weight: ${medium};
font-family: ${familyFont}, ${familyFontDefault};
color: ${thirdColor};
margin: 5px 0;
`

export const NombreGrupoMuscularCard = styled(GrupoMuscularCard)`
font-weight: ${light};
`

export const ContainerOpcionesCard = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
margin: 5px 0;
`