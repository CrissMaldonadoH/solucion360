import { tables_s360 } from "./tables";

export const getDocumentsType = async(db:any, schema:string) =>{// eslint-disable-line @typescript-eslint/no-explicit-any

    const query = `SELECT * FROM [${process.env.NEXT_PUBLIC_S360_DB_NAME}].${schema}.${tables_s360.POC_TIPO_DOCUMENTO}`;
    return await db.query(query)
}

export const citizenInformation = async(db:any, schema:string, type_document:number, number:number) => {// eslint-disable-line @typescript-eslint/no-explicit-any

    const query = `SELECT * FROM [${process.env.NEXT_PUBLIC_S360_DB_NAME}].${schema}.${tables_s360.POC_INFORMACION_CIUDADANO} WHERE TIPO_DOCUMENTO = @tipo_documento AND NUMERO_DOCUMENTO = @numero_documento`;
    console.log('query', query, type_document, number)
    const request = new db.Request();
    request.input('tipo_documento', db.Int, type_document)
    request.input('numero_documento', db.Int, number)
    return await request.query(query)
}

export const benefitsBoard = async(db:any, schema:string, type_document:number, number:number) => {// eslint-disable-line @typescript-eslint/no-explicit-any

    const query = `SELECT * FROM [${process.env.NEXT_PUBLIC_S360_DB_NAME}].${schema}.${tables_s360.POC_ENTREGA_BENEFICIOS_CIUDADANO} WHERE TIPO_DOCUMENTO = @tipo_documento AND NUMERO_DOCUMENTO = @numero_documento`;
    
    const request = new db.Request();
    request.input('tipo_documento', db.Int, type_document)
    request.input('numero_documento', db.Int, number)
    return await request.query(query)
}

export const familyBoard = async(db:any, schema:string, id_hogar:number) => {// eslint-disable-line @typescript-eslint/no-explicit-any

    const query = `SELECT * FROM [${process.env.NEXT_PUBLIC_S360_DB_NAME}].${schema}.${tables_s360.POC_LISTADO_PERSONAS} WHERE ID_HOGAR = @id_hogar`;
    
    const request = new db.Request();
    request.input('id_hogar', db.Int, id_hogar)
    return await request.query(query)
}

export const benefitsList = async(db:any, schema:string) => {// eslint-disable-line @typescript-eslint/no-explicit-any

    const query = `SELECT * FROM [${process.env.NEXT_PUBLIC_S360_DB_NAME}].${schema}.${tables_s360.POC_LR_BENEFICIOS_ENTIDAD}`;
    return await db.query(query)

}

export const locationsList = async(db:any, schema:string) => {// eslint-disable-line @typescript-eslint/no-explicit-any

    const query = `SELECT * FROM [${process.env.NEXT_PUBLIC_S360_DB_NAME}].${schema}.${tables_s360.POC_LR_LOCALIDAD}`;
    return await db.query(query)

}

export const upzList = async(db:any, schema:string, codigo_localidad:number) => {// eslint-disable-line @typescript-eslint/no-explicit-any

    const query = `SELECT * FROM [${process.env.NEXT_PUBLIC_S360_DB_NAME}].${schema}.${tables_s360.POC_LR_UPZ} WHERE CODIGO_LOCALIDAD = @codigo_localidad`;
    
    const request = new db.Request();
    request.input('codigo_localidad', db.Int, codigo_localidad)
    return await request.query(query)
}

export const getListOfPeople = async(db:any, schema:string, conditions:string) => {// eslint-disable-line @typescript-eslint/no-explicit-any

    const query = `SELECT * FROM [${process.env.NEXT_PUBLIC_S360_DB_NAME}].${schema}.${tables_s360.POC_LISTADO_PERSONAS} ${conditions}`;
    console.log(query)
    return await db.query(query)

}

export const getCountOfPeople = async(db:any, schema:string, conditions:string) => {// eslint-disable-line @typescript-eslint/no-explicit-any

    const query = `SELECT COUNT(*) AS total FROM [${process.env.NEXT_PUBLIC_S360_DB_NAME}].${schema}.${tables_s360.POC_LISTADO_PERSONAS} ${conditions}`;
    console.log(query)
    return await db.query(query)

}

export const getCountOfHomes = async(db:any, schema:string, conditions:string) => {// eslint-disable-line @typescript-eslint/no-explicit-any

    const query = `SELECT COUNT(DISTINCT ID_HOGAR) AS total FROM [${process.env.NEXT_PUBLIC_S360_DB_NAME}].${schema}.${tables_s360.POC_LISTADO_PERSONAS} ${conditions}`;
    console.log(query)
    return await db.query(query)

}

export const getAllListOfPeople = async(db:any, schema:string) => {// eslint-disable-line @typescript-eslint/no-explicit-any

    const query = `SELECT * FROM [${process.env.NEXT_PUBLIC_S360_DB_NAME}].${schema}.${tables_s360.POC_LISTADO_PERSONAS}`;
    console.log(query)
    return await db.query(query)

}

export const getAllCountOfPeople = async(db:any, schema:string) => {// eslint-disable-line @typescript-eslint/no-explicit-any

    const query = `SELECT COUNT(*) AS total FROM [${process.env.NEXT_PUBLIC_S360_DB_NAME}].${schema}.${tables_s360.POC_LISTADO_PERSONAS}`;
    console.log(query)
    return await db.query(query)

}

export const getAllCountOfHomes = async(db:any, schema:string) => {// eslint-disable-line @typescript-eslint/no-explicit-any

    const query = `SELECT COUNT(DISTINCT ID_HOGAR) AS total FROM [${process.env.NEXT_PUBLIC_S360_DB_NAME}].${schema}.${tables_s360.POC_LISTADO_PERSONAS}`;
    console.log(query)
    return await db.query(query)

}