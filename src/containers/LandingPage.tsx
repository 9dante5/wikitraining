import { useEffect, useState } from 'react'
import { ContainerFraseDia, ContainerLandingPage, ContainerMusculos, ContainerMenu, ContainerSobreNosotros, NavBarLadingPage, TextoSobreNosotros, TituloNavBar, TituloSobreNosotros, ContainerNombremusculo, NombreMusculos, ContainerInfoMusculo, TituloInfoMusculo, ImgInfoMusculo, DescripcionInfoMusculo, ContainerFooter, Logo, TextoFooter, BotonDashboard, SubtituloInfoMusculo, OtrasDescripciones, ImgPoster } from '../styles/ladingPageStyled'
import { CopyrightOutlined, UserOutlined } from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom';
import { listaMusculos } from '../helpers/constans';
import logo from "../assets/logo 3.png"
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/FirebaseConfig';
import { loginTrainer, obtenerRolTrainer } from '../redux/slices/trainerSlice';
import { loginAdmin } from '../redux/slices/adminSlice';
import { login } from '../redux/slices/userSlice';
import poster from "../assets/poster.webp"
import { familyFont, secondColor, thirdColor } from '../styles/styleSheet';


type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '1',
    icon: <UserOutlined style={{ fontSize: '30px', color: '#000' }} />,
    children: [
      { key: '11', label: 'Iniciar sesión' },
      { key: '12', label: 'Registrarse' }
    ],
  }
];

const LandingPage = () => {

  const [selected, setSelected]: any = useState();
  const navigate = useNavigate();
  const user = useSelector((store: any) => store.user)
  const trainer = useSelector((store: any) => store.trainer)
  const admin = useSelector((store: any) => store.admin)

  const dispatch = useDispatch();

  useEffect(() => {
    const validateUserState = onAuthStateChanged(auth, user => {

      if (user) {
        obtenerRolTrainer(user.uid).then((userSelect: any) => userSelect == undefined ? <></> :
          userSelect.rol == "admin" ?
            dispatch(loginAdmin({
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              isAuthenticated: true,
              rol: userSelect.rol
            }))
            : userSelect.rol == "trainer" ?
              dispatch(loginTrainer({
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                phoneNumber: userSelect.phoneNumber,
                sex: userSelect.sex,
                age: userSelect.age,
                asesorados: userSelect.asesorados,
                isAuthenticated: true,
                rol: userSelect.rol
              }))
              : userSelect.rol == "user" ?
                dispatch(login({
                  uid: user.uid,
                  displayName: user.displayName,
                  email: user.email,
                  photoURL: user.photoURL,
                  phoneNumber: userSelect.phoneNumber,
                  sex: userSelect.sex,
                  age: userSelect.age,
                  favorites: userSelect.favorites,
                  trainer: userSelect.trainer,
                  isAuthenticated: true,
                  rol: userSelect.rol
                }))
                : console.log(user)
        )
      }
    })

    return () => validateUserState();
  }, [dispatch])

  // useEffect(() => {

  //   const getFraseDia = async () => {
  //     const data = await getData(ulrFraseDia)
  //     setFraseDia(data.frases[numeroFrase].frase)
  //     setAutorFraseDia(data.frases[numeroFrase].autor)
  //   }
  //   getFraseDia()
  // }, [])



  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === '11') {
      navigate('/login')
    } else {
      navigate('/register')
    }
  };

  const handleOpenMusculo = (id: number) => {
    setSelected(listaMusculos.find(item => item.id === id))
  }

  return (
    <>
      <ContainerLandingPage>
        <NavBarLadingPage>
          <TituloNavBar>Wiki Training</TituloNavBar>
          <ContainerMenu>
            {user.isAuthenticated ? <BotonDashboard onClick={() => { navigate("/dashboard/" + user.rol + "/" + user.displayName) }}>DashBoard</BotonDashboard> :
              trainer.isAuthenticated ? <BotonDashboard onClick={() => { navigate("/dashboard/" + trainer.rol + "/" + trainer.displayName) }}>DashBoard</BotonDashboard> :
                admin.isAuthenticated ? <BotonDashboard onClick={() => { navigate("/dashboard/" + admin.rol + "/" + admin.displayName) }}>DashBoard</BotonDashboard> :
                  <Menu
                    mode="inline"
                    onClick={onClick}
                    style={{ width: 160, backgroundColor: secondColor, color: thirdColor, fontFamily: familyFont, fontWeight: 300, border: 0 }}
                    items={items}
                  />}

          </ContainerMenu>
        </NavBarLadingPage>

        <ContainerFraseDia>
          <ImgPoster src={poster} alt="" />
        </ContainerFraseDia>

        <ContainerSobreNosotros>
          <TituloSobreNosotros>Sobre nosotros</TituloSobreNosotros>
          <TextoSobreNosotros>
            En Wiki Training, estamos comprometidos con brindarte las herramientas y conocimientos necesarios para que mejores tu bienestar físico de manera efectiva y saludable. Nos especializamos en proporcionar información detallada sobre la correcta ejecución de los ejercicios, asegurando que puedas entrenar de manera segura y eficiente, maximizando los resultados.
          </TextoSobreNosotros>
          <TextoSobreNosotros>
            Además, te ofrecemos servicios personalizados como la posibilidad de contratar a un entrenador que te guiará en cada paso de tu progreso. También contamos con herramientas avanzadas para calcular las calorías que necesitas diariamente y diseñar un plan de macronutrientes adecuado para alcanzar tus objetivos, ya sea ganar músculo, perder peso o mejorar tu rendimiento deportivo. Nuestra misión es ayudarte a lograr tus metas de la forma más saludable, equilibrada y personalizada posible. ¡Estamos aquí para acompañarte en tu camino hacia una mejor versión de ti mismo!.
          </TextoSobreNosotros>
          <TextoSobreNosotros>
            Nuestra misión es ayudarte a lograr tus metas de la forma más saludable, equilibrada y personalizada posible. ¡Estamos aquí para acompañarte en tu camino hacia una mejor versión de ti mismo!.
          </TextoSobreNosotros>
        </ContainerSobreNosotros>

        <ContainerMusculos>
          {listaMusculos?.map((item) => (
            <ContainerNombremusculo key={item.id} onClick={() => handleOpenMusculo(item.id)}>
              <NombreMusculos>{item.nombreMusculo}</NombreMusculos>
            </ContainerNombremusculo>
          ))}
        </ContainerMusculos>

        {
          selected == null ? <></> :
            <ContainerInfoMusculo key={selected?.id}>
              <TituloInfoMusculo>{selected?.nombreMusculo}</TituloInfoMusculo>
              <ImgInfoMusculo src={selected?.img} alt={selected?.nombreMusculo} />
              <DescripcionInfoMusculo>{selected?.descripcion}</DescripcionInfoMusculo>
              <SubtituloInfoMusculo>Función</SubtituloInfoMusculo>
              {selected?.funcion == undefined ? <></>
                : selected?.funcion.map((funcion: any) => (
                  <OtrasDescripciones>{funcion}</OtrasDescripciones>
                ))
              }
              <SubtituloInfoMusculo>Importancia</SubtituloInfoMusculo>
              {selected?.importancia == undefined ? <></>
                : selected.importancia.map((importancia: any) => (
                  <OtrasDescripciones>{importancia}</OtrasDescripciones>
                ))
              }
              <DescripcionInfoMusculo>{selected?.resumen}</DescripcionInfoMusculo>
            </ContainerInfoMusculo>
        }


        <ContainerFooter>
          <Logo src={logo} alt='Logo' />
          <TextoFooter><CopyrightOutlined style={{ fontSize: '16px', color: thirdColor }} /> Copyright Wiki Training 2024</TextoFooter>
        </ContainerFooter>

      </ContainerLandingPage>

    </>
  )
}

export default LandingPage
