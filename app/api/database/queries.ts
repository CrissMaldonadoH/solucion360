import { tables } from "./tables";
import { userResponse } from "@/src/types/Types";

export const getUsersByEmail = async(db:any, userEmail:string, schema:string) =>{ // eslint-disable-line @typescript-eslint/no-explicit-any
    const query = `
    SELECT
        id as id,
        nombre as nombre,
        entidad as entidad,
        correo as correo,
        perfil as perfil,
        tiempoInactividad as tiempoInactividad,
        tyc as tyc,
        accesos as accesos
    FROM [${process.env.NEXT_PUBLIC_DB_NAME}].${schema}.${tables.s360_access} WHERE correo = @email`
    
    /*const query = `SELECT id as id, user_email as email, user_name as [user], user_company as company, fk_company as fk_company, fk_role_id as permission FROM [${process.env.NEXT_PUBLIC_DB_NAME}].${schema}.${tables.users} WHERE user_email = @email`;*/
    const request = new db.Request()
    request.input('email', db.NVarChar, userEmail);
    return await request.query(query)
}

export const getAllUsers = async (db:any, schema:string) =>{ // eslint-disable-line @typescript-eslint/no-explicit-any
    const query = `
    SELECT
        id as id,
        nombre as nombre,
        entidad as entidad,
        correo as correo,
        perfil as perfil,
        tiempoInactividad as tiempoInactividad,
        tyc as tyc,
        accesos as accesos
    FROM [${process.env.NEXT_PUBLIC_DB_NAME}].${schema}.${tables.s360_access}`
    console.log(query)
    return await db.query(query)
}

export const editUser = async (db:any, schema:string, data:userResponse) =>{ // eslint-disable-line @typescript-eslint/no-explicit-any
    const {id, nombre, entidad, correo, perfil, accesos} = data
    const query = `UPDATE [${process.env.NEXT_PUBLIC_DB_NAME}].${schema}.${tables.s360_access} SET nombre = @nombre, entidad = @entidad, correo = @correo, perfil = @perfil, accesos = @accesos WHERE id = @id`

    const request = new db.Request()
    request.input('nombre', db.NVarChar, nombre)
    request.input('entidad', db.NVarChar, entidad)
    request.input('correo', db.NVarChar, correo)
    request.input('perfil', db.NVarChar, perfil)
    request.input('accesos', db.NVarChar, accesos)
    request.input('id', db.Int, id)

    const result = await request.query(query)
    return result.rowsAffected[0]
}

export const createUser = async (db:any, schema:string, data:{nombre: string, entidad: string, correo: string, perfil: string,}) =>{ // eslint-disable-line @typescript-eslint/no-explicit-any
    const {nombre, entidad, correo, perfil} = data
    const query = `INSERT INTO [${process.env.NEXT_PUBLIC_DB_NAME}].${schema}.${tables.s360_access} (nombre, entidad, correo, perfil, tiempoInactividad, tyc, accesos) VALUES (@nombre, @entidad, @correo, @perfil, 15, 0, '{"Consultar ciudadano":1,"Datos actuales del ciudadano":1,"Datos históricos del ciudadano":1,"Grupo familiar del ciudadano":1,"Ver tableros":1,"Ver anomalías":1,"Consultar listados":1,"Componente Geográfico":1,"Calidad de datos":1,"Administrar usuarios":1}')`

    const request = new db.Request()
    request.input('nombre', db.NVarChar, nombre)
    request.input('entidad', db.NVarChar, entidad)
    request.input('correo', db.NVarChar, correo)
    request.input('perfil', db.NVarChar, perfil)

    return await request.query(query)
}

export const deleteUser = async (db:any, schema:string, id:number) =>{ // eslint-disable-line @typescript-eslint/no-explicit-any
    const query = `DELETE FROM [${process.env.NEXT_PUBLIC_DB_NAME}].${schema}.${tables.s360_access} WHERE id = @id`

    const request = new db.Request()
    request.input('id', db.Int, id)
     return await request.query(query)
}