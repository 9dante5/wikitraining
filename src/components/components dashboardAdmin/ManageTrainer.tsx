import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup'
import { BotonDashboardAdmin, Card, Container, ContainerForm, ContainerMostrar, ContainerOpcionesCard, FormDashboardAdmin, ImagenCard, InputDashboardAdmin, LabelUpload, OptionSelectDashboardAdmin, SelectDashboardAdmin, Titulo, TituloCard, Upload } from "../../styles/dashboardAdminStyled";
import { FaPlus, FaRegEye } from "react-icons/fa6";
import { uploadFile } from "../../helpers/cloudinary";
import Swal from "sweetalert2";
import { MensajeErrorRegister } from "../../styles/registerStyled";
import { mailTrainerRegister, readTrainerAsync } from "../../redux/slices/trainerSlice";
import { bold, familyFont, firstColor, medium, regular, thirdColor } from "../../styles/styleSheet";
import { Modal, Result } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import { readUserAsync } from "../../redux/slices/userSlice";
import { FaUserCircle } from "react-icons/fa";


interface FormTrainer {
  displayname: string;
  email: string;
  photoURL: string;
  phoneNumber: string;
  sex: string;
  age: string;
  password: string;
}

const ManageTrainer = () => {

  const [photoTrainer, setPhotoTrainer]: any = useState("")
  const [disabled, setDisabled]: any = useState(0)
  const [listTrainers, setListTrainer]: any = useState([])
  const [trainerSeleted, setTrainerSeleted]: any = useState(null)
  const [listAsesorados, setListAsesorados]: any = useState([])
  const [listUser, setListUser]: any = useState([])
  const [userSeleted, setUserSeleted]: any = useState(null)
  const [isModalOpen2, setIsModalOpen2] = useState([false, false]);

  const [isModalOpen, setIsModalOpen] = useState([false, false]);

  const toggleModal = (idx: number, target: boolean) => {
    setIsModalOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };

  const toggleModal2 = (idx: number, target: boolean) => {
    setIsModalOpen2((p) => {
      p[idx] = target;
      return [...p];
    });
  };

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

  //formik registrar trainer ---------------------------------------
  const formik = useFormik<FormTrainer>({
    initialValues: {
      displayname: "",
      email: "",
      photoURL: "",
      phoneNumber: "",
      sex: "",
      age: "",
      password: "",
    },
    onSubmit: async (values) => {
      await mailTrainerRegister(values.email, values.password, photoTrainer, values.displayname, values.phoneNumber, values.sex, values.age)
      formik.resetForm()
      setDisabled(0)
    },
    validationSchema: Yup.object({
      displayname: Yup.string()
        .required('El nombre es requerido'),
      email: Yup.string()
        .email('Ingrese un email válido')
        .required('El correo electronico es requerido'),
      phoneNumber: Yup.string()
        .required('El numero celular es requerido')
        .min(10, 'El numero celular no debe tener menos de 10 digitos')
        .max(10, 'El numero celular no debe tener mas de 10 digitos'),
      sex: Yup.string().required('El sexo es requerido'),
      age: Yup.number()
        .required('La edad es requerido')
        .min(18, 'El entrenador(a) no puede ser menor de edad')
        .max(70, 'El entrenador(a) no puede tener mas de 70 años'),
      password: Yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .max(10, 'La contraseña no puede superar los 10 caracteres')
        .matches(/(?=.*\d)/, 'La contraseña debe tener al menos un número')
        .matches(/(?=.*[a-z])/, 'La contraseña debe tener al menos una letra minúscula')
        .matches(/(?=.*[A-Z])/, 'La contraseña debe tener al menos una letra mayúscula')
        .required('La contraseña es requerida'),
    }),
  })
  //----------------------------------------------------------------

  //------------esto es para cargar las imagenes a la nube----------
  const handleUpload = async (e: any) => {
    const files = e.target.files
    uploadFile(files[0]).then((resp) =>
      setPhotoTrainer(resp[0]) +
      setDisabled(resp[1]) +
      Toast.fire({ icon: 'success', title: 'foto cargada correctamente' })
    )
  }
  //----------------------------------------------------------------

  //cargar entrenadores ------------------------------------------
  async function handleTrainers() {
    await readTrainerAsync().then((resp) => {
      setListTrainer(resp)
    })
  }

  useEffect(() => {
    handleTrainers()
  }, [disabled])
  //----------------------------------------------------------------
  //cargar usuarios ------------------------------------------
  async function handleUser() {
    await readUserAsync().then((resp) => {
      setListUser(resp)
    })
  }

  useEffect(() => {
    handleUser()
  }, [])
  //----------------------------------------------------------------
  //cargar lista asesorados--------------------------------
  function cargarAsesorados(asesorados: any) {

    let favoritos: any[] = []

    asesorados.map((idEjercicio: any) => {
      favoritos.push(listUser.find((e: any) => e.id == idEjercicio))
      // favoritos.push(ejercicio)
    })

    setListAsesorados(favoritos)
  }
  //--------------------------------------------------------
  //mostrar modal para ver info trainer--------------------------------
  const handleViewTrainer = (trainer: any) => {
    toggleModal(0, true)
    setTrainerSeleted(trainer)
    cargarAsesorados(trainer.asesorados)
  }
  //----------------------------------------------------------------
  //mostrar modal para ver info user--------------------------------
  const handleViewUser2 = (user: any) => {
    toggleModal2(0, true)
    setUserSeleted(user)
  }
  //----------------------------------------------------------------

  return (
    <>
      <Container>

        <ContainerForm>
          <Titulo>Registrar entrenador</Titulo>
          <FormDashboardAdmin onSubmit={formik.handleSubmit}>
            <LabelUpload>
              <FaPlus style={{ margin: "10px 0", fontSize: "30px" }} />
              Agregar foto
              <Upload
                name="photoURL"
                type="file"
                accept=".jpg, .jpeg, .png, .webp"
                onChange={handleUpload}
                value={formik.values.photoURL}
                onBlur={formik.handleBlur}
              />
            </LabelUpload>
            <InputDashboardAdmin
              name="displayname"
              type="text"
              placeholder="Nombre entrenador"
              onChange={formik.handleChange}
              value={formik.values.displayname}
              onBlur={formik.handleBlur}
            />
            {formik.touched && formik.touched.displayname ? (
              <MensajeErrorRegister>{formik.errors.displayname}</MensajeErrorRegister>
            ) : null}
            <InputDashboardAdmin
              name="email"
              type="text"
              placeholder="Correo electrónico"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {formik.touched && formik.touched.email ? (
              <MensajeErrorRegister>{formik.errors.email}</MensajeErrorRegister>
            ) : null}
            <InputDashboardAdmin
              name="phoneNumber"
              type="number"
              placeholder="Numero celular"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
              onBlur={formik.handleBlur}
            />
            {formik.touched && formik.touched.phoneNumber ? (
              <MensajeErrorRegister>{formik.errors.phoneNumber}</MensajeErrorRegister>
            ) : null}
            <SelectDashboardAdmin
              name="sex"
              onChange={formik.handleChange}
              value={formik.values.sex}
              onBlur={formik.handleBlur}
            >
              <OptionSelectDashboardAdmin value="">Seleccione sexo</OptionSelectDashboardAdmin>
              <OptionSelectDashboardAdmin value="femenino">Femenino</OptionSelectDashboardAdmin>
              <OptionSelectDashboardAdmin value="masculino">Masculino</OptionSelectDashboardAdmin>
            </SelectDashboardAdmin>
            {formik.touched && formik.touched.sex ? (
              <MensajeErrorRegister>{formik.errors.sex}</MensajeErrorRegister>
            ) : null}
            <InputDashboardAdmin
              name="age"
              type="number"
              placeholder="Ingresa la edad"
              onChange={formik.handleChange}
              value={formik.values.age}
              onBlur={formik.handleBlur}
            />
            {formik.touched && formik.touched.age ? (
              <MensajeErrorRegister>{formik.errors.age}</MensajeErrorRegister>
            ) : null}
            <InputDashboardAdmin
              name="password"
              type="password"
              placeholder="Contraseña"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {formik.touched && formik.touched.password ? (
              <MensajeErrorRegister>{formik.errors.password}</MensajeErrorRegister>
            ) : null}
            <BotonDashboardAdmin type="submit" disabled={disabled == 200 ? false : true} >Registrar entrenador</BotonDashboardAdmin>
          </FormDashboardAdmin>
        </ContainerForm>


        <ContainerMostrar>
          {
            listTrainers.map((trainer: any, index: number) => (
              <Card key={index}>
                <TituloCard>{trainer.displayName}</TituloCard>
                <ImagenCard src={trainer.photoURL} alt={trainer.displayName} />
                <ContainerOpcionesCard>
                  <FaRegEye onClick={() => handleViewTrainer(trainer)} style={{ fontSize: "23px", margin: "0 5px", color: thirdColor }} />
                  {/* <BiEdit onClick={() => console.log(trainerSeleted)} style={{ fontSize: "23px", margin: "0 5px", color: thirdColor }} /> */}
                </ContainerOpcionesCard>
              </Card>
            ))
          }
        </ContainerMostrar>


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
              <p style={{ fontFamily: familyFont, fontWeight: medium, fontSize: "16px" }}> Correo electrónico:
                <a style={{ fontWeight: regular, textDecoration: "none", color: firstColor, fontSize: "14px" }} href={"mailto:m." + trainerSeleted?.email}> {trainerSeleted?.email} </a>
              </p>
              <p style={{ fontFamily: familyFont, fontWeight: medium, fontSize: "16px" }}> Numero celular:
                <a style={{ fontWeight: regular, textDecoration: "none", color: firstColor, fontSize: "14px" }} href={"https://api.whatsapp.com/send?phone=57" + trainerSeleted?.phoneNumber} target="_blank"> +57 {trainerSeleted?.phoneNumber} </a>
              </p>
              <p style={{ fontFamily: familyFont, fontWeight: medium, fontSize: "16px" }}> Sexo:
                <span style={{ fontWeight: regular, color: firstColor, fontSize: "14px" }}> {trainerSeleted?.sex} </span>
              </p>
              <p style={{ fontFamily: familyFont, fontWeight: medium, fontSize: "16px" }}> Edad:
                <span style={{ fontWeight: regular, color: firstColor, fontSize: "14px" }}> {trainerSeleted?.age} </span>
              </p>
            </div>

            <div style={{ width: "100%", height: "fit-content", margin: "10px 0", display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", alignItems: "center", justifyContent: "center" }}>
              {
                trainerSeleted?.asesorados.length == 0 ?
                  <Result
                    icon={<FrownOutlined />}
                    title="Este entrenador no tiene usuarios asesorados..."
                  />
                  :

                  listAsesorados.map((asesorado: any, index: number) => (
                    <Card key={index}>
                      <TituloCard style={{color: firstColor}}>{asesorado.displayName}</TituloCard>
                      {
                        asesorado?.photoURL == "" ?
                          <FaUserCircle style={{ fontSize: "150px", margin: "5px 0", color: firstColor }} />
                          : <ImagenCard src={asesorado.photoURL} alt={asesorado.displayName} referrerPolicy="no-referrer" />
                      }
                      <ContainerOpcionesCard>
                        <FaRegEye onClick={() => handleViewUser2(asesorado)} style={{ fontSize: "23px", margin: "0 5px", color: firstColor }} />
                      </ContainerOpcionesCard>
                    </Card>
                  ))

              }
            </div>
          </div>
        </Modal>

        <Modal
          open={isModalOpen2[0]}
          onOk={() => toggleModal2(0, false)}
          onCancel={() => toggleModal2(0, false)}
          footer=""
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h2 style={{ fontSize: "35px", fontFamily: familyFont, margin: "10px 0", fontWeight: bold, color: firstColor }}>{userSeleted?.displayName}</h2>

            {
              userSeleted?.photoURL == "" ?
                <FaUserCircle style={{ fontSize: "150px", margin: "5px 0", color: firstColor }} />
                : <img style={{ width: "200px", height: "200px", border: "0", borderRadius: "50%", margin: "10px 0" }} src={userSeleted?.photoURL} alt={userSeleted?.displayName} referrerPolicy="no-referrer" />
            }

            <div style={{ border: "1px solid #4DA1C0", borderRadius: "20px", width: "90%", height: "fit-content", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "10px 0" }}>
              <h3 style={{ fontSize: "20px", fontFamily: familyFont, fontWeight: bold, borderBottom: "1px solid" }}>Informacion del entrenador</h3>
              <p style={{ fontFamily: familyFont, fontWeight: medium, fontSize: "16px" }}> Correo electrónico:
                <a style={{ fontWeight: regular, textDecoration: "none", color: firstColor, fontSize: "14px" }} href={"mailto:m." + userSeleted?.email}> {userSeleted?.email} </a>
              </p>
              <p style={{ fontFamily: familyFont, fontWeight: medium, fontSize: "16px" }}> Numero celular:
                <a style={{ fontWeight: regular, textDecoration: "none", color: firstColor, fontSize: "14px" }} href={"https://api.whatsapp.com/send?phone=57" + userSeleted?.phoneNumber} target="_blank"> +57 {userSeleted?.phoneNumber} </a>
              </p>
              <p style={{ fontFamily: familyFont, fontWeight: medium, fontSize: "16px" }}> Sexo:
                <span style={{ fontWeight: regular, color: firstColor, fontSize: "14px" }}> {userSeleted?.sex} </span>
              </p>
              <p style={{ fontFamily: familyFont, fontWeight: medium, fontSize: "16px" }}> Edad:
                <span style={{ fontWeight: regular, color: firstColor, fontSize: "14px" }}> {userSeleted?.age} </span>
              </p>
            </div>
          </div>
        </Modal>

      </Container>
    </>
  )
}

export default ManageTrainer
