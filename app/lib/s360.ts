'use server'
import { mssql_s360_Connect } from "../api/database/s360Connnection"
import { getDocumentsType, citizenInformation, benefitsBoard, familyBoard, benefitsList, locationsList, upzList, getListOfPeople, getAllListOfPeople, getAllCountOfPeople, getCountOfPeople, getCountOfHomes, getAllCountOfHomes } from "../api/database/queries_s360"
import { getAllDocumentsType, getAllDocumentsTyperesponse, CitizenType, CitizenTypeResponse, TableroBeneficioType, TableroBeneficioResponse, ListOfBenefistType, LocalidadType, UpzType, CustomParamsType, ListOfPersonType, countType } from "@/src/types/Types"

const db = await mssql_s360_Connect()

export async function getAllDocuments(): Promise<getAllDocumentsType[] | null> {
    try {
        const documents:getAllDocumentsTyperesponse= await getDocumentsType(db, 'S_360')
        return documents.recordset;

    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getCitizenInformation(type_document:number, number:number): Promise<CitizenType[] | null> {
    try {
        const citizen: CitizenTypeResponse = await citizenInformation(db, 'S_360', type_document, number )
        return citizen.recordset;
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getBenefitsBoard(type_document:number, number:number):Promise<TableroBeneficioType[] | null> {
    try {
        const benefits:TableroBeneficioResponse = await benefitsBoard(db, 'S_360', type_document, number )
        return benefits.recordset;
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getFamilyBoard(id_hogar:number, ):Promise<unknown>{
    try {
        const hogar = await familyBoard(db, 'S_360', id_hogar )
        return hogar.recordset;
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getBenefistList():Promise<ListOfBenefistType[] | null>{
    try {
        const hogar = await benefitsList(db, 'S_360')
        return hogar.recordset;
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getLocationsList():Promise<LocalidadType[] | null>{
    try {
        const hogar = await locationsList(db, 'S_360')
        return hogar.recordset;
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getUpzList(codigo_localidad:number):Promise<UpzType[] | null>{
    try {
        const hogar = await upzList(db, 'S_360', codigo_localidad)
        return hogar.recordset;
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getPeopleList(conditions: CustomParamsType):Promise<ListOfPersonType | null>{
    const clauses = [];

    for (const [key, value] of Object.entries(conditions)) {
        if (typeof value === 'object' && value !== null && value.between) {
        const [start, end] = value.between;
        const formattedStart = typeof start === 'string' ? `'${start}'` : start;
        const formattedEnd = typeof end === 'string' ? `'${end}'` : end;
        clauses.push(`${key} BETWEEN ${formattedStart} AND ${formattedEnd}`);
        } else {
        const formattedValue = typeof value === 'string' ? `'${value}'` : value;
        clauses.push(`${key} = ${formattedValue}`);
        }
    }
    try {
        const list = await getListOfPeople(db, 'S_360', clauses.length ? 'WHERE ' + clauses.join(' AND ') : '')
        return list.recordset;
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getAllPeopleList():Promise<ListOfPersonType | null>{
    
    try {
        const list = await getAllListOfPeople(db, 'S_360')
        return list.recordset;
    } catch (error) {
        console.log(error)
        return null
    }
}


export async function getPeopleListCount(conditions: CustomParamsType):Promise<countType | null>{
    const clauses = [];

    for (const [key, value] of Object.entries(conditions)) {
        if (typeof value === 'object' && value !== null && value.between) {
        const [start, end] = value.between;
        const formattedStart = typeof start === 'string' ? `'${start}'` : start;
        const formattedEnd = typeof end === 'string' ? `'${end}'` : end;
        clauses.push(`${key} BETWEEN ${formattedStart} AND ${formattedEnd}`);
        } else {
        const formattedValue = typeof value === 'string' ? `'${value}'` : value;
        clauses.push(`${key} = ${formattedValue}`);
        }
    }
    try {
        const list = await getCountOfPeople(db, 'S_360', clauses.length ? 'WHERE ' + clauses.join(' AND ') : '')
        return list.recordset;
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getAllPeopleListCount():Promise<countType | null>{
    
    try {
        const list = await getAllCountOfPeople(db, 'S_360')
        return list.recordset;
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getHomesListCount(conditions: CustomParamsType):Promise<countType | null>{
    const clauses = [];

    for (const [key, value] of Object.entries(conditions)) {
        if (typeof value === 'object' && value !== null && value.between) {
        const [start, end] = value.between;
        const formattedStart = typeof start === 'string' ? `'${start}'` : start;
        const formattedEnd = typeof end === 'string' ? `'${end}'` : end;
        clauses.push(`${key} BETWEEN ${formattedStart} AND ${formattedEnd}`);
        } else {
        const formattedValue = typeof value === 'string' ? `'${value}'` : value;
        clauses.push(`${key} = ${formattedValue}`);
        }
    }
    try {
        const list = await getCountOfHomes(db, 'S_360', clauses.length ? 'WHERE ' + clauses.join(' AND ') : '')
        return list.recordset;
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getAllHomesListCount():Promise<countType | null>{
    
    try {
        const list = await getAllCountOfHomes(db, 'S_360')
        return list.recordset;
    } catch (error) {
        console.log(error)
        return null
    }
}