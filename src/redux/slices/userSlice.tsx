import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, dbFirestore } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

interface UserState {
    uid: string | null | undefined;
    displayName: string | null | undefined;
    email: string | null | undefined;
    photoURL: string | null | undefined;
    phoneNumber: string | null | undefined;
    sex: string | null | undefined,
    age: string | null | undefined,
    favorites: Array<string> | null | undefined;
    trainer: string | null | undefined;
    isAuthenticated: boolean | undefined;
    rol: string | null | undefined;
}

const initialState: UserState = {
    uid: null,
    displayName: null,
    email: null,
    photoURL: null,
    phoneNumber: null,
    sex: null,
    age: null,
    favorites: null,
    trainer: null,
    isAuthenticated: false,
    rol: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserState>) => {
            state.uid = action.payload.uid;
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.photoURL = action.payload.photoURL;
            state.phoneNumber = action.payload.phoneNumber;
            state.sex = action.payload.sex;
            state.age = action.payload.age;
            state.favorites = action.payload.favorites;
            state.trainer = action.payload.trainer;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.rol = action.payload.rol;
        },
        logout: (state) => {
            state.uid = null;
            state.displayName = null;
            state.email = null;
            state.photoURL = null;
            state.phoneNumber = null;
            state.sex = null;
            state.age = null;
            state.favorites = null;
            state.trainer = null;
            state.isAuthenticated = false;
            state.rol = null;
        }
    }
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

//actions (funciones)

//crear user en la base de datos
export const createUserDb = async (id: string, data: any) => {
    try {
        await setDoc(doc(dbFirestore, "usersInfo", id), data);
    } catch (error) {
        console.error(error)
    }
}

//obtener info user
export const obtenerDataUser = async (id: string) => {
    const userColection = collection(dbFirestore, "usersInfo")
    const userQuery = query(userColection, where("id", "==", id))

    const queriedData = await getDocs(userQuery)
    let data
    queriedData.forEach((user) => {
        data = user.data()
    })
    return data
}

//create user
export const mailUserRegister = async (email: string, pass: string, name: string, phoneNumber: string, sex: string, age: string) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, pass)

        if (response) {
            await updateProfile(response.user, {
                displayName: name,
                photoURL: "",
            })

            const userData = {
                id: response.user.uid,
                displayName: response.user.displayName,
                email: response.user.email,
                photoURL: "",
                phoneNumber: phoneNumber,
                sex: sex,
                age: age,
                favorites: [],
                trainer: "",
                isAuthenticated: false,
                rol: "user"
            }
            await createUserDb(response.user.uid, userData)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Te has registrado correctamente",
                showConfirmButton: false,
                timer: 3000
            });
        }
    } catch (error) {
        console.error("Hubo un error: " + error)
    }
}

//read user
export const readUserAsync = async () => {
    const datos: any = []
    try {
        const userColection = collection(dbFirestore, "usersInfo")
        const userQuery = query(userColection, where("rol", "==", "user"))
        const queriedData = await getDocs(userQuery)

        // const trainers = await getDocs(collection(dbFirestore, "usersInfo"))
        queriedData.forEach((user) => {
            datos.push({
                ...user.data(),
            })
        })
        return datos
    } catch (error) {
        console.log(error);
    }
}

//update user
export const updateUserAsync = async (newData: any, uid: string) => {

    // const usersColeccion = collection(dbFirestore, "usersInfo");
    // const userQuery = query(usersColeccion, where("id", "==", newData.id))

    // // const queriedData = await getDocs(userQuery)
    // // let id

    // // queriedData.forEach((user) => {
    // //     id = user.id
    // // })

    const docRef = doc(dbFirestore, "usersInfo", uid)

     await updateDoc(docRef, newData)
}