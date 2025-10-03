'use server'
import { mssqlConnect } from "../api/database/connection"
import { getAllUsers, editUser, createUser, deleteUser } from "../api/database/queries"
import { getUserResponseType, userResponse } from "@/src/types/Types"

export async function getUsers(): Promise<userResponse[] | null> {
    try {
        const db = await mssqlConnect()
        const users:getUserResponseType= await getAllUsers(db, 'dbo')
        return users.recordset;
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function editUsers(dataUser:userResponse): Promise<boolean | null>{
    console.log(dataUser)
    try {
        const db = await mssqlConnect()
        const updating= await editUser(db, 'dbo', dataUser)
        
        if(!updating) return null

        return true
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function createUsers(dataUser:{nombre: string, entidad: string, correo: string, perfil: string,}): Promise<boolean | null>{
    console.log(dataUser)
    try {
        const db = await mssqlConnect()
        const creating= await createUser(db, 'dbo', dataUser)
        
        if(!creating) return null

        return true
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function deleteUsers(id:number): Promise<boolean | null>{
    try {
        const db = await mssqlConnect()
        const deleting= await deleteUser(db, 'dbo', id)
        
        if(!deleting) return null

        return true
    } catch (error) {
        console.log(error)
        return null
    }
}