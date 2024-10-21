import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, dbFirestore } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword, deleteUser, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

interface TrainerState {
    uid: string | null;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    phoneNumber: string | null;
    sex: string | null;
    age: string | null;
    asesorados: Array<string> | null;
    isAuthenticated: boolean;
    rol: string | null;
}

const initialState: TrainerState = {
    uid: null,
    displayName: null,
    email: null,
    photoURL: null,
    phoneNumber: null,
    sex: null,
    age: null,
    asesorados: null,
    isAuthenticated: false,
    rol: null,
}



const trainerSlice = createSlice({
    name: "trainer",
    initialState,
    reducers: {
        loginTrainer: (state, action: PayloadAction<TrainerState>) => {
            state.uid = action.payload.uid;
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.photoURL = action.payload.photoURL;
            state.phoneNumber = action.payload.phoneNumber;
            state.sex = action.payload.sex;
            state.age = action.payload.age;
            state.asesorados = action.payload.asesorados;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.rol = action.payload.rol;
        },
        logoutTrainer: (state) => {
            state.uid = null;
            state.displayName = null;
            state.email = null;
            state.photoURL = null;
            state.phoneNumber = null;
            state.sex = null;
            state.age = null;
            state.asesorados = null;
            state.isAuthenticated = false;
            state.rol = null;
        }
    }
})

export const { loginTrainer, logoutTrainer } = trainerSlice.actions;
export default trainerSlice.reducer;

//actions (funciones)

//crear trainer en la base de datos
export const createTrainerDb = async (id: string, data: any) => {
    try {
        await setDoc(doc(dbFirestore, "usersInfo", id), data);
    } catch (error) {
        console.error(error)
    }
}

//obtener info trainer
export const obtenerRolTrainer = async (id: string) => {
    const trainerColection = collection(dbFirestore, "usersInfo")
    const trainerQuery = query(trainerColection, where("id", "==", id))

    const queriedData = await getDocs(trainerQuery)
    let data
    queriedData.forEach((trainer) => {
        data = trainer.data()
    })
    return data
}


//create trainer
export const mailTrainerRegister = async (email: string, pass: string, photoURL: string, name: string, phoneNumber: string, sex: string, age: string) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, pass)

        if (response) {
            await updateProfile(response.user, {
                displayName: name,
                photoURL: photoURL || "",
            })

            const trainerData = {
                id: response.user.uid,
                displayName: response.user.displayName,
                email: response.user.email,
                photoURL: photoURL || "",
                phoneNumber: phoneNumber,
                sex: sex,
                age: age,
                asesorados: [],
                isAuthenticated: false,
                rol: "trainer"
            }
            await createTrainerDb(response.user.uid, trainerData)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "el entrenador se creo correctamente",
                showConfirmButton: false,
                timer: 3000
            });
        }
    } catch (error) {
        console.error("Hubo un error: " + error)
    }
}

//read trainer
export const readTrainerAsync = async () => {
    const datos: any = []
    try {
        const trainerColection = collection(dbFirestore, "usersInfo")
        const trainerQuery = query(trainerColection, where("rol", "==", "trainer"))
        const queriedData = await getDocs(trainerQuery)

        // const trainers = await getDocs(collection(dbFirestore, "usersInfo"))
        queriedData.forEach((trainer) => {
            datos.push({
                ...trainer.data(),
            })
        })
        return datos
    } catch (error) {
        console.log(error);
    }
}

//update trainer
export const updateTrainerAsync = async (newData: any, uid: any) => {
    // let id

    try {
        // const trainersColeccion = collection(dbFirestore, "usersInfo");
        // const trainerQuery = query(trainersColeccion, where("id", "==", newData.id))
        // const queriedData = await getDocs(trainerQuery)

        // queriedData.forEach((trainer) => {
        //     id = trainer.id
        // })

        const docRef = doc(dbFirestore, "usersInfo", uid)
        updateDoc(docRef, newData)
    } catch (error) {
        console.error(error)
    }





}


//delete trainer
export const deleteTrainerAsync = async (id: string) => {
    try {

        const user: any = auth.currentUser;

        const TrainersColeccion = collection(dbFirestore, "usersInfo");
        const TrainerQuery = query(TrainersColeccion, where("id", "==", id))
        const datos = await getDocs(TrainerQuery)

        datos.forEach((trainer) => {
            deleteUser(user).then(() => {
                deleteDoc(doc(dbFirestore, "usersInfo", trainer.id))
            }).catch((error) => {
                console.log(error)
            });
        })
    } catch (error) {
        console.log(error)
    }
}