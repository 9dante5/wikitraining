import { FaRegEye } from "react-icons/fa6"
import { Card, ContainerOpcionesCard, GrupoMuscularCard, NombreGrupoMuscularCard, TituloCard } from "../../styles/dashboardAdminStyled"
import { ContainerDashboardUser } from "../../styles/dashboardUserStyled"
import { bold, familyFont, light, secondColor, thirdColor } from "../../styles/styleSheet"
import { Modal } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { readEjercicioAsync, setEjercicios } from "../../redux/slices/ejercicioSlice"


const HomeTrainer = () => {
  const ejercicios = useSelector((store: any) => store.ejercicio)
  const dispatch = useDispatch()

  const [ejercicioSelect, setEjercicioSelect]: any = useState({})
  const [arrayDescripcion, setArrayDescripcion]: any = useState([])
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);

  //--------funciones modal--------------------------------
  const handleCancel = () => {
    setIsModalViewOpen(false);
  };
  //----------------------------------------------------------------
  //-----------esto es para visualizar el ejercicio en el modal-----
  const hendleView = (data: any) => {
    setEjercicioSelect(data)
    setArrayDescripcion(data.descripcionEjercicio.split("\n"))
    setIsModalViewOpen(true);
  }
  //----------------------------------------------------------------
  //---------esto es para cargar los ejercicios en el redux--------
  async function handleData() {
    await readEjercicioAsync().then((resp) => {
      dispatch(setEjercicios(resp))
    })
  }

  useEffect(() => {
    handleData()
  }, [dispatch])
  //----------------------------------------------------------------
  return (
    <>
      <ContainerDashboardUser>
        {
          ejercicios.ejercicios?.map((ejercicio: any) => (
            <Card key={ejercicio.id}>
              <TituloCard>{ejercicio.nombreEjercicio}</TituloCard>
              <GrupoMuscularCard>Musculo:
                <NombreGrupoMuscularCard> {ejercicio.grupoMuscular} </NombreGrupoMuscularCard>
              </GrupoMuscularCard>
              <ContainerOpcionesCard>
                <FaRegEye onClick={() => hendleView(ejercicio)} style={{ fontSize: "23px", margin: "0 5px", color: thirdColor, cursor: "pointer" }} />
              </ContainerOpcionesCard>
            </Card>
          ))
        }
      </ContainerDashboardUser>
      <Modal open={isModalViewOpen} onCancel={handleCancel} width={1000} footer="">
        <div key={ejercicioSelect.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h2 key={ejercicioSelect.id} style={{ fontSize: "35px", fontFamily: familyFont, margin: "10px 0", fontWeight: bold }}>{ejercicioSelect.nombreEjercicio}</h2>
          {
            ejercicioSelect.videosEjercicio?.map((video: string) => (
              <video src={video} style={{ width: "100%", height: "fit-content", margin: "10px 0" }} controls>
              </video>
            ))
          }
          <div style={{ width: "100%", margin: "10px 0" }}>
            {
              arrayDescripcion.map((descripcion: any, index: any) => (
                <div key={index} style={{ width: "100%", height: "fit-content", padding: "5px 0", paddingLeft: "10px", margin: "10px 0", backgroundColor: secondColor, border: "0", borderRadius: "12px" }}>
                  <p key={index} style={{ fontFamily: familyFont, fontSize: "20px", fontWeight: light }}> {descripcion} </p>
                </div>
              ))
            }
          </div>
        </div>
      </Modal>
    </>
  )
}

export default HomeTrainer
