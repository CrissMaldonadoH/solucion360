import { NextResponse, NextRequest } from "next/server";
import { mssqlConnect } from "../database/connection";
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
    const db = await mssqlConnect();

    // Buscar en esquema 'dbo' primero
    const user: getUserResponseType = await getUsersByEmail(db, userEmail, "dbo");

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
    return NextResponse.json({
      message:knownError,
    }, {
      status: 500,
    });
  }
}
