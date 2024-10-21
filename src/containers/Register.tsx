import { useFormik } from "formik";
import * as Yup from 'yup'
import { ButtonRegister, ContainerIrLogin, ContainerOtrosInicios, ContainerRegister, ContainerTitulo, FormRegister, Inicios, InputRegister, LogoRegister, MensajeErrorRegister, OptionSelectRegister, OtrosInicios, SelectRegister, TextoIrLogin1, TextoIrLogin2, TituloOtrosInicios, TituloRegister } from "../styles/registerStyled";
import logo from "../assets/logo 3.png"
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, facebook, google } from "../firebase/FirebaseConfig";
import { createUserDb, login, mailUserRegister, obtenerDataUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { thirdColor } from "../styles/styleSheet";

interface FormRegister {
  fullName: string;
  email: string;
  phoneNumber: string;
  sex: string;
  age: string;
  password: string;
}

const Register = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const formik = useFormik<FormRegister>({
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      sex: '',
      age: '',
      password: '',
    },
    onSubmit: async (values) => {
      mailUserRegister(values.email, values.password, values.fullName, values.phoneNumber, values.sex, values.age).then(() => {
        formik.resetForm()
        navigate("/login")
      })
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(30, 'El nombre no puede superar los 30 caracteres')
        .required('El nombre es requerido'),
      email: Yup.string()
        .email('Ingrese un email válido')
        .required('El correo electronico es requerido'),
      phoneNumber: Yup.string()
        .required('El numero celular es requerido')
        .min(10, 'El numero celular no debe tener menos de 10 digitos')
        .max(10, 'El numero celular no debe tener mas de 10 digitos'),
      sex: Yup.string().required('El sexo es requerido'),
      age: Yup.number().required('La edad es requerido'),
      password: Yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .max(10, 'La contraseña no puede superar los 10 caracteres')
        .matches(/(?=.*\d)/, 'La contraseña debe tener al menos un número')
        .matches(/(?=.*[a-z])/, 'La contraseña debe tener al menos una letra minúscula')
        .matches(/(?=.*[A-Z])/, 'La contraseña debe tener al menos una letra mayúscula')
        .required('La contraseña es requerida'),
    }),
  })

  const handleAuth = async (type: string) => {
    switch (type) {
      case 'google':
        try {
          const result = await signInWithPopup(auth, google)
          const userGoogle = result.user

          if (result) {
            obtenerDataUser(userGoogle.uid).then((data: any) => {
              if (data != null) {
                dispatch(login({
                  uid: userGoogle.uid,
                  displayName: userGoogle.displayName,
                  email: userGoogle.email,
                  photoURL: userGoogle.photoURL,
                  phoneNumber: data.phoneNumber,
                  sex: data.sex,
                  age: data.age,
                  favorites: data.favorites,
                  trainer: data.trainer,
                  isAuthenticated: false,
                  rol: data.rol
                }))
              } else {
                const userData = {
                  id: userGoogle.uid,
                  displayName: userGoogle.displayName,
                  email: userGoogle.email,
                  photoURL: userGoogle.photoURL,
                  phoneNumber: userGoogle.phoneNumber,
                  sex: "",
                  age: "",
                  favorites: [],
                  trainer: "",
                  isAuthenticated: false,
                  rol: "user"
                }
                createUserDb(userGoogle.uid, userData)
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Te has registrado correctamente",
                  showConfirmButton: false,
                  timer: 3000
                });

                dispatch(login({
                  uid: userData.id,
                  displayName: userData.displayName,
                  email: userData.email,
                  photoURL: userData.photoURL,
                  phoneNumber: userData.phoneNumber,
                  sex: userData.sex,
                  age: userData.age,
                  favorites: userData.favorites,
                  trainer: userData.trainer,
                  isAuthenticated: false,
                  rol: userData.rol
                }))
              }
            })
          }
        } catch (error) {
          console.error(error)
        }
        navigate("/validation")
        break;

      case 'facebook':
        try {
          const result = await signInWithPopup(auth, facebook)
          const userFacebook = result.user

          if (result) {
            obtenerDataUser(userFacebook.uid).then((data: any) => {
              if (data != null) {
                dispatch(login({
                  uid: userFacebook.uid,
                  displayName: userFacebook.displayName,
                  email: userFacebook.email,
                  photoURL: userFacebook.photoURL,
                  phoneNumber: data.phoneNumber,
                  sex: data.sex,
                  age: data.age,
                  favorites: data.favorites,
                  trainer: data.trainer,
                  isAuthenticated: false,
                  rol: data.rol
                }))
              } else {
                const userData = {
                  id: userFacebook.uid,
                  displayName: userFacebook.displayName,
                  email: userFacebook.email,
                  photoURL: userFacebook.photoURL,
                  phoneNumber: userFacebook.phoneNumber,
                  sex: "",
                  age: "",
                  favorites: [],
                  trainer: "",
                  isAuthenticated: false,
                  rol: "user"
                }
                createUserDb(userFacebook.uid, userData)
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Te has registrado correctamente",
                  showConfirmButton: false,
                  timer: 3000
                });

                dispatch(login({
                  uid: userData.id,
                  displayName: userData.displayName,
                  email: userData.email,
                  photoURL: userData.photoURL,
                  phoneNumber: userData.phoneNumber,
                  sex: userData.sex,
                  age: userData.age,
                  favorites: userData.favorites,
                  trainer: userData.trainer,
                  isAuthenticated: false,
                  rol: userData.rol
                }))
              }
            })
          }
        } catch (error) {
          console.error(error)
        }
        navigate("/validation")
        break;

      default:
        break
    }
  }

  return (
    <>
      <ContainerRegister>
        <ContainerTitulo>
          <LogoRegister src={logo} />
          <TituloRegister>Registrarse</TituloRegister>
        </ContainerTitulo>

        <FormRegister onSubmit={formik.handleSubmit}>
          <InputRegister
            name="fullName"
            type="text"
            placeholder="Nombre completo"
            onChange={formik.handleChange}
            value={formik.values.fullName}
            onBlur={formik.handleBlur}
          />
          {formik.touched && formik.touched.fullName ? (
            <MensajeErrorRegister>{formik.errors.fullName}</MensajeErrorRegister>
          ) : null}

          <InputRegister
            name="email"
            type="text"
            placeholder="Correo Electronico"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched && formik.touched.email ? (
            <MensajeErrorRegister>{formik.errors.email}</MensajeErrorRegister>
          ) : null}

          {/* ------------------------------------------------------------------------------- */}
          <InputRegister
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
          <SelectRegister
            name="sex"
            onChange={formik.handleChange}
            value={formik.values.sex}
            onBlur={formik.handleBlur}
          >
            <OptionSelectRegister value="">Seleccione sexo</OptionSelectRegister>
            <OptionSelectRegister value="femenino">Femenino</OptionSelectRegister>
            <OptionSelectRegister value="masculino">Masculino</OptionSelectRegister>
            <OptionSelectRegister value="otro">Otro</OptionSelectRegister>
          </SelectRegister>
          {formik.touched && formik.touched.sex ? (
            <MensajeErrorRegister>{formik.errors.sex}</MensajeErrorRegister>
          ) : null}
          <InputRegister
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

          {/* ------------------------------------------------------------------------------- */}

          <InputRegister
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

          <ButtonRegister type="submit">Registrarse</ButtonRegister>
        </FormRegister>

        <ContainerOtrosInicios>
          <TituloOtrosInicios style={{color: thirdColor}}>Iniciar sesión con</TituloOtrosInicios>
          <OtrosInicios>
            <Inicios onClick={() => handleAuth('google')}><GoogleOutlined style={{ fontSize: 35, color: thirdColor }} /></Inicios>
            <Inicios onClick={() => handleAuth('facebook')}><FacebookOutlined style={{ fontSize: 35, color: thirdColor }} /></Inicios>
          </OtrosInicios>
        </ContainerOtrosInicios>

        <ContainerIrLogin>
          <TextoIrLogin1> ¿Ya tienes una cuenta? </TextoIrLogin1>
          <TextoIrLogin2 onClick={() => { navigate("/login") }}> Inicia sesión </TextoIrLogin2>
        </ContainerIrLogin>

      </ContainerRegister>
    </>
  )
}

export default Register
