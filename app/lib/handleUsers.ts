'use server'
import { mssql_s360_Connect } from "../api/database/s360Connnection"
import { getAllUsers, editUser, createUser, deleteUser } from "../api/database/queries"
import { getUserResponseType, userResponse } from "@/src/types/Types"

export async function getUsers(): Promise<userResponse[] | null> {
    try {
        const db = await mssql_s360_Connect()
        const users:getUserResponseType= await getAllUsers(db, 'S_360')
        return users.recordset;
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function editUsers(dataUser:userResponse): Promise<boolean | null>{
    console.log(dataUser)
    try {
        const db = await mssql_s360_Connect()
        const updating= await editUser(db, 'S_360', dataUser)
        
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
        const db = await mssql_s360_Connect()
        const creating= await createUser(db, 'S_360', dataUser)
        
        if(!creating) return null

        return true
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function deleteUsers(id:number): Promise<boolean | null>{
    try {
        const db = await mssql_s360_Connect()
        const deleting= await deleteUser(db, 'S_360', id)
        
        if(!deleting) return null

        return true
    } catch (error) {
        console.log(error)
        return null
    }
}