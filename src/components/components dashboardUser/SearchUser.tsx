import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { listaMusculos } from '../../helpers/constans';
import { BotonDashboardAdmin, Card, ContainerOpcionesCard, GrupoMuscularCard, InputDashboardAdmin, NombreGrupoMuscularCard, OptionSelectDashboardAdmin, SelectDashboardAdmin, TituloCard } from '../../styles/dashboardAdminStyled';
import styled from 'styled-components';
import { ContainerDashboardUser } from '../../styles/dashboardUserStyled';
import { FaHeart, FaRegEye, FaRegHeart } from 'react-icons/fa6';
import { bold, familyFont, fourthColor, light, secondColor, thirdColor } from '../../styles/styleSheet';
import { login, updateUserAsync } from '../../redux/slices/userSlice';
import { Modal } from 'antd';

const Container = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin: 20px 0 100px;
`

const FormBuscarEjercicio = styled.form`
width: fit-content;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
`

interface FormSearch {
  buscar: string;
  filtro: string;
}
const SearchUser = () => {
  const ejercicios = useSelector((store: any) => store.ejercicio)
  const user = useSelector((store: any) => store.user)
  const dispatch = useDispatch()

  const [ejerciciosBuscados, setEjerciciosBuscados]: any = useState(null)
  const [ejerciciosFiltro, setEjerciciosFiltro]: any = useState([])
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

  const formik = useFormik<FormSearch>({
    initialValues: {
      buscar: '',
      filtro: ''
    },
    onSubmit: async (values) => {
      const filtrado = ejercicios.ejercicios.filter((ejercicio: any) => ejercicio.grupoMuscular.includes(values.filtro))
      setEjerciciosFiltro(filtrado)
      setEjerciciosBuscados(filtrado)
    },
  })

  const handleUpkey = (e: any) => {
    let buscado
    if (ejerciciosFiltro.length == 0) {
      buscado = ejercicios.ejercicios.filter((ejercicio: any) => ejercicio.nombreEjercicio.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(e.target.value))
    } else {
      buscado = ejerciciosFiltro.filter((ejercicio: any) => ejercicio.nombreEjercicio.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(e.target.value))
    }

    setEjerciciosBuscados(buscado)
  }

  return (
    <>
      <Container>
        <FormBuscarEjercicio onSubmit={formik.handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <SelectDashboardAdmin style={{ margin: "2px 0" }}
              name="filtro"
              onChange={formik.handleChange}
              value={formik.values.filtro}
              onBlur={formik.handleBlur}
            >
              <OptionSelectDashboardAdmin value="ninguno">Filtrar por grupo muscular</OptionSelectDashboardAdmin>
              {
                listaMusculos.map((musculo, index) => (
                  <OptionSelectDashboardAdmin key={index} value={musculo.nombreMusculo}>{musculo.nombreMusculo}</OptionSelectDashboardAdmin>
                ))
              }
            </SelectDashboardAdmin>
            <BotonDashboardAdmin type='submit' style={{ width: "150px", margin: "2px 0" }}> Filtrar </BotonDashboardAdmin>
          </div>
          <InputDashboardAdmin
            name="buscar"
            type="text"
            placeholder="Buscar por nombre"
            onChange={formik.handleChange}
            value={formik.values.buscar}
            onBlur={formik.handleBlur}
            onKeyUp={handleUpkey}
          />
        </FormBuscarEjercicio>
        <ContainerDashboardUser>
          {
            ejerciciosBuscados == null ? <></> :
              ejerciciosBuscados.map((ejercicio: any) => (
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
      </Container>
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

export default SearchUser
