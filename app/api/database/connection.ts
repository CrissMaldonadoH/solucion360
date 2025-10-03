import sql from 'mssql'

const config = {
    user: process.env.NEXT_PUBLIC_S360_DB_USER ? process.env.NEXT_PUBLIC_S360_DB_USER : '',
    password: process.env.NEXT_PUBLIC_S360_DB_PASSWORD ? process.env.NEXT_PUBLIC_S360_DB_PASSWORD : '',
    server: process.env.NEXT_PUBLIC_S360_DB_SERVER ? process.env.NEXT_PUBLIC_S360_DB_SERVER : '',
    database: process.env.NEXT_PUBLIC_S360_DB_NAME ? process.env.NEXT_PUBLIC_S360_DB_NAME : '',
    options: {
        encrypt: true, 
        connectTimeout: 30000,
        multipleStatements: true,
      }
}
  
export async function mssqlConnect(){
    await sql.connect(config);
    return sql;
}
