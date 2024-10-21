import { useEffect, useState } from 'react'
import { readUserAsync } from '../../redux/slices/userSlice';
import { Card, Container, ContainerForm, ContainerMostrar, ContainerOpcionesCard, ImagenCard, Titulo, TituloCard } from '../../styles/dashboardAdminStyled';
import { FaRegEye } from 'react-icons/fa6';

import { bold, familyFont, firstColor, medium, regular, secondColor, thirdColor } from '../../styles/styleSheet';
import { Modal } from 'antd';
import { FaUserCircle } from 'react-icons/fa';

const ManageUser = () => {

  const [listUser, setListUser]: any = useState([])
  const [userSeleted, setUserSeleted]: any = useState(null)

  const [isModalOpen, setIsModalOpen] = useState([false, false]);

  const toggleModal = (idx: number, target: boolean) => {
    setIsModalOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };


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

  //mostrar modal para ver info user--------------------------------
  const handleViewUser = (user: any) => {
    toggleModal(0, true)
    setUserSeleted(user)
  }
  //----------------------------------------------------------------

  return (
    <>
      <Container>

        <ContainerForm>
          <Titulo>Usuarios</Titulo>
        </ContainerForm>
        <ContainerMostrar>
          {
            listUser.map((user: any, index: number) => (
              <Card key={index}>
                <TituloCard>{user.displayName}</TituloCard>
                {
                  user?.photoURL == "" ?
                    <FaUserCircle style={{ fontSize: "150px", margin: "5px 0", color: secondColor }} />
                    : <ImagenCard src={user.photoURL} alt={user.displayName} referrerPolicy="no-referrer" />
                }
                <ContainerOpcionesCard>
                  <FaRegEye onClick={() => handleViewUser(user)} style={{ fontSize: "23px", margin: "0 5px", color: thirdColor }} />
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
            <h2 style={{ fontSize: "35px", fontFamily: familyFont, margin: "10px 0", fontWeight: bold }}>{userSeleted?.displayName}</h2>
            {
              userSeleted?.photoURL == "" ?
                <FaUserCircle style={{ fontSize: "150px", margin: "5px 0", color: firstColor }} />
                : <img style={{ width: "200px", border: "0", borderRadius: "50%", margin: "10px 0" }} src={userSeleted?.photoURL} alt={userSeleted?.displayName} referrerPolicy="no-referrer" />
            }
            <div style={{ border: "1px solid #4DA1C0", borderRadius: "20px", width: "90%", height: "fit-content", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "10px 0" }}>
              <h3 style={{ fontSize: "20px", fontFamily: familyFont, fontWeight: bold, borderBottom: "1px solid" }}>Informacion del usuario</h3>
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

export default ManageUser
