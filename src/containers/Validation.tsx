import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../redux/slices/userSlice'
import codigoRandom from '../helpers/random'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useEffect, useState } from 'react';
import { BotonValidation, ContainerFormValidation, ContainerInput, ContainerReenviarCodigo, ContainerTextoInfo, ContainerValidation, InputValidation, LogoValidation, TextInfo, TextoReenviarCodigo, TituloValidation } from '../styles/validationStyled';
import { ContainerTitulo } from '../styles/loginStyled';
import logo from "../assets/logo 3.png"
import { loginTrainer } from '../redux/slices/trainerSlice';
import { loginAdmin } from '../redux/slices/adminSlice';

interface FormValidation {
    numb1: string;
    numb2: string;
    numb3: string;
    numb4: string;
}

const Validation = () => {
    const [contador, setContador] = useState(0)
    const [elCodigo, setElCodigo] = useState(codigoRandom())
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((store: any) => store.user)
    const trainer = useSelector((store: any) => store.trainer)
    const admin = useSelector((store: any) => store.admin)

    let elCorreo: string
    if (user.uid != null) {
         elCorreo = user.email;
    } else if (trainer.uid != null) {
        elCorreo = trainer.email;
    } else if (admin.uid != null) {
        elCorreo = admin.email;
    }

    useEffect(() => {
        console.log(elCodigo, elCorreo)
    }, [elCodigo]);

    const autenticatedUser = () => {
        dispatch(login({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            phoneNumber: user.phoneNumber,
            sex: user.sex,
            age: user.age,
            favorites: user.favorites,
            trainer: user.trainer,
            isAuthenticated: true,
            rol: user.rol
        }))
    }

    const autenticatedTrainer = () => {
        dispatch(loginTrainer({
            uid: trainer.uid,
            displayName: trainer.displayName,
            email: trainer.email,
            photoURL: trainer.photoURL,
            phoneNumber: trainer.phoneNumber,
            sex: trainer.sex,
            age: trainer.age,
            asesorados: trainer.asesorados,
            isAuthenticated: true,
            rol: trainer.rol
        }))
    }

    const autenticatedAdmin = () => {
        dispatch(loginAdmin({
            uid: admin.uid,
            displayName: admin.displayName,
            email: admin.email,
            photoURL: admin.photoURL,
            isAuthenticated: true,
            rol: admin.rol
        }))
    }

    const formik = useFormik<FormValidation>({
        initialValues: {
            numb1: "",
            numb2: "",
            numb3: "",
            numb4: ""
        },
        onSubmit: (values) => {
            const codigoIngresado = (values.numb1 + values.numb2 + values.numb3 + values.numb4)
            if (elCodigo == codigoIngresado) {
                alert("codigo correcto")

                if (user.uid != null) {
                    autenticatedUser()
                    navigate("/dashboard/" + user.rol + "/" + user.displayName + "/*")
                } else if (trainer.uid != null) {
                    autenticatedTrainer()
                    navigate("/dashboard/" + trainer.rol + "/" + trainer.displayName + "/*")
                } else if (admin.uid != null) {
                    autenticatedAdmin()
                    navigate("/dashboard/" + admin.rol + "/" + admin.displayName + "/*")
                }

            } else if (elCodigo != codigoIngresado && contador >= 3) {
                alert("codigo incorrecto, has agotado todos tus intentos")
                navigate('/login')
            } else if (elCodigo != codigoIngresado) {
                alert("codigo incorrect, tienes " + (3 - contador) + " intentos")
                setContador(contador + 1)
            }
        },
        validationSchema: Yup.object({
            numb1: Yup.number().required("Ingrese un número").max(9).min(0),
            numb2: Yup.number().required("Ingrese un número").max(9).min(0),
            numb3: Yup.number().required("Ingrese un número").max(9).min(0),
            numb4: Yup.number().required("Ingrese un número").max(9).min(0),
        })
    })

    const handleOnKeyUp = (e: React.KeyboardEvent) => {
        let elemento = e.target as HTMLInputElement
        let nombreInput1
        if (elemento.name == "numb1" && (elemento.value.length == elemento.maxLength)) {
            nombreInput1 = (elemento.parentNode?.childNodes[1] as HTMLElement)
            nombreInput1?.focus()
        } else if (elemento.name === "numb2" && (elemento.value.length === elemento.maxLength)) {
            nombreInput1 = (elemento.parentNode?.childNodes[2] as HTMLElement)
            nombreInput1?.focus()
        } else if (elemento.name === "numb3" && (elemento.value.length === elemento.maxLength)) {
            nombreInput1 = (elemento.parentNode?.childNodes[3] as HTMLElement)
            nombreInput1?.focus()
        } else if (elemento.name === "numb4" && (elemento.value.length === elemento.maxLength)) {
            // validateCode()
        }
    }

    const reenviarCodigo = () => {
        setElCodigo(codigoRandom())
        setContador(0)
    }

    return (
        <>
            <ContainerValidation>
                <ContainerTitulo>
                    <LogoValidation src={logo} />
                    <TituloValidation>Verificación</TituloValidation>
                </ContainerTitulo>

                <ContainerTextoInfo>
                    <TextInfo>Introduzca el código de cuatro dígitos</TextInfo>
                    <TextInfo>enviado a su correo</TextInfo>
                </ContainerTextoInfo>
                <ContainerFormValidation onSubmit={formik.handleSubmit}>
                    <ContainerInput>
                        <InputValidation
                            name="numb1"
                            type='text'
                            onChange={formik.handleChange}
                            value={formik.values.numb1}
                            onBlur={formik.handleBlur}
                            onKeyUp={handleOnKeyUp}
                            maxLength={1}
                        />
                        <InputValidation
                            name="numb2"
                            type='text'
                            onChange={formik.handleChange}
                            value={formik.values.numb2}
                            onBlur={formik.handleBlur}
                            onKeyUp={handleOnKeyUp}
                            maxLength={1}
                        />
                        <InputValidation
                            name="numb3"
                            type='text'
                            onChange={formik.handleChange}
                            value={formik.values.numb3}
                            onBlur={formik.handleBlur}
                            onKeyUp={handleOnKeyUp}
                            maxLength={1}
                        />
                        <InputValidation
                            name="numb4"
                            type='text'
                            onChange={formik.handleChange}
                            value={formik.values.numb4}
                            onBlur={formik.handleBlur}
                            onKeyUp={handleOnKeyUp}
                            maxLength={1}
                        />
                    </ContainerInput>
                    <ContainerReenviarCodigo>
                        <TextInfo> Código no recibido
                            <TextoReenviarCodigo onClick={() => { reenviarCodigo() }}> ¿Enviar de nuevo? </TextoReenviarCodigo>
                        </TextInfo>
                    </ContainerReenviarCodigo>

                    <BotonValidation type="submit">verificar codigo</BotonValidation>
                </ContainerFormValidation>
            </ContainerValidation>

        </>
    )
}

export default Validation
