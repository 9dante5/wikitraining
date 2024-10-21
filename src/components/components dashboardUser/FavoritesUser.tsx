import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { ContainerDashboardUser } from "../../styles/dashboardUserStyled"
import { Card, ContainerOpcionesCard, GrupoMuscularCard, NombreGrupoMuscularCard, TituloCard } from "../../styles/dashboardAdminStyled"
import { FaHeart, FaRegEye, FaRegHeart } from "react-icons/fa6"
import { bold, familyFont, fourthColor, light, secondColor, thirdColor } from "../../styles/styleSheet"
import { Modal } from "antd"
import { login, updateUserAsync } from "../../redux/slices/userSlice"

const FavoritesUser = () => {
  const user = useSelector((store: any) => store.user)
  const ejercicios = useSelector((store: any) => store.ejercicio)
  const [listFavorites, setListFavorites]: any[] = useState([])
  const [ejercicioSelect, setEjercicioSelect]: any = useState({})
  const [arrayDescripcion, setArrayDescripcion]: any = useState([])
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);

  const dispatch = useDispatch()

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
  //cargar lista favoritos--------------------------------
  function cargarFavoritos() {

    let favoritos: any[] = []

    user.favorites.map((idEjercicio: any) => {
      const ejercicio = ejercicios.ejercicios.find((e: any) => e.id == idEjercicio)

      if (ejercicio != undefined) {
        favoritos.push(ejercicio)
      }

    })

    setListFavorites(favoritos)
  }

  useEffect(() => {
    cargarFavoritos()
  }, [dispatch])
  //--------------------------------------------------------
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
      <ContainerDashboardUser style={{ margin: "60px 0" }}>
        {
          listFavorites === undefined ? <></> :
            listFavorites.map((ejercicio: any) => (
              <Card key={ejercicio.id}>
                <TituloCard>{ejercicio.nombreEjercicio}</TituloCard>
                <GrupoMuscularCard>Musculo:
                  <NombreGrupoMuscularCard> {ejercicio.grupoMuscular} </NombreGrupoMuscularCard>
                </GrupoMuscularCard>
                <ContainerOpcionesCard>
                  <FaRegEye onClick={() => hendleView(ejercicio)} style={{ cursor: "pointer", fontSize: "23px", margin: "0 5px", color: thirdColor }} />
                  {
                    user.favorites.includes(ejercicio.id) ?
                      <FaHeart onClick={() => handleUngroupFavorites(ejercicio)} style={{ cursor: "pointer", fontSize: "23px", margin: "0 5px", color: fourthColor }} /> :
                      <FaRegHeart onClick={() => handleAddFavorites(ejercicio)} style={{ cursor: "pointer", fontSize: "23px", margin: "0 5px", color: thirdColor }} />
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

export default FavoritesUser
