import { useEffect, useRef } from 'react'
import { ContainerInicio, ImgLogoInicio, TituloInicio } from '../styles/inicioStyled'
import logo from "../assets/logo 3.png"
import { useNavigate } from 'react-router-dom';

const Inicio = () => {

    const timeOut: { current: any} = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        timeOut.current = setTimeout(() => {
            navigate("/landing-page")
        }, 2000);

        return () => {
            clearTimeout(timeOut.current);
        };
    },[]);

  return (
    <>
      <ContainerInicio>
        <ImgLogoInicio src={logo} />
        <TituloInicio>Wiki Training</TituloInicio>
      </ContainerInicio>
    </>
  )
}

export default Inicio
