import { Route, Routes, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import HomeAdmin from "../components/components dashboardAdmin/HomeAdmin"
import ManageTrainer from "../components/components dashboardAdmin/ManageTrainer"
import ManageUser from "../components/components dashboardAdmin/ManageUser"
import ProfileAdmin from "../components/components dashboardAdmin/ProfileAdmin"
import { Navbar, NavbarIconsItems, NavbarTituloItems } from "../styles/dashboardAdminStyled"
import { FaUser } from "react-icons/fa";
import { BiMaleFemale } from "react-icons/bi";
import { FaDumbbell } from "react-icons/fa6";
import { BiSolidNotepad } from "react-icons/bi";
import { thirdColor } from "../styles/styleSheet"

const DashBoardAdmin = () => {

  const navigate = useNavigate()
  const admin = useSelector((store: any) => store.admin)


  return (
    <>
      <Routes>
        <Route path="/*" element={<HomeAdmin />} />
        <Route path="/manage-trainer" element={<ManageTrainer />} />
        <Route path="/manage-user" element={<ManageUser />} />
        <Route path="/profile" element={<ProfileAdmin />} />
      </Routes>

      <Navbar>
        <NavbarIconsItems onClick={() => { navigate("/dashboard/" + admin.rol + "/" + admin.displayName + "/*") }}>
          <BiSolidNotepad style={{ fontSize: '25px', color: thirdColor }} />
          <NavbarTituloItems>Ejercicios</NavbarTituloItems>
        </NavbarIconsItems>
        <NavbarIconsItems onClick={() => { navigate("/dashboard/" + admin.rol + "/" + admin.displayName + "/manage-trainer") }}>
          <FaDumbbell style={{ fontSize: '25px', color: thirdColor }} />
          <NavbarTituloItems>Entrenadores</NavbarTituloItems>
        </NavbarIconsItems>
        <NavbarIconsItems onClick={() => { navigate("/dashboard/" + admin.rol + "/" + admin.displayName + "/manage-user") }}>
          <BiMaleFemale style={{ fontSize: '25px', color: thirdColor }} />
          <NavbarTituloItems>Usuarios</NavbarTituloItems>
        </NavbarIconsItems>
        <NavbarIconsItems onClick={() => { navigate("/dashboard/" + admin.rol + "/" + admin.displayName + "/profile") }}>
          <FaUser style={{ fontSize: '25px', color: thirdColor }} />
          <NavbarTituloItems>Perfil</NavbarTituloItems>
        </NavbarIconsItems>
      </Navbar>
    </>
  )
}

export default DashBoardAdmin
