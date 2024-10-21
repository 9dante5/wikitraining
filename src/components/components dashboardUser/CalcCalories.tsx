import styled from "styled-components"
import { bold, familyFont, familyFontDefault, light, medium, regular, secondColor, thirdColor } from "../../styles/styleSheet"
import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { Tooltip } from "antd"

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

const FormCalcCalorias = styled.form`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 50px;
`

const ContainerDatosForm = styled.div`
width: 90%;
height: fit-content;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
flex-wrap: wrap;
margin-top: 50px;
gap: 20px;
`

const LabelFromCalcCalorias = styled.label`
display: flex;
flex-direction: column;
font-family: ${familyFont}, ${familyFontDefault};
font-size: 16px;
font-weight: ${medium};
align-items: center;
justify-content: center;
color: ${thirdColor};
`

const InputFormCalcCalorias = styled.input`
width: 80px;
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

const SelectFormCalcCalorias = styled.select`
width: 80px;
height: 25px;
margin-top: 10px;
border: 0;
border-radius: 10px;
background-color: ${secondColor};
font-family: ${familyFont}, ${familyFontDefault};
font-size: 16px;
font-weight: ${light};
outline: none;
text-align: center;
position: relative;
`

const Select2 = styled(SelectFormCalcCalorias)`
width: 350px;
height: 25px;
`

const Opciones = styled.option`
font-family: ${familyFont}, ${familyFontDefault};
font-weight: ${light};
font-size: 12px;
`

const ButtonFormCalcCalorias = styled.button`
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

const ContainerCalorias = styled.div`
width: 95%;
height: fit-content;
background-color: ${secondColor};
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
flex-wrap: wrap;
margin: 50px 0 80px;
border-radius: 50px;
`

const Calorias = styled.div`
width: 200px;
height: 200px;
margin: 20px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const TituloCalorias = styled.h2`
margin: 20px 0;
font-size: 20px;
font-weight: ${bold};
font-family: ${familyFont}, ${familyFontDefault};
text-align: center;
`

const CaloriasValor = styled.p`
margin: 0;
font-size: 18px;
font-weight: ${regular};
font-family: ${familyFont}, ${familyFontDefault};
text-align: center;
`

interface FormCalcCalorias {
  peso: number;
  estatura: number;
  edad: number;
  sexo: string;
  nivelActividad: string;
  meta: string;
}
const CalcCalories = () => {

  const [gastoMetabolico, setGastoMetabolico]: any = useState(null)
  const [caloriasMantenimiento, setCaloriasMantenimiento]: any = useState(null)
  const [caloriasMeta, setCaloriasMeta]: any = useState(null)

  const formik = useFormik<FormCalcCalorias>({
    initialValues: {
      peso: 0,
      estatura: 0,
      edad: 0,
      sexo: "F",
      nivelActividad: "1",
      meta: "6"
    },
    onSubmit: (values) => {
      let gasto = 0
      let caloriasTotales = 0
      let deficitCalorico = 0
      if (values.sexo === "F") {
        gasto = (10 * values.peso) + (6.25 * values.estatura) - (5 * values.edad) - 161
      } else {
        gasto = (10 * values.peso) + (6.25 * values.estatura) - (5 * values.edad) + 5
      }

      if (values.nivelActividad === "1") {
        caloriasTotales = gasto * 1.2
      } else if (values.nivelActividad === "2") {
        caloriasTotales = gasto * 1.375
      } else if (values.nivelActividad === "3") {
        caloriasTotales = gasto * 1.55
      } else if (values.nivelActividad === "4") {
        caloriasTotales = gasto * 1.725
      } else if (values.nivelActividad === "5") {
        caloriasTotales = gasto * 1.9
      }

      if (values.meta === "1") {
        deficitCalorico = caloriasTotales - (847 * 0.2)
        setCaloriasMeta("para perder 0.2kg de peso a la semana debe consumir " + deficitCalorico + " calorias")
      } else if (values.meta === "2") {
        deficitCalorico = caloriasTotales - (847 * 0.4)
        setCaloriasMeta("para perder 0.4kg de peso a la semana debe consumir " + deficitCalorico + " calorias")
      } else if (values.meta === "3") {
        deficitCalorico = caloriasTotales - (847 * 0.6)
        setCaloriasMeta("para perder 0.6kg de peso a la semana debe consumir " + deficitCalorico + " calorias")
      } else if (values.meta === "4") {
        deficitCalorico = caloriasTotales - (847 * 0.8)
        setCaloriasMeta("para perder 0.8kg de peso a la semana debe consumir " + deficitCalorico + " calorias")
      } else if (values.meta === "5") {
        deficitCalorico = caloriasTotales - (847 * 1)
        setCaloriasMeta("para perder 1kg de peso a la semana debe consumir " + deficitCalorico + " calorias")
      } else if (values.meta === "6") {
        setCaloriasMeta("Para mantener su peso, debe consumir " + caloriasTotales + " calorias, que son sus calorias de mantenimiento")
      } else if (values.meta === "7") {
        setCaloriasMeta("Para subir de peso debe consumir entre 347 y 500 calorias mas sus calorias de mantenimiento, que son " + caloriasTotales + " calorias")
      }

      setGastoMetabolico(gasto)
      setCaloriasMantenimiento(caloriasTotales)

    },
    validationSchema: Yup.object({
      peso: Yup.number().required('El peso es requerido'),
      estatura: Yup.number().required('La estatura es requerida'),
      edad: Yup.number().required('La edad es requerida'),
    }),
  })

  return (
    <>
      <Container>
        <Titulo>Calculadora de calorias</Titulo>
        <Texto>La calculadora de calorías se puede utilizar para calcular las calorías que necesitas consumir cada día. Esta calculadora también puede proporcionar algunas pautas sencillas si quieres ganar o perder peso. Esta calculadora utiliza la ecuación revisada de Harris-Benedict para calcular tus necesidades calóricas.</Texto>

        <FormCalcCalorias onSubmit={formik.handleSubmit}>
          <ContainerDatosForm>
            <LabelFromCalcCalorias> Peso (kg):
              <InputFormCalcCalorias
                name="peso"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.peso}
                onBlur={formik.handleBlur} />
            </LabelFromCalcCalorias>

            <LabelFromCalcCalorias> Estatura (cm):
              <InputFormCalcCalorias
                name="estatura"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.estatura}
                onBlur={formik.handleBlur} />
            </LabelFromCalcCalorias>

            <LabelFromCalcCalorias> Edad (años):
              <InputFormCalcCalorias
                name="edad"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.edad}
                onBlur={formik.handleBlur} />
            </LabelFromCalcCalorias>

            <LabelFromCalcCalorias> Sexo (F / M):
              <SelectFormCalcCalorias
                name="sexo"
                onChange={formik.handleChange}
                value={formik.values.sexo}
                onBlur={formik.handleBlur}>
                <Opciones value="F">F</Opciones>
                <Opciones value="M">M</Opciones>
              </SelectFormCalcCalorias>
            </LabelFromCalcCalorias>

            <LabelFromCalcCalorias> Nivel de actividad:
              <Select2
                name="nivelActividad"
                onChange={formik.handleChange}
                value={formik.values.nivelActividad}
                onBlur={formik.handleBlur}>
                <Opciones value="1"> Sedentario </Opciones>
                <Opciones value="2"> Actividad ligera (1 a 3 días por semana) </Opciones>
                <Opciones value="3"> Actividad moderada (3 a 5 días por semana) </Opciones>
                <Opciones value="4"> Actividad intensa (5 a 7 días por semana)</Opciones>
                <Opciones value="5"> Actividad profesional </Opciones>
              </Select2>
            </LabelFromCalcCalorias>

            <LabelFromCalcCalorias> Meta:
              <Select2
                name="meta"
                onChange={formik.handleChange}
                value={formik.values.meta}
                onBlur={formik.handleBlur}>
                <Opciones value="1"> Perder 0.2Kg por semana </Opciones>
                <Opciones value="2"> perder 0.4kg por semana </Opciones>
                <Opciones value="3"> perder 0.6kg por semana </Opciones>
                <Opciones value="4"> perder 0.8kg por semana </Opciones>
                <Opciones value="5"> perder 1kg por semana </Opciones>
                <Opciones value="6"> Mantener peso </Opciones>
                <Opciones value="7"> Ganar peso </Opciones>
              </Select2>
            </LabelFromCalcCalorias>
          </ContainerDatosForm>
          <ButtonFormCalcCalorias type="submit"> Calcular calorias </ButtonFormCalcCalorias>
        </FormCalcCalorias>
        {
          gastoMetabolico == null ? <></> :
            <ContainerCalorias>
              <Calorias>
                <Tooltip
                  title="El gasto energético basal (GEB) es la cantidad de energía que el cuerpo necesita para mantener sus funciones vitales mientras está en reposo. También se le conoce como tasa metabólica basal (TMB) o índice metabólico basal (BMR)."
                  color={secondColor}>
                  <TituloCalorias>Gasto energético basal</TituloCalorias>
                </Tooltip>
                <CaloriasValor>{gastoMetabolico} Calorias</CaloriasValor>
              </Calorias>
              <Calorias>
                <Tooltip
                  title="Las calorías de mantenimiento son la cantidad de energía que se necesita para mantener un nivel de vida saludable y un peso constante. Para calcularlas, se toma en cuenta el gasto energético total diario (TDEE), que se obtiene al multiplicar la tasa metabólica basal (TMB) por un factor de actividad física (PAL)."
                  color={secondColor}>
                  <TituloCalorias>Calorías de mantenimiento</TituloCalorias>
                </Tooltip>
                <CaloriasValor>{caloriasMantenimiento} Calorias</CaloriasValor>
              </Calorias>
              <Calorias>
                <TituloCalorias>Meta</TituloCalorias>
                <CaloriasValor> {caloriasMeta} </CaloriasValor>
              </Calorias>

            </ContainerCalorias>
        }

      </Container>

    </>
  )
}

export default CalcCalories
