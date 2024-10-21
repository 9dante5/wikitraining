import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { obtenerRolTrainer, readTrainerAsync, updateTrainerAsync } from "../../redux/slices/trainerSlice"
import { Card, ContainerOpcionesCard, ImagenCard, TituloCard } from "../../styles/dashboardAdminStyled"
import { FaRegEye } from "react-icons/fa6"
import { bold, familyFont, familyFontDefault, firstColor, medium, regular, secondColor, thirdColor } from "../../styles/styleSheet"
import { Modal } from "antd"
import { login, updateUserAsync } from "../../redux/slices/userSlice"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from "axios"
import Swal from "sweetalert2"
import { useFormik } from "formik"

const ContainerHireTrainer = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const ContainerTrainers = styled.div`
width: 100%;
height: fit-content;
margin: 50px 0 110px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
flex-wrap: wrap;
gap: 10px;
`

const Titulo = styled.h1`
font-size: 30px;
font-weight: ${bold};
font-family: ${familyFont}, ${familyFontDefault};
margin-top: 50px;
color: ${thirdColor};
`

const BotonContratar = styled.button`
width: 240px;
height: 25px;
border: 0;
border-radius: 10px;
margin-left: 10px;
background-color: ${secondColor};
color: ${thirdColor};
font-size: 15px;
font-weight: ${regular};
font-family: ${familyFont}, ${familyFontDefault};
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
`

interface FormComprobar {
  codigo: string;
}

const HireTrainer = () => {

  initMercadoPago('APP_USR-15376b35-feb5-4cc4-bcbf-54ff8d062d23', { locale: "es-CO" });

  const dispatch = useDispatch()
  const user = useSelector((store: any) => store.user)

  const [listTrainers, setListTrainer]: any = useState([])
  const [trainerSeleted, setTrainerSeleted]: any = useState(null)
  const [trainerHire, setTrainerHire]: any = useState()
  const [isModalOpen, setIsModalOpen] = useState([false, false]);
  const [preferenceId, setPreferenceId]: any = useState()

  const formik = useFormik<FormComprobar>({
    initialValues: {
      codigo: ''
    },
    onSubmit: async (values: any) => {

      if (values.codigo == trainerHire.id) {
        handleContratar(trainerHire, user)
        setPreferenceId(null)
      } else {
        console.log("codigo incorrecto")
      }
    }

  })


  if (user.trainer != "") {
    obtenerRolTrainer(user.trainer).then((trainer) => {
      setTrainerSeleted(trainer)
    })
  }


  const toggleModal = (idx: number, target: boolean) => {
    setIsModalOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };



  //cargar entrenadores ------------------------------------------
  async function handleTrainers() {
    await readTrainerAsync().then((resp) => {
      setListTrainer(resp)
    })
  }

  useEffect(() => {
    handleTrainers()
  }, [dispatch])
  //----------------------------------------------------------------
  //mostrar modal para ver info trainer--------------------------------
  const handleViewTrainer = (trainer: any) => {
    toggleModal(0, true)
    setTrainerSeleted(trainer)
    setPreferenceId(null)
  }
  //----------------------------------------------------------------
  //creando preferencias para mercado pago--------------------------
  const createPreference = async (idTrainer: any) => {
    try {
      const response = await axios.post("https://servidormercadolibre.onrender.com/create_preference", {
        title: idTrainer,
        quantity: 1,
        price: 50000
      });

      const { id } = response.data;
      return id;

    } catch (error) {
      console.log(error)
    }
  }
  //----------------------------------------------------------------
  //seleccionar entrenador------------------------------------------
  const hendleSelectTrainer = async (trainer: any) => {
    const dataTrainer = {
      id: trainer.id,
      nombre: trainer.displayName,
      email: trainer.email,
      asesorados: trainer.asesorados,
    }
    setTrainerHire(dataTrainer)

    const id = await createPreference(dataTrainer.id);
    if (id) {
      setPreferenceId(id)
    }


  }
  //----------------------------------------------------------------
  //boton contratar-------------------------------------------------
  const handleContratar = async (trainer: any, user: any) => {
    const asesorados = trainer.asesorados
    asesorados.push(user.uid)

    const newDataTrainer = {
      id: trainer.id,
      asesorados: asesorados
    }

    const newDataUser = {
      id: user.uid,
      trainer: trainer.id
    }

    await updateTrainerAsync(newDataTrainer, trainer.id)
    await updateUserAsync(newDataUser, user.uid)

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Entrenador contratado",
      showConfirmButton: false,
      timer: 3000
    });

    dispatch(login({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      sex: user.sex,
      age: user.age,
      favorites: user.favorites,
      trainer: trainer.id,
      isAuthenticated: user.isAuthenticated,
      rol: user.rol
    }))

  }
  //----------------------------------------------------------------
  return (
    <>
      <ContainerHireTrainer>
        {
          user.trainer == "" ? <Titulo>Lista de entrenadores</Titulo> : <Titulo>Tu entrenador personal</Titulo>
        }
        <ContainerTrainers>
          {
            user.trainer == "" ?

              listTrainers.map((trainer: any) => (
                <Card key={trainer.id}>
                  <TituloCard>{trainer.displayName}</TituloCard>
                  <ImagenCard src={trainer.photoURL} alt={trainer.displayName} />
                  <ContainerOpcionesCard>
                    <FaRegEye onClick={() => handleViewTrainer(trainer)} style={{ cursor: "pointer", fontSize: "23px", margin: "0 5px", color: thirdColor }} />
                  </ContainerOpcionesCard>
                </Card>
              ))
              :
              <Card key={trainerSeleted?.id}>
                <TituloCard>{trainerSeleted?.displayName}</TituloCard>
                <ImagenCard src={trainerSeleted?.photoURL} alt={trainerSeleted?.displayName} />
                <ContainerOpcionesCard>
                  <FaRegEye onClick={() => handleViewTrainer(trainerSeleted)} style={{ cursor: "pointer", fontSize: "23px", margin: "0 5px", color: thirdColor }} />
                </ContainerOpcionesCard>
              </Card>
          }
        </ContainerTrainers>

        {user.trainer != "" ? <></> :
          < div style={{ marginBottom: "80px", width: "100%", height: "fit-content", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <form style={{ width: "100%", height: "fit-content", display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "10px" }} onSubmit={formik.handleSubmit}>
              <label style={{ fontFamily: familyFont, fontSize: "17px", margin: "0 10px" }}> Ingresar código
                <input
                  style={{ width: "200px", height: "22px", fontFamily: familyFont, border: 0, borderRadius: "5px", backgroundColor: secondColor, margin: "0 10px", paddingLeft: "10px", outline: "none" }}
                  name="codigo"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.codigo}
                  onBlur={formik.handleBlur}
                />
              </label>
              <button type="submit" style={{ height: "25px", fontFamily: familyFont, border: 0, borderRadius: "5px", backgroundColor: secondColor, margin: "0 10px", paddingLeft: "10px", outline: "none" }}>Comprobar</button>
            </form>
          </div>}
      </ContainerHireTrainer >

      <Modal
        open={isModalOpen[0]}
        onOk={() => toggleModal(0, false)}
        onCancel={() => toggleModal(0, false)}
        footer=""
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h2 style={{ fontSize: "35px", fontFamily: familyFont, margin: "10px 0", fontWeight: bold }}>{trainerSeleted?.displayName}</h2>
          <img style={{ width: "200px", height: "200px", border: "0", borderRadius: "50%", margin: "10px 0" }} src={trainerSeleted?.photoURL} alt={trainerSeleted?.displayName} />

          <div style={{ border: "1px solid #4DA1C0", borderRadius: "20px", width: "90%", height: "fit-content", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "10px 0" }}>
            <h3 style={{ fontSize: "20px", fontFamily: familyFont, fontWeight: bold, borderBottom: "1px solid" }}>Informacion del entrenador</h3>
            {
              user.trainer == "" ?
                <></>
                :
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ fontFamily: familyFont, fontWeight: medium, fontSize: "16px" }}> Correo electrónico:
                    <a style={{ fontWeight: regular, textDecoration: "none", color: firstColor, fontSize: "14px" }} href={"mailto:m." + trainerSeleted?.email}> {trainerSeleted?.email} </a>
                  </p>
                  <p style={{ fontFamily: familyFont, fontWeight: medium, fontSize: "16px" }}> Numero celular:
                    <a style={{ fontWeight: regular, textDecoration: "none", color: firstColor, fontSize: "14px" }} href={"https://api.whatsapp.com/send?phone=57" + trainerSeleted?.phoneNumber} target="_blank"> +57 {trainerSeleted?.phoneNumber} </a>
                  </p>
                </div>

            }
            <p style={{ fontFamily: familyFont, fontWeight: medium, fontSize: "16px" }}> Sexo:
              <span style={{ fontWeight: regular, color: firstColor, fontSize: "14px" }}> {trainerSeleted?.sex} </span>
            </p>
            <p style={{ fontFamily: familyFont, fontWeight: medium, fontSize: "16px" }}> Edad:
              <span style={{ fontWeight: regular, color: firstColor, fontSize: "14px" }}> {trainerSeleted?.age} años </span>
            </p>
          </div>
          {
            user.trainer == "" ?
              <div>
                <BotonContratar type="submit" onClick={() => hendleSelectTrainer(trainerSeleted)}>Contratar por $50.000/mes</BotonContratar>
                {preferenceId && <Wallet initialization={{ preferenceId: preferenceId, redirectMode: "blank" }} customization={{ texts: { valueProp: 'smart_option' } }} />}
              </div> : <></>
          }

        </div>
      </Modal>
    </>
  )
}

export default HireTrainer
