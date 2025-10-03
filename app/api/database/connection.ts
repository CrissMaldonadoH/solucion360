import sql from 'mssql'

const config = {
    user: 'administrador',//process.env.NEXT_PUBLIC_DB_USER ? process.env.NEXT_PUBLIC_DB_USER : '',
    password: 'ZXsy@mUQCc8w8',//process.env.NEXT_PUBLIC_DB_PASSWORD ? process.env.NEXT_PUBLIC_DB_PASSWORD : '',
    server: 'serverpersonalizacionuser.database.windows.net',//process.env.NEXT_PUBLIC_DB_SERVER ? process.env.NEXT_PUBLIC_DB_SERVER : '',
    database: 'sql_personalizacionuser_s360',//process.env.NEXT_PUBLIC_DB_NAME ? process.env.NEXT_PUBLIC_DB_NAME : '',
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
