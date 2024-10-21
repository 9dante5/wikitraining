import { BrowserRouter, Route, Routes } from "react-router-dom"
import Inicio from "../containers/Inicio"
import LandingPage from "../containers/LandingPage"
import Login from "../containers/Login"
import Register from "../containers/Register"
import Validation from "../containers/Validation"
import { useSelector } from "react-redux"
import { ProtectedRoutes } from "./ProtectedRoutes"
import Error from "../components/Error"
import DashBoard from "./DashBoard"
import Payment from "../containers/Payment"


// interface Protected {
//   isAllowed: any;
//   children: any;
//   redirectTo?: any;
// }

function App() {

  const user = useSelector((store: any) => store.user)
  const trainer = useSelector((store: any) => store.trainer)
  const admin = useSelector((store: any) => store.admin)


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/error" element={<Error />} />
          <Route path="/payment" element={<Payment />} />

          <Route path="/login" element={
            <ProtectedRoutes isAllowed={!user.isAuthenticated && !trainer.isAuthenticated && !admin.isAuthenticated}>
              <Login />
            </ProtectedRoutes>
          } />

          <Route path="/register" element={
            <ProtectedRoutes isAllowed={!user.isAuthenticated && !trainer.isAuthenticated && !admin.isAuthenticated}>
              <Register />
            </ProtectedRoutes>
          } />

          <Route path="/validation" element={
            <ProtectedRoutes isAllowed={(user.uid !== null && !user.isAuthenticated) || (trainer.uid !== null && !trainer.isAuthenticated) || (admin.uid !== null && !admin.isAuthenticated)}>
              <Validation />
            </ProtectedRoutes>
          } />

          <Route path="/dashboard/:rol/:name/*" element={
            <ProtectedRoutes isAllowed={user.isAuthenticated || trainer.isAuthenticated || admin.isAuthenticated}>
              <DashBoard />
            </ProtectedRoutes>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
