import { useParams } from "react-router-dom"
import DashBoardAdmin from "../containers/DashBoardAdmin"
import DashBoardTrainer from "../containers/DashBoardTrainer"
import DashBoardUser from "../containers/DashBoardUser"

const DashBoard = () => {

    const { rol } = useParams()

    return (
        <>            
            {rol === "admin" && <DashBoardAdmin />}
            {rol === "trainer" && <DashBoardTrainer />}
            {rol === "user" && <DashBoardUser />}
        </>
    )
}

export default DashBoard
