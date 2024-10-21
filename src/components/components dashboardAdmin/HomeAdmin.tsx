import { useFormik } from "formik";
import * as Yup from 'yup'
import {
  BotonDashboardAdmin,
  Card,
  Container,
  ContainerForm,
  ContainerMostrar,
  ContainerOpcionesCard,
  FormDashboardAdmin,
  GrupoMuscularCard,
  InputDashboardAdmin,
  LabelUpload,
  NombreGrupoMuscularCard,
  OptionSelectDashboardAdmin,
  SelectDashboardAdmin,
  TextareaDashBoardAdmin,
  Titulo,
  TituloCard,
  Upload
} from "../../styles/dashboardAdminStyled"
import { listaMusculos } from "../../helpers/constans";
import { useEffect, useState } from "react";
import { uploadFile } from "../../helpers/cloudinary";
import { FaPlus } from "react-icons/fa6";
import { createEjercicioAsync, deleteEjercicioAsync, readEjercicioAsync, setEjercicios } from "../../redux/slices/ejercicioSlice";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEye } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { bold, familyFont, light, secondColor, thirdColor } from "../../styles/styleSheet";
import { Modal } from "antd";

export interface FormEjercicio {
  id: string;
  videosEjercicio: string;
  nombreEjercicio: string;
  grupoMuscular: string;
  descripcionEjercicio: string;
}

interface FormEditEjercicio {
  videos: string;
  nombre: string;
  grupo: string;
  descripcion: string;
}

const HomeAdmin = () => {

  const dispatch = useDispatch()
  const ejercicios = useSelector((store: any) => store.ejercicio)
  const [urlVideos, setUrlVideos]: any = useState([])
  const [status, setStatus]: any = useState(0)
  const [ejercicioSelect, setEjercicioSelect]: any = useState({nombreEjercicio: 'Sentadilla con peso corporal', descripcionEjercicio: '1. Ponte de pie con los pies separados al ancho de…, sin rebotar ni impulsarte con demasiada fuerza.', grupoMuscular: 'Cuadriceps', id: 'be3f6109-2758-4c18-b69b-926660b69b22', videosEjercicio: Array(1)})

  const [arrayDescripcion, setArrayDescripcion]: any = useState([])

  const [isModalViewOpen, setIsModalViewOpen] = useState(false);
  // const [isModalViewOpen2, setIsModalViewOpen2] = useState(false);

  //--------funciones modal--------------------------------
  const handleCancel = () => {
    setIsModalViewOpen(false);
  };
  //----------------------------------------------------------------

  //--------funciones modal--------------------------------
  // const handleCancel2 = () => {
  //   setIsModalViewOpen2(false);
  // };
  //----------------------------------------------------------------

  //---------esto es para cargar los ejercicios en el redux---------
  async function handleData() {
    await readEjercicioAsync().then((resp) => {
      dispatch(setEjercicios(resp))
    })
  }

  useEffect(() => {
    handleData()
  }, [status])
  //----------------------------------------------------------------

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

  //-------este es el formik de crear ejercicio--------------------------------
  const formik = useFormik<FormEjercicio>({
    initialValues: {
      id: '',
      videosEjercicio: '',
      nombreEjercicio: '',
      grupoMuscular: '',
      descripcionEjercicio: '',
    },
    onSubmit: async (values) => {
      let ejercicioNuevo: FormEjercicio = {
        id: crypto.randomUUID(),
        videosEjercicio: urlVideos,
        nombreEjercicio: values.nombreEjercicio,
        grupoMuscular: values.grupoMuscular,
        descripcionEjercicio: values.descripcionEjercicio,

      }
      formik.resetForm()
      setStatus(0)

      await createEjercicioAsync(ejercicioNuevo)
    },
    validationSchema: Yup.object({
      nombreEjercicio: Yup.string().required('El nombre es requerido'),
      grupoMuscular: Yup.string().required('El grupo muscular es requerido'),
      descripcionEjercicio: Yup.string().required('La descripcion es requerida'),
    }),
  })
  //------------------------------------------------------------------------------------

  //-------este es el formik de editar ejercicio--------------------------------
  const formikEdit = useFormik<FormEditEjercicio>({
    initialValues: {
      videos: '',
      nombre: ejercicioSelect.nombreEjercicio,
      grupo: '',
      descripcion: '',
    },
    onSubmit: async (values) => {
      let ejercicioEdit: FormEjercicio = {
        id: ejercicioSelect.id,
        videosEjercicio: ejercicioSelect.videosEjercicio,
        nombreEjercicio: values.nombre,
        grupoMuscular: values.grupo,
        descripcionEjercicio: values.descripcion,

      }
      formikEdit.resetForm()
      setStatus(0)
      console.log(ejercicioEdit)

    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre es requerido'),
      grupo: Yup.string().required('El grupo muscular es requerido'),
      descripcion: Yup.string().required('La descripcion es requerida'),
    }),
  })
  //------------------------------------------------------------------------------------

  //------------esto es para cargar las imagenes a la nube----------
  const handleUpload = async (e: any) => {
    const files = e.target.files
    let listULR: string[] = []

    for (let i = 0; i < files.length; i++) {
      uploadFile(files[i]).then((resp) =>
        listULR.push(resp[0]) +
        setUrlVideos(listULR) +
        setStatus(resp[1])),
        Toast.fire({
          icon: 'success',
          title: 'Video agregado correctamente'
        })
    }
  }
  //----------------------------------------------------------------

  //------------esto es para cargar las imagenes a la nube cuando edite----------
  // const handleUploadEdit = async (e: any) => {
  //   const files = e.target.files
  //   let listULR: string[] = []

  //   for (let i = 0; i < files.length; i++) {
  //     uploadFile(files[i]).then((resp) =>
  //       listULR.push(resp[0]) +
  //       setUrlVideos(listULR) +
  //       setStatus(resp[1])),
  //       Toast.fire({
  //         icon: 'success',
  //         title: 'Video agregado correctamente'
  //       })
  //   }

  //   const videoEditado = {
  //     id: ejercicioSelect.id,
  //     videosEjercicio: listULR,
  //     nombreEjercicio: ejercicioSelect.nombreEjercicio,
  //     grupoMuscular: ejercicioSelect.grupoMuscular,
  //     descripcionEjercicio: ejercicioSelect.descripcionEjercicio,
  //   }

  //   setEjercicioSelect(videoEditado)
  // }
  //----------------------------------------------------------------

  //-----------esto es para visualizar el ejercicio en el modal-----
  const hendleView = (data: any) => {
    setEjercicioSelect(data)
    setArrayDescripcion(data.descripcionEjercicio.split("\n"))
    setIsModalViewOpen(true);
  }
  //----------------------------------------------------------------
  //esto es para editar un ejercicio------------------------
  // function handleOpenUpdateEjercicio(data: any) {
  //   setEjercicioSelect(data)
  //   setIsModalViewOpen2(true);
  // }
  //----------------------------------------------------------------


  //--------esto es para editar un ejercicio------------------------
  // async function edittingEjercicio() {
  //   const newData = {
  //     "id": "0159292d-9ec2-4607-b2f1-41a000949886",
  //     "nombreEjercicio": "ejercicio seis"
  //   }
  //   await updateEjercicioAsync(newData)
  // }
  //----------------------------------------------------------------
  //----esto es para eliminar un ejercicio------------------------
  async function deleteEjercicio(id: string) {
    await deleteEjercicioAsync(id)
    Swal.fire({
      title: "¡Ejercicio eliminado!",
      icon: "success"
    });
    setStatus(status - 1)
  }
  //----------------------------------------------------------------

  return (
    <>
      <Container>


        <ContainerForm>
          <Titulo>Agregar ejercicio</Titulo>
          <FormDashboardAdmin onSubmit={formik.handleSubmit}>
            <LabelUpload>
              <FaPlus style={{ margin: "10px 0", fontSize: "30px" }} />
              Agregar videos
              <Upload
                name="videoEjercicio"
                type="file"
                multiple
                accept=".mp4"
                placeholder="Nombre ejercicio"
                onChange={handleUpload}
                value={formik.values.videosEjercicio}
                onBlur={formik.handleBlur}
              />
            </LabelUpload>
            <InputDashboardAdmin
              name="nombreEjercicio"
              type="text"
              placeholder="Nombre ejercicio"
              onChange={formik.handleChange}
              value={formik.values.nombreEjercicio}
              onBlur={formik.handleBlur}
            />
            <SelectDashboardAdmin
              name="grupoMuscular"
              onChange={formik.handleChange}
              value={formik.values.grupoMuscular}
              onBlur={formik.handleBlur}
            >
              <OptionSelectDashboardAdmin value="">Seleccione grupo muscular</OptionSelectDashboardAdmin>
              {
                listaMusculos.map((musculo, index) => (
                  <OptionSelectDashboardAdmin key={index} value={musculo.nombreMusculo}>{musculo.nombreMusculo}</OptionSelectDashboardAdmin>
                ))
              }
            </SelectDashboardAdmin>
            <TextareaDashBoardAdmin
              name="descripcionEjercicio"
              placeholder="Descripcion ejercicio"
              onChange={formik.handleChange}
              value={formik.values.descripcionEjercicio}
              onBlur={formik.handleBlur}>

            </TextareaDashBoardAdmin>

            <BotonDashboardAdmin type="submit" disabled={status == 200 ? false : true}>Crear ejercicio</BotonDashboardAdmin>
          </FormDashboardAdmin>
        </ContainerForm>


        <ContainerMostrar>
          {
            ejercicios.ejercicios?.map((ejercicio: any) => (
              <Card key={ejercicio.id}>
                <TituloCard>{ejercicio.nombreEjercicio}</TituloCard>
                <GrupoMuscularCard>Musculo:
                  <NombreGrupoMuscularCard> {ejercicio.grupoMuscular} </NombreGrupoMuscularCard>
                </GrupoMuscularCard>
                <ContainerOpcionesCard>
                  <FaRegEye onClick={() => hendleView(ejercicio)} style={{ fontSize: "23px", margin: "0 5px", color: thirdColor }} />
                  {/* <BiEdit onClick={() => handleOpenUpdateEjercicio(ejercicio)} style={{ fontSize: "23px", margin: "0 5px", color: thirdColor }} /> */}
                  <IoTrashOutline onClick={() => deleteEjercicio(ejercicio.id)} style={{ fontSize: "23px", margin: "0 5px", color: thirdColor }} />
                </ContainerOpcionesCard>
              </Card>
            ))
          }
          {/* <Modal open={isModalViewOpen2} onCancel={handleCancel2} footer="">

            <ContainerForm>
              <Titulo style={{ color: firstColor }}>Editar ejercicio</Titulo>
              {
                ejercicioSelect.videosEjercicio?.map((video: string) => (
                  <video src={video} style={{ width: "100%", height: "fit-content", margin: "10px 0" }} controls>
                  </video>
                ))
              }
              <form onSubmit={formikEdit.handleSubmit}>
                <label>
                  {ejercicioSelect.nombreEjercicio}
                  <input
                    name="nombre"
                    type="text"
                    placeholder="Nombre ejercicio"
                    onChange={formikEdit.handleChange}
                    value={formikEdit.values.nombre}
                    onBlur={formikEdit.handleBlur}
                  />
                </label>
                {ejercicioSelect.grupoMuscular}
                <select
                  name="grupo"
                  onChange={formikEdit.handleChange}
                  value={formikEdit.values.grupo}
                  onBlur={formikEdit.handleBlur}
                >
                  <option value="">Seleccione grupo muscular</option>
                  {
                    listaMusculos.map((musculo, index) => (
                      <option key={index} value={musculo.nombreMusculo}>{musculo.nombreMusculo}</option>
                    ))
                  }
                </select>
                <label>
                  descripcion
                  <textarea
                    name="descripcion"
                    placeholder="Descripcion ejercicio"
                    onChange={formikEdit.handleChange}
                    value={formikEdit.values.descripcion}
                    onBlur={formikEdit.handleBlur}>

                  </textarea>
                </label>
                <button type="submit">ajajajajaa</button>
              </form>

            </ContainerForm>

            <button onClick={() => console.log(ejercicioSelect)}>boton</button>
          </Modal> */}
        </ContainerMostrar>


        <Modal open={isModalViewOpen} onCancel={handleCancel} width={1000} footer="">
          <div key={ejercicioSelect.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h2 key={ejercicioSelect.id} style={{ fontSize: "35px", fontFamily: familyFont, margin: "10px 0", fontWeight: bold, textAlign: "center" }}>{ejercicioSelect.nombreEjercicio}</h2>
            {
              ejercicioSelect.videosEjercicio?.map((video: string) => (
                <video src={video} style={{ width: "100%", height: "fit-content", margin: "10px 0" }} controls>
                </video>
              ))
            }
            <div style={{ width: "100%", margin: "10px 0", display: "flex", flexDirection: "column" }}>
              {
                arrayDescripcion.map((descripcion: any, index: any) => (
                  <div key={index} style={{ width: "95%", height: "fit-content", padding: "10px", paddingLeft: "10px", margin: "5px 0", backgroundColor: secondColor, border: "0", borderRadius: "12px" }}>
                    <p key={index} style={{ fontFamily: familyFont, fontSize: "20px", fontWeight: light, textAlign: "justify" }}> {descripcion} </p>
                  </div>
                ))
              }
            </div>
          </div>
        </Modal>
      </Container>

    </>
  )
}

export default HomeAdmin
