import { NextResponse, NextRequest } from "next/server";
import { mssql_s360_Connect } from "../database/s360Connnection";
import { getUsersByEmail } from '../database/queries';
import { getUserResponseType } from "@/src/types/Types";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userEmail = body.email;

  if (!userEmail) {
    return NextResponse.json({ message: "Invalid process" }, { status: 400 });
  }

  try {
    const db = await mssql_s360_Connect();

    // Buscar en esquema 'S_360' primero
    const user: getUserResponseType = await getUsersByEmail(db, userEmail, "S_360");
    console.log(user)
    if(!user.recordset.length){
        return NextResponse.json({
            message:'No se encontró el usuario',
        }, {
            status: 404,
        });
    }

    if (typeof user.recordset[0].accesos === "string") {
      user.recordset[0].accesos = JSON.parse(user.recordset[0].accesos);
    }

    const token = jwt.sign(user.recordset[0], process.env.NEXT_PUBLIC_ACCESS_TOKEN || "", { expiresIn: "1w" });

    return NextResponse.json({ token }, { status: 200 });

  } catch (err: unknown) {
    const knownError = err as {message: string};
    console.log(knownError)
    return NextResponse.json({
      message:knownError,
    }, {
      status: 500,
    });
  }
}
