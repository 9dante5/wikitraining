import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { ButtonLogin, ContainerIrRegister, ContainerLogin, FormLogin, InputLogin, LogoLogin, MensajeErrorLogin, TextoIrregister1, TextoIrRegister2, TituloLogin } from "../styles/loginStyled";
import { ContainerOtrosInicios, ContainerTitulo, Inicios, OtrosInicios, TituloOtrosInicios } from "../styles/registerStyled";
import logo from "../assets/logo 3.png"
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { createUserDb, login, obtenerDataUser } from "../redux/slices/userSlice";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, facebook, google } from "../firebase/FirebaseConfig";
import { loginTrainer, obtenerRolTrainer } from "../redux/slices/trainerSlice";
import { loginAdmin, obtenerDataAdmin } from "../redux/slices/adminSlice";
import Swal from "sweetalert2";
import { thirdColor } from "../styles/styleSheet";

interface FormLogin {
  email: string;
  password: string;
}

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const formik = useFormik<FormLogin>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await signInWithEmailAndPassword(auth, values.email, values.password)
        const dataTrainer: any = await obtenerRolTrainer(response.user.uid)
        const dataUser: any = await obtenerDataUser(response.user.uid)
        const dataAdmin: any = await obtenerDataAdmin(response.user.uid)

        if (response && dataTrainer.rol == "trainer") {
          dispatch(loginTrainer({
            uid: response.user.uid,
            displayName: response.user.displayName,
            email: response.user.email,
            photoURL: response.user.photoURL,
            phoneNumber: dataTrainer.phoneNumber,
            sex: dataTrainer.sex,
            age: dataTrainer.age,
            asesorados: dataTrainer.asesorados,
            isAuthenticated: true,
            rol: dataTrainer.rol
          }))
          navigate("/dashboard/" + dataTrainer.rol + "/" + dataTrainer.displayName + "/*")
        } else if (response && dataUser.rol == "user") {
          dispatch(login({
            uid: response.user.uid,
            displayName: response.user.displayName,
            email: response.user.email,
            photoURL: response.user.photoURL,
            phoneNumber: dataUser.phoneNumber,
            sex: dataUser.sex,
            age: dataUser.age,
            favorites: dataUser.favorites,
            trainer: dataUser.trainer,
            isAuthenticated: true,
            rol: dataUser.rol
          }))
          navigate("/dashboard/" + dataUser.rol + "/" + dataUser.displayName + "/*")
        } else if (response && dataAdmin.rol == "admin") {
          dispatch(loginAdmin({
            uid: response.user.uid,
            displayName: response.user.displayName,
            email: response.user.email,
            photoURL: response.user.photoURL,
            isAuthenticated: true,
            rol: dataAdmin.rol
          }))
          navigate("/dashboard/" + dataAdmin.rol + "/" + dataAdmin.displayName + "/*")
        }

      } catch (error) {
        console.error(error)
        alert("datos incorrectos")
      }
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Ingrese un email válido')
        .required('El correo electronico es requerido'),
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
                  displayName: data.displayName,
                  email: userGoogle.email,
                  photoURL: data.photoURL,
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
      <ContainerLogin>
        <ContainerTitulo>
          <LogoLogin src={logo} />
          <TituloLogin>Iniciar sesión</TituloLogin>
        </ContainerTitulo>

        <FormLogin onSubmit={formik.handleSubmit}>
          <InputLogin
            name="email"
            type="text"
            placeholder="Correo Electronico"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched && formik.touched.email ? (
            <MensajeErrorLogin>{formik.errors.email}</MensajeErrorLogin>
          ) : null}

          <InputLogin
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.touched && formik.touched.password ? (
            <MensajeErrorLogin>{formik.errors.password}</MensajeErrorLogin>
          ) : null}

          <ButtonLogin type="submit">Iniciar sesión</ButtonLogin>
        </FormLogin>

        <ContainerOtrosInicios>
          <TituloOtrosInicios style={{color: thirdColor}}>Iniciar sesión con</TituloOtrosInicios>
          <OtrosInicios>
            <Inicios onClick={() => handleAuth('google')}><GoogleOutlined style={{ fontSize: 35, color: thirdColor }} /></Inicios>
            <Inicios onClick={() => handleAuth('facebook')}><FacebookOutlined style={{ fontSize: 35, color: thirdColor }} /></Inicios>
          </OtrosInicios>
        </ContainerOtrosInicios>

        <ContainerIrRegister>
          <TextoIrregister1> ¿No tienes una cuenta? </TextoIrregister1>
          <TextoIrRegister2 onClick={() => { navigate("/register") }}> Regístrate </TextoIrRegister2>
        </ContainerIrRegister>

      </ContainerLogin>
    </>
  )
}

export default Login
