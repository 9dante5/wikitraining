import styled from "styled-components"
import { bold, familyFont, familyFontDefault, fourthColor, light, medium, regular, secondColor, thirdColor } from "../../styles/styleSheet"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useState } from "react"
import { Progress, Tooltip } from "antd"

const Container = styled.div`
width: 100%;
height: fit-content;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
`

const Titulo = styled.h1`
margin: 30px 0;
font-size: 40px;
font-weight: ${bold};
font-family: ${familyFont}, ${familyFontDefault};
text-align: center;
color: ${thirdColor};
`

const Texto = styled.p`
margin: 10px 0;
font-size: 20px;
font-weight: ${regular};
font-family: ${familyFont}, ${familyFontDefault};
text-align: justify;
padding: 0 20px;
color: ${thirdColor};
`

const FormCalcMacros = styled.form`
width: 100%;
height: fit-content;
display: flex;
flex-direction: row;
flex-wrap: wrap;
gap: 20px;
align-items: center;
justify-content: center;
margin: 50px 0 80px;
`

const ContainerPorcentajeMacros = styled.div`
width: 350px;
height: 200px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
border: 2px solid ${secondColor};
border-radius: 20px;
`

const ContainerCaloriasComidas = styled(ContainerPorcentajeMacros)`
gap: 30px;
`

const LabelFormCalcMacros = styled.label`
display: flex;
flex-direction: column;
font-family: ${familyFont}, ${familyFontDefault};
font-size: 16px;
font-weight: ${medium};
align-items: center;
justify-content: center;
color: ${thirdColor};
`

const LabelRadioButton = styled(LabelFormCalcMacros)`
flex-direction: row;
margin: 5px 0;
`

const RadioButton = styled.input`

`

const InputFormCalcMacros = styled.input`
width: 200px;
height: 25px;
margin-top: 10px;
border: 0;
border-radius: 10px;
background-color: ${secondColor};
font-family: ${familyFont}, ${familyFontDefault};
font-size: 16px;
font-weight: ${light};
outline: none;
text-align: center
`

const ButtonFormCalcMacros = styled.button`
width: 170px;
height: 50px;
margin-top: 50px;
border: 0;
border-radius: 20px;
background-color: ${secondColor};
font-family: ${familyFont}, ${familyFontDefault};
font-size: 18px;
font-weight: ${medium};
outline: none;
text-align: center
`

const ContainerCalculoPorcentaje = styled.div`
width: 95%;
height: fit-content;
 display: flex;
 flex-direction: row;
 flex-wrap: wrap;
 gap: 20px;
 align-items: center;
 justify-content: center;
 margin-bottom: 90px;
`

interface FormCalcMacros {
  calorias: number;
  porcentaje: number;
  comidas: number;
}
const CalcMacros = () => {

  const [porcentajeMacros, setPorcentajeMacros]: any[] = useState()
  const [gramosDia, setGramosDia]: any[] = useState()
  const [gramosComida, setGramosComida]: any[] = useState()

  const formik = useFormik<FormCalcMacros>({
    initialValues: {
      calorias: 2000,
      porcentaje: 0,
      comidas: 1,
    },
    onSubmit: (values) => {
      let porcentajes: number[] = []
      let grDia: number[] = []
      let grComida: number[] = []

      if (values.porcentaje == 1) {
        porcentajes = [60, 25, 15]
        grDia = [
          Math.round((values.calorias * (60 / 100)) / 4),
          Math.round((values.calorias * (25 / 100)) / 4),
          Math.round((values.calorias * (15 / 100)) / 9)
        ]
        grComida = [
          Math.round(((values.calorias * (60 / 100)) / 4) / values.comidas),
          Math.round(((values.calorias * (25 / 100)) / 4) / values.comidas),
          Math.round(((values.calorias * (15 / 100)) / 9) / values.comidas)]

      } else if (values.porcentaje == 2) {
        porcentajes = [50, 25, 25]
        grDia = [
          Math.round((values.calorias * (50 / 100)) / 4),
          Math.round((values.calorias * (25 / 100)) / 4),
          Math.round((values.calorias * (25 / 100)) / 9)
        ]
        grComida = [
          Math.round(((values.calorias * (50 / 100)) / 4) / values.comidas),
          Math.round(((values.calorias * (25 / 100)) / 4) / values.comidas),
          Math.round(((values.calorias * (25 / 100)) / 9) / values.comidas)]

      } else if (values.porcentaje == 3) {
        porcentajes = [25, 45, 30]
        grDia = [
          Math.round((values.calorias * (25 / 100)) / 4),
          Math.round((values.calorias * (45 / 100)) / 4),
          Math.round((values.calorias * (30 / 100)) / 9)
        ]
        grComida = [
          Math.round(((values.calorias * (25 / 100)) / 4) / values.comidas),
          Math.round(((values.calorias * (45 / 100)) / 4) / values.comidas),
          Math.round(((values.calorias * (30 / 100)) / 9) / values.comidas)]
      }

      setPorcentajeMacros(porcentajes)
      setGramosDia(grDia)
      setGramosComida(grComida)

    },
    validationSchema: Yup.object({
      calorias: Yup.number().required(),
      porcentaje: Yup.number().required(),
      comidas: Yup.number().required(),
    }),
  })

  return (
    <>
      <Container>
        <Titulo>Calculadora de MACROS</Titulo>
        <Texto>
          Los macronutrientes (macros) se definen generalmente como los tres sustratos que utiliza el cuerpo para producir energía. Estos sustratos energéticos son los carbohidratos, las grasas y las proteínas. Juntos, los macronutrientes crean el total calórico de un alimento.
        </Texto>
        <FormCalcMacros onSubmit={formik.handleSubmit}>
          <ContainerPorcentajeMacros>
            <LabelRadioButton>
              <RadioButton
                type="radio"
                name="porcentaje"
                onChange={formik.handleChange}
                value={1}
                onBlur={formik.handleBlur}
              />
              60/25/15/(Alto en carbohidratos)
            </LabelRadioButton>
            <LabelRadioButton>
              <RadioButton
                type="radio"
                name="porcentaje"
                onChange={formik.handleChange}
                value={2}
                onBlur={formik.handleBlur}
              />
              50/25/25/(Moderado)
            </LabelRadioButton>
            <LabelRadioButton>
              <RadioButton
                type="radio"
                name="porcentaje"
                onChange={formik.handleChange}
                value={3}
                onBlur={formik.handleBlur}
              />
              25/45/30/(Bajo en carbohidratos)
            </LabelRadioButton>
          </ContainerPorcentajeMacros>

          <ContainerCaloriasComidas>
            <LabelFormCalcMacros>
              Calorias:
              <InputFormCalcMacros
                type="number"
                name="calorias"
                onChange={formik.handleChange}
                value={formik.values.calorias}
                onBlur={formik.handleBlur}
              />
            </LabelFormCalcMacros>
            <LabelFormCalcMacros>
              Comidas por día:
              <InputFormCalcMacros
                type="number"
                name="comidas"
                onChange={formik.handleChange}
                value={formik.values.comidas}
                onBlur={formik.handleBlur}
              />
            </LabelFormCalcMacros>
          </ContainerCaloriasComidas>

          <ButtonFormCalcMacros type="submit">Calcular MACROS</ButtonFormCalcMacros>
        </FormCalcMacros>

        {
          porcentajeMacros == null || gramosDia == null ? <></> :
            <ContainerCalculoPorcentaje>
              <Progress type="circle" percent={porcentajeMacros[0]} strokeColor={fourthColor} trailColor={secondColor} size={280} format={() =>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  <Tooltip
                    title="1gr de carbohidrato es igual a 4kcal"
                    color={secondColor}>
                    <h3 style={{ fontSize: "20px", fontFamily: familyFont, color: thirdColor }}>Carbohidratos</h3>
                  </Tooltip>
                  <span style={{ fontSize: "20px", fontFamily: familyFont, color: thirdColor }} >{porcentajeMacros[0] + "%"}</span>
                  <h3 style={{ fontSize: "20px", fontFamily: familyFont, color: thirdColor }}>Gramos por día</h3>
                  <span style={{ fontSize: "20px", fontFamily: familyFont, color: thirdColor }} >{gramosDia[0]}</span>
                  <h3 style={{ fontSize: "20px", fontFamily: familyFont, color: thirdColor }}>Gramos por comida</h3>
                  <span style={{ fontSize: "20px", fontFamily: familyFont, color: thirdColor }} >{gramosComida[0]}</span>
                </div>
              } />
              <Progress type="circle" percent={porcentajeMacros[1]} strokeColor={fourthColor} trailColor={secondColor} size={280} format={() =>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  <Tooltip
                    title="1gr de proteina es igual a 4kcal"
                    color={secondColor}>
                    <h3 style={{ fontSize: "20px", fontFamily: familyFont, color: thirdColor }}>Proteínas</h3>
                  </Tooltip>
                  <span style={{ fontSize: "20px", fontFamily: familyFont, color: thirdColor }} >{porcentajeMacros[1] + "%"}</span>
                  <h3 style={{ fontSize: "20px", fontFamily: familyFont, color: thirdColor }}>Gramos por día</h3>
                  <span style={{ fontSize: "20px", fontFamily: familyFont, color: thirdColor }} >{gramosDia[1]}</span>
                  <h3 style={{ fontSize: "20px", fontFamily: familyFont, color: thirdColor }}>Gramos por comida</h3>
                  <span style={{ fontSize: "20px", fontFamily: familyFont, color: thirdColor }} >{gramosComida[1]}</span>
                </div>
              } />
              <Progress type="circle" percent={porcentajeMacros[2]} strokeColor={fourthColor} trailColor={secondColor} size={280} format={() =>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  <Tooltip
                    title="1gr de grasa es igual a 9kcal"
                    color={secondColor}>
                    <h3 style={{ fontSize: "20px", fontFamily: familyFont, color: thirdColor }}>Grasas</h3>
                  </Tooltip>
                  <span style={{ fontSize: "20px", fontFamily: familyFont, color: thirdColor }} >{porcentajeMacros[2] + "%"}</span>
                  <h3 style={{ fontSize: "20px", fontFamily: familyFont, color: thirdColor }}>Gramos por día</h3>
                  <span style={{ fontSize: "20px", fontFamily: familyFont, color: thirdColor }} >{gramosDia[2]}</span>
                  <h3 style={{ fontSize: "20px", fontFamily: familyFont, color: thirdColor }}>Gramos por comida</h3>
                  <span style={{ fontSize: "20px", fontFamily: familyFont, color: thirdColor }} >{gramosComida[2]}</span>
                </div>
              } />
            </ContainerCalculoPorcentaje>
        }


      </Container>
    </>
  )
}

export default CalcMacros
