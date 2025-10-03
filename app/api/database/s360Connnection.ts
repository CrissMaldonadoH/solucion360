import sql from 'mssql'

const config = {
    user: 'Administrador',//process.env.NEXT_PUBLIC_S360_DB_USER ? process.env.NEXT_PUBLIC_S360_DB_USER : '',
    password: "S$gK6WBxF8$ADu",
    server: 'serversqlmaestras360.database.windows.net',//process.env.NEXT_PUBLIC_S360_DB_SERVER ? process.env.NEXT_PUBLIC_S360_DB_SERVER : '',
    database: 'sql_maestra_s360',//process.env.NEXT_PUBLIC_S360_DB_NAME ? process.env.NEXT_PUBLIC_S360_DB_NAME : '',
    options: {
        encrypt: true, 
        connectTimeout: 30000,
        multipleStatements: true,
      }
}
  
export async function mssql_s360_Connect(){
    await sql.connect(config);
    return sql;
    //const pool = await sql.connect(config);
    //return pool;
}
