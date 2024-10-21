import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { dbFirestore } from "../../firebase/FirebaseConfig";
import { FormEjercicio } from "../../components/components dashboardAdmin/HomeAdmin";
import Swal from "sweetalert2";

interface EjercicioState {
    ejercicios: any;
}

const initialState: EjercicioState = {
    ejercicios: null,
}

const ejercicioSlice = createSlice({
    name: "ejercicio",
    initialState,
    reducers: {
        setEjercicios: (state, action: PayloadAction<EjercicioState>) => {
            state.ejercicios = action.payload;
        },
    }
})

export const { setEjercicios } = ejercicioSlice.actions;
export default ejercicioSlice.reducer;

//actions (funciones)
//obtener info ejercicio
// export const obtenerDataEjercicio = async (id: string) => {
//     const Colection = collection(dbFirestore, "usersInfo")
//     const userQuery = query(userColection, where("id", "==", id))

//     const queriedData = await getDocs(userQuery)
//     let data
//     queriedData.forEach((user) => {
//         data = user.data()
//     })
//     return data
// }

// Create
export const createEjercicioAsync = async (data: FormEjercicio) => {
    try {
        const response = await addDoc(collection(dbFirestore, "ejercicios"), data);
        if (response.id) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "el ejercicio se creo correctamente",
                showConfirmButton: false,
                timer: 3000
            });
        }
    } catch (error) {
        console.log(error);
    }
}

// Read
export const readEjercicioAsync = async () => {
    const datos: any = []
    try {
        const ejercicios = await getDocs(collection(dbFirestore, "ejercicios"))
        ejercicios.forEach((ejercicio) => {
            datos.push({
                ...ejercicio.data(),
            })
        })
        return datos
    } catch (error) {
        console.log(error);
    }
}

//update 
// export const updateEjercicioAsync = async (newData: any) => {
//     const ejerciciosColeccion = collection(dbFirestore, "ejercicios");
//     const ejercicioQuery = query(ejerciciosColeccion, where ("id", "==", newData.id))

//     const queriedData = await getDocs(ejercicioQuery)
//     let id

//     queriedData.forEach((ejercicio) => {
//         id = ejercicio.id
//     })

//     const docRef = doc(dbFirestore, "ejercicios", id)
//     console.log(docRef)

//     const response = updateDoc(docRef, newData)
// }

// Delete
export const deleteEjercicioAsync = async (id: string) => {
    try {
        const ejerciciosColeccion = collection(dbFirestore, "ejercicios");
        const ejercicioQuery = query(ejerciciosColeccion, where ("id", "==", id))
    

        const datos = await getDocs(ejercicioQuery)

        datos.forEach((ejercicio) => {
            deleteDoc(doc(dbFirestore, "ejercicios", ejercicio.id))
        })
    } catch (error) {
        console.log(error)
    }
}