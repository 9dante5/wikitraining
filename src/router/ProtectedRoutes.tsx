import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = ({ isAllowed, children }: {isAllowed: any, children: React.ReactNode}) => {
    if (!isAllowed){
        return <Navigate to={"/landing-page"} />;
    }

    return children? children : <Outlet />;
}