import { useDispatch, useSelector } from 'react-redux'
import { BotonDashboardAdmin, Container, ContainerForm, ImagenCard, InputDashboardAdmin } from '../../styles/dashboardAdminStyled'
import { FaUserCircle } from 'react-icons/fa'
import { logoutAdmin } from '../../redux/slices/adminSlice'
import { secondColor } from '../../styles/styleSheet'
import { signOut } from "firebase/auth";
import { auth } from '../../firebase/FirebaseConfig'

const ProfileAdmin = () => {

  const dispatch = useDispatch()
  const admin = useSelector((store: any) => store.admin)

  const signOutAdmin = () => {
    dispatch(logoutAdmin())
    signOut(auth).then(() => {
    }).catch((error) => {console.error(error)})
  }

  return (
    <>
      <Container>
        <ContainerForm>
          {
            admin?.photoURL == null ?
              <FaUserCircle style={{ fontSize: "150px", margin: "5px 0", color: secondColor }} />
              : <ImagenCard src={admin.photoURL} alt={admin.displayName} referrerPolicy="no-referrer" />
          }
          <InputDashboardAdmin
            value={admin.displayName}
            disabled={true}
          />
          <InputDashboardAdmin
            value={admin.email}
            disabled={true}
          />
          <BotonDashboardAdmin onClick={() => { signOutAdmin() }} > Cerrar sesion</BotonDashboardAdmin>

        </ContainerForm>
      </Container>

    </>
  )
}

export default ProfileAdmin
