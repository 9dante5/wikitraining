import { Carousel, Modal } from "antd"
import { ContainerDashboardUser } from "../../styles/dashboardUserStyled"
import { useDispatch, useSelector } from "react-redux";
import { Card, ContainerOpcionesCard, GrupoMuscularCard, NombreGrupoMuscularCard, TituloCard } from "../../styles/dashboardAdminStyled";
import { FaHeart, FaRegEye, FaRegHeart } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { readEjercicioAsync, setEjercicios } from "../../redux/slices/ejercicioSlice";
import { bold, familyFont, fourthColor, light, secondColor, thirdColor } from "../../styles/styleSheet";
import { login, updateUserAsync } from "../../redux/slices/userSlice";
import { FaArrowCircleRight } from "react-icons/fa";

const HomeUser = () => {
  const ejercicios = useSelector((store: any) => store.ejercicio)
  const user = useSelector((store: any) => store.user)
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

  //agregar a favoritos---------------------------------------------
  const handleAddFavorites = async (ejercicio: any) => {
    const favoritos: string[] = []
    user.favorites.forEach((element: any) => {
      favoritos.push(element)
    });
    favoritos.push(ejercicio.id)

    const newDataUser = {
      id: user.uid,
      favorites: favoritos,
    }

    await updateUserAsync(newDataUser, user.uid)

    dispatch(login({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      sex: user.sex,
      age: user.age,
      favorites: favoritos,
      trainer: user.trainer,
      isAuthenticated: user.isAuthenticated,
      rol: user.rol
    }))

  }
  //----------------------------------------------------------------
  //desagregar de favoritos-----------------------------------------
  const handleUngroupFavorites = async (ejercicio: any) => {
    const favoritos: string[] = []
    user.favorites.forEach((element: any) => {
      favoritos.push(element)
    });

    favoritos.splice(favoritos.indexOf(ejercicio.id), 1)

    const newDataUser = {
      id: user.uid,
      favorites: favoritos,
    }

    await updateUserAsync(newDataUser, user.uid)

    dispatch(login({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      sex: user.sex,
      age: user.age,
      favorites: favoritos,
      trainer: user.trainer,
      isAuthenticated: user.isAuthenticated,
      rol: user.rol
    }))
  }
  //----------------------------------------------------------------
  return (
    <>
          <Carousel infinite={true} dots={false} draggable={true} style={{border: "2px solid #FCFCFE" , borderRadius:"20px",margin: "60px auto", width: "65%", height: "fit-content" }}>
            <div>
              <h3 style={{width: "100%", height: "200px", fontSize:"30px", fontFamily: familyFont, textAlign: "center", alignContent: "center", color: thirdColor}}>Pasos para contratar un entrenador</h3>
              <FaArrowCircleRight style={{width: "100%", fontSize:"100px", textAlign: "center", color: thirdColor}}/>
            </div>
            <div>
              <img src="https://res.cloudinary.com/dyh9yinxl/image/upload/v1729467597/contratar-entrenador_xh2t8f.gif" style={{borderRadius:"20px", width: "100%" }} />
            </div>
            <div>
              <h3 style={{width: "100%", height: "200px", fontSize:"30px", fontFamily: familyFont, textAlign: "center", alignContent: "center", color: thirdColor}}>Pasos para calcular tus calorias</h3>
              <FaArrowCircleRight style={{width: "100%", fontSize:"100px", textAlign: "center", color: thirdColor}}/>
            </div>
            <div>
              <img src="https://res.cloudinary.com/dyh9yinxl/image/upload/v1729467489/calcular-calorias_bciiqr.gif" style={{borderRadius:"20px", width: "100%" }} />
            </div>
            <div>
              <h3 style={{width: "100%", height: "200px", fontSize:"30px", fontFamily: familyFont, textAlign: "center", alignContent: "center", color: thirdColor}}>Pasos para calcular tus macronutrientes</h3>
              <FaArrowCircleRight style={{width: "100%", fontSize:"100px", textAlign: "center", color: thirdColor}}/>
            </div>
            <div>
              <img src="https://res.cloudinary.com/dyh9yinxl/image/upload/v1729467556/Calcular-macros_fsiysz.gif" style={{borderRadius:"20px", width: "100%" }} />
            </div>
          </Carousel>

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
                {
                  user.favorites.includes(ejercicio.id) ?
                    <FaHeart onClick={() => handleUngroupFavorites(ejercicio)} style={{ fontSize: "23px", margin: "0 5px", color: fourthColor, cursor: "pointer" }} /> :
                    <FaRegHeart onClick={() => handleAddFavorites(ejercicio)} style={{ fontSize: "23px", margin: "0 5px", color: thirdColor, cursor: "pointer" }} />
                }
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

export default HomeUser
