import { useNavigate } from "react-router-dom"

const Error = () => {
    const navigate = useNavigate()

    return (
        <>
            No deberias estar aqui
            <button onClick={() => {navigate("/landing-page")}}></button>
        </>
    )
}

export default Error
