import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { dbFirestore } from "../../firebase/FirebaseConfig";

interface AdminState {
    uid: string | null | undefined;
    displayName: string | null | undefined;
    email: string | null | undefined;
    photoURL: string | null | undefined;
    isAuthenticated: boolean | undefined;
    rol: string | null | undefined;
}

const initialState: AdminState = {
    uid: null,
    displayName: null,
    email: null,
    photoURL: null,
    isAuthenticated: false,
    rol: null,
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        loginAdmin: (state, action: PayloadAction<AdminState>) => {
            state.uid = action.payload.uid;
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.photoURL = action.payload.photoURL;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.rol = action.payload.rol;
        },
        logoutAdmin: (state) => {
            state.uid = null;
            state.displayName = null;
            state.email = null;
            state.photoURL = null;
            state.isAuthenticated = false;
            state.rol = null;
        }
    }
})

export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;


//actions (funciones)

//obtener info user
export const obtenerDataAdmin = async (id: string) => {
    const adminColection = collection(dbFirestore, "usersInfo")
    const adminQuery = query(adminColection, where("id", "==", id))

    const queriedData = await getDocs(adminQuery)
    let data
    queriedData.forEach((user) => {
        data = user.data()
    })
    return data
}