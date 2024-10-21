import { useDispatch, useSelector } from 'react-redux'
import { ContainerDashboardUser } from '../../styles/dashboardUserStyled'
import { BotonDashboardAdmin, ImagenCard, InputDashboardAdmin } from '../../styles/dashboardAdminStyled'
import { deleteTrainerAsync, loginTrainer, logoutTrainer, updateTrainerAsync } from '../../redux/slices/trainerSlice'
import { FaUserCircle } from 'react-icons/fa'
import { familyFont, firstColor, fourthColor, light, medium, secondColor, thirdColor } from '../../styles/styleSheet'
import { signOut, updateProfile } from "firebase/auth";
import { auth } from '../../firebase/FirebaseConfig'
import styled from 'styled-components'
import { MdEdit } from 'react-icons/md'
import { Modal, Tooltip } from 'antd'
import Swal from 'sweetalert2'
import { uploadFile } from '../../helpers/cloudinary'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { MensajeErrorRegister } from '../../styles/registerStyled'

const ContainerInfoTrainer = styled.div`
width: 100%;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 30px;
`

const ContainerImg = styled.div`
width: fit-content;
height: fit-content;
display: flex;
justify-content: center;
align-items: center;
`

const LabelEditImg = styled.label`
width: 20px;
height: 20px;
position: absolute;
margin-left: 150px;
outline: none;
cursor: pointer;
`

const InputEditarImg = styled.input`
opacity: 0;
width: inherit;
height: inherit;
`

interface FormEditTrainer {
  displayName: string;
  phoneNumber: string;
  sex: string;
  age: string;
}


const ProfileTrainer = () => {


  const dispatch = useDispatch()
  const trainer = useSelector((store: any) => store.trainer)

  const [isModalOpen, setIsModalOpen] = useState(false);

  //funciones del modal---------------------------------------------------
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //-------------------------------------------------------------------

  const formik = useFormik<FormEditTrainer>({
    initialValues: {
      displayName: trainer.displayName,
      phoneNumber: trainer.phoneNumber,
      sex: trainer.sex,
      age: trainer.age,
    },
    onSubmit: async (values) => {

      const newDataTrainer = {
        id: trainer.uid,
        displayName: values.displayName,
        phoneNumber: values.phoneNumber,
        sex: values.sex,
        age: values.age,
      }

      updateTrainerAsync(newDataTrainer, trainer.uid)

      dispatch(loginTrainer({
        uid: trainer.uid,
        displayName: newDataTrainer.displayName,
        email: trainer.email,
        photoURL: trainer.photoURL,
        phoneNumber: newDataTrainer.phoneNumber,
        sex: newDataTrainer.sex,
        age: newDataTrainer.age,
        asesorados: trainer.asesorados,
        isAuthenticated: trainer.isAuthenticated,
        rol: trainer.rol
      }))

      Toast.fire({ icon: 'success', title: 'Datos actualizados' })
      setIsModalOpen(false);
    },
    validationSchema: Yup.object({
      displayName: Yup.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(30, 'El nombre no puede superar los 30 caracteres')
        .required('El nombre es requerido'),
      phoneNumber: Yup.string()
        .required('El numero celular es requerido')
        .min(10, 'El numero celular no debe tener menos de 10 digitos')
        .max(10, 'El numero celular no debe tener mas de 10 digitos'),
      sex: Yup.string().required('El sexo es requerido'),
      age: Yup.number().required('La edad es requerido'),
    }),
  })

  //------------------ esto es el alert-----------------------
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  //-----------------------------------------------------------

  const signOutTrainer = () => {
    dispatch(logoutTrainer())
    signOut(auth).then(() => {
    }).catch((error) => { console.error(error) })
  }

  const handleDeleteTrainer = async (id: any) => {
    await deleteTrainerAsync(id)
    dispatch(logoutTrainer())
  }

  //------------esto es para cargar las imagenes a la nube----------
  const handleUpload = async (e: any) => {
    const files: any = e.target.files
    const currentUser: any = auth.currentUser

    uploadFile(files[0]).then((resp) => {

      Toast.fire({ icon: 'success', title: 'foto cargada correctamente' })

      updateProfile(currentUser, { photoURL: resp[0] })

      const newDataTrainer = {
        id: currentUser.uid,
        photoURL: resp[0]
      }

      updateTrainerAsync(newDataTrainer, trainer.uid)

      dispatch(loginTrainer({
        uid: trainer.uid,
        displayName: trainer.displayName,
        email: trainer.email,
        photoURL: resp[0],
        phoneNumber: trainer.phoneNumber,
        sex: trainer.sex,
        age: trainer.age,
        asesorados: trainer.asesorados,
        isAuthenticated: trainer.isAuthenticated,
        rol: trainer.rol
      }))
    })
  }
  //----------------------------------------------------------------
  return (
    <>
      <ContainerDashboardUser>
        <ContainerInfoTrainer>
          <ContainerImg>
            {
              trainer?.photoURL == null ?
                <FaUserCircle style={{ fontSize: "150px", margin: "5px 0", color: secondColor }} />
                : <ImagenCard src={trainer.photoURL} alt={trainer.displayName} referrerPolicy="no-referrer" />
            }
            <Tooltip
              title="Editar foto de perfil"
              color={secondColor}>
              <LabelEditImg>
                <MdEdit style={{ width: "20px", height: "20px", padding: "5px", color: thirdColor, fontSize: "25px", border: "3px solid #fff", borderRadius: "100%" }} />
                <InputEditarImg
                  type='file'
                  onChange={handleUpload}
                  accept=".jpg, .jpeg, .png" />
              </LabelEditImg>
            </Tooltip>


          </ContainerImg>
          <InputDashboardAdmin
            value={trainer.displayName}
            disabled={true}
          />
          <InputDashboardAdmin
            value={trainer.email}
            disabled={true}
          />
          <InputDashboardAdmin
            value={"+57 " + trainer.phoneNumber}
            disabled={true}
          />
          <InputDashboardAdmin
            value={"Sexo: " + trainer.sex}
            disabled={true}
          />
          <InputDashboardAdmin
            value={"Edad: " + trainer.age + " años"}
            disabled={true}
          />
          <BotonDashboardAdmin style={{ margin: "5px 0" }} onClick={() => { signOutTrainer() }} > Cerrar sesion</BotonDashboardAdmin>
          <div style={{ width: "320px", height: "fit-content", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
            <BotonDashboardAdmin style={{ width: "130px", height: "fit-content", backgroundColor: fourthColor, margin: "5px 0" }} onClick={showModal} > Editar datos </BotonDashboardAdmin>
            <BotonDashboardAdmin style={{ width: "130px", height: "fit-content", backgroundColor: fourthColor, margin: "5px 0" }} onClick={() => {
              Swal.fire({
                title: "¿Estas seguro(a)?",
                text: "Una vez eliminada la cuenta, ¡no se podrá recuperar!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, Eliminar cuenta",
                cancelButtonText: "Cancelar"
              }).then((result) => {
                if (result.isConfirmed) {
                  handleDeleteTrainer(trainer.uid)
                  Swal.fire({
                    title: "Cuenta Eliminada",
                    text: "Tus datos se han borrado de nuestra base de datos",
                    icon: "success",
                    confirmButtonText: "Listo",
                  });
                }
              });
            }} > Eliminar cuenta</BotonDashboardAdmin>
          </div>
        </ContainerInfoTrainer>
      </ContainerDashboardUser>

      <Modal title="Editar datos" open={isModalOpen} onCancel={handleCancel} footer="">
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "10px 0" }}>

            <label style={{ display: "flex", flexDirection: "column", fontSize: "15px", fontFamily: familyFont }}>
              Nombre
              <input style={{ width: "300px", height: "40px", border: "0", borderRadius: "15px", color: thirdColor, backgroundColor: secondColor, fontFamily: familyFont, fontSize: "15px", fontWeight: light, paddingLeft: "10px", margin: "0 0 10px", outline: "none" }}
                name="displayName"
                type="text"
                placeholder="Nombre completo"
                onChange={formik.handleChange}
                value={formik.values.displayName}
                onBlur={formik.handleBlur} />
            </label>
            {formik.touched && formik.touched.displayName ? (
            <MensajeErrorRegister style={{color: firstColor}}>{formik.errors.displayName}</MensajeErrorRegister>
          ) : null}

            <label style={{ display: "flex", flexDirection: "column", fontSize: "15px", fontFamily: familyFont }}>
              Numero celular
              <input style={{ width: "300px", height: "40px", border: "0", borderRadius: "15px", color: thirdColor, backgroundColor: secondColor, fontFamily: familyFont, fontSize: "15px", fontWeight: light, paddingLeft: "10px", margin: "0 0 10px", outline: "none" }}
                name="phoneNumber"
                type="number"
                placeholder="Numero celular"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                onBlur={formik.handleBlur} />
            </label>
            {formik.touched && formik.touched.phoneNumber ? (
            <MensajeErrorRegister style={{color: firstColor}}>{formik.errors.phoneNumber}</MensajeErrorRegister>
          ) : null}

            <label style={{ display: "flex", flexDirection: "column", fontSize: "15px", fontFamily: familyFont }}>
              Sexo
              <select style={{ width: "300px", height: "40px", border: "0", borderRadius: "15px", color: thirdColor, backgroundColor: secondColor, fontFamily: familyFont, fontSize: "15px", fontWeight: light, paddingLeft: "10px", margin: "0 0 10px", outline: "none" }}
                name="sex"
                onChange={formik.handleChange}
                value={formik.values.sex}
                onBlur={formik.handleBlur}
              >
                <option value="femenino">Femenino</option>
                <option value="masculino">Masculino</option>
                <option value="otro">Otro</option>
              </select>
            </label>
            {formik.touched && formik.touched.sex ? (
            <MensajeErrorRegister style={{color: firstColor}}>{formik.errors.sex}</MensajeErrorRegister>
          ) : null}

            <label style={{ display: "flex", flexDirection: "column", fontSize: "15px", fontFamily: familyFont }}>
              Edad
              <input style={{ width: "300px", height: "40px", border: "0", borderRadius: "15px", color: thirdColor, backgroundColor: secondColor, fontFamily: familyFont, fontSize: "15px", fontWeight: light, paddingLeft: "10px", margin: "0 0 10px", outline: "none" }}
                name="age"
                type="number"
                placeholder="Ingresa la edad"
                onChange={formik.handleChange}
                value={formik.values.age}
                onBlur={formik.handleBlur} />
            </label>
            {formik.touched && formik.touched.age ? (
            <MensajeErrorRegister style={{color: firstColor}}>{formik.errors.age}</MensajeErrorRegister>
          ) : null}

            <button type='submit' style={{ width: "320px", height: "40px", backgroundColor: secondColor, border: "0", borderRadius: "50px", color: thirdColor, fontSize: "20px", fontFamily: familyFont, fontWeight: medium, marginTop: "20px", cursor: "pointer" }}>Actualizar</button>

          </form>
        </div>
      </Modal>
    </>
  )
}

export default ProfileTrainer
