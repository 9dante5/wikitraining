import { Route, Routes, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import HomeUser from "../components/components dashboardUser/HomeUser"
import SearchUser from "../components/components dashboardUser/SearchUser"
import FavoritesUser from "../components/components dashboardUser/FavoritesUser"
import ProfileUser from "../components/components dashboardUser/ProfileUser"
import { Navbar, NavbarIconsItems, NavbarTituloItems } from "../styles/dashboardAdminStyled"
import { IoIosCalculator, IoMdHome } from "react-icons/io"
import { FaSearch } from "react-icons/fa"
import { FaHeart, FaUser } from "react-icons/fa6"
import { TiThMenu } from "react-icons/ti"
import { Drawer } from "antd"
import { useState } from "react"
import { CardOpcionsDrawer, ContainerDrawer, TituloCardOpcionsDrawer } from "../styles/dashboardUserStyled"
import { GiMuscleUp } from "react-icons/gi"
import HireTrainer from "../components/components dashboardUser/HireTrainer"
import CalcCalories from "../components/components dashboardUser/CalcCalories"
import CalcMacros from "../components/components dashboardUser/CalcMacros"
import { firstColor, thirdColor } from "../styles/styleSheet"

const DashBoardUser = () => {
  const navigate = useNavigate()
  const user = useSelector((store: any) => store.user)

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const hireTrainer = () => {
    navigate("/dashboard/" + user.rol + "/" + user.displayName + "/hire-trainer")
    onClose()
  }

  const calcCalories = () => {
    navigate("/dashboard/" + user.rol + "/" + user.displayName + "/calc-calories")
    onClose()
  }

  const calcMacros = () => {
    navigate("/dashboard/" + user.rol + "/" + user.displayName + "/calc-macros")
    onClose()
  }


  return (
    <>
      <TiThMenu onClick={showDrawer} style={{ fontSize: "30px", position: "fixed", top: "10", left: "10", cursor: "pointer", zIndex: "1000", color: thirdColor }} />
      <Drawer title="Mas opciones" onClose={onClose} open={open}>
        <ContainerDrawer>

          <CardOpcionsDrawer onClick={() => { hireTrainer() }}>
            <GiMuscleUp style={{ fontSize: "30px", color: firstColor }} />
            <TituloCardOpcionsDrawer>Contratar entrenador</TituloCardOpcionsDrawer>
          </CardOpcionsDrawer>

          <CardOpcionsDrawer onClick={() => { calcCalories() }}>
            <IoIosCalculator style={{ fontSize: "30px", color: firstColor }} />
            <TituloCardOpcionsDrawer>Calculadora de calorias</TituloCardOpcionsDrawer>
          </CardOpcionsDrawer>

          <CardOpcionsDrawer onClick={() => { calcMacros() }}>
            <IoIosCalculator style={{ fontSize: "30px", color: firstColor }} />
            <TituloCardOpcionsDrawer>Calculadora de MACROS</TituloCardOpcionsDrawer>
          </CardOpcionsDrawer>

        </ContainerDrawer>
      </Drawer>

      <Routes>
        <Route path="/*" element={<HomeUser />} />
        <Route path="/search" element={<SearchUser />} />
        <Route path="/favorites" element={<FavoritesUser />} />
        <Route path="/profile" element={<ProfileUser />} />
        <Route path="/hire-trainer" element={<HireTrainer />} />
        <Route path="/calc-calories" element={<CalcCalories />} />
        <Route path="/calc-macros" element={<CalcMacros />} />
      </Routes>

      <Navbar>
        <NavbarIconsItems onClick={() => { navigate("/dashboard/" + user.rol + "/" + user.displayName + "/*") }}>
          <IoMdHome style={{ fontSize: '25px', color: thirdColor }} />
          <NavbarTituloItems>Home</NavbarTituloItems>
        </NavbarIconsItems>
        <NavbarIconsItems onClick={() => { navigate("/dashboard/" + user.rol + "/" + user.displayName + "/search") }}>
          <FaSearch style={{ fontSize: '25px', color: thirdColor }} />
          <NavbarTituloItems>Buscar</NavbarTituloItems>
        </NavbarIconsItems>
        <NavbarIconsItems onClick={() => { navigate("/dashboard/" + user.rol + "/" + user.displayName + "/favorites") }}>
          <FaHeart style={{ fontSize: '25px', color: thirdColor }} />
          <NavbarTituloItems>Favoritos</NavbarTituloItems>
        </NavbarIconsItems>
        <NavbarIconsItems onClick={() => { navigate("/dashboard/" + user.rol + "/" + user.displayName + "/profile") }}>
          <FaUser style={{ fontSize: '25px', color: thirdColor }} />
          <NavbarTituloItems>Perfil</NavbarTituloItems>
        </NavbarIconsItems>
      </Navbar>
    </>
  )
}

export default DashBoardUser