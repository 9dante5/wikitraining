import { Route, Routes, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Navbar, NavbarIconsItems, NavbarTituloItems } from "../styles/dashboardAdminStyled"
import { FaUser } from "react-icons/fa6"
import { BiMaleFemale, BiSolidNotepad } from "react-icons/bi"
import HomeTrainer from "../components/components dashboardTrainer/HomeTrainer"
import AsesoradosTrainer from "../components/components dashboardTrainer/AsesoradosTrainer"
import ProfileTrainer from "../components/components dashboardTrainer/ProfileTrainer"
import { thirdColor } from "../styles/styleSheet"

const DashBoardTrainer = () => {

  const navigate = useNavigate()
  const trainer = useSelector((store: any) => store.trainer)

  return (
    <>
      <Routes>
        <Route path="/*" element={<HomeTrainer />} />
        <Route path="/asesorados" element={<AsesoradosTrainer />} />
        <Route path="/profile" element={<ProfileTrainer />} />
      </Routes>

      <Navbar>
        <NavbarIconsItems onClick={() => { navigate("/dashboard/" + trainer.rol + "/" + trainer.displayName + "/*") }}>
          <BiSolidNotepad style={{ fontSize: '25px', color: thirdColor }} />
          <NavbarTituloItems>Ejercicios</NavbarTituloItems>
        </NavbarIconsItems>
        <NavbarIconsItems onClick={() => { navigate("/dashboard/" + trainer.rol + "/" + trainer.displayName + "/asesorados") }}>
          <BiMaleFemale style={{ fontSize: '25px', color: thirdColor }} />
          <NavbarTituloItems>Asesorados</NavbarTituloItems>
        </NavbarIconsItems>
        <NavbarIconsItems onClick={() => { navigate("/dashboard/" + trainer.rol + "/" + trainer.displayName + "/profile") }}>
          <FaUser style={{ fontSize: '25px', color: thirdColor }} />
          <NavbarTituloItems>Perfil</NavbarTituloItems>
        </NavbarIconsItems>
      </Navbar>
    </>
  )
}

export default DashBoardTrainer
