
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";
const encoder = new TextEncoder();

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }


  try {
    const { payload } = await jwtVerify(token, encoder.encode(SECRET_KEY));

    if (typeof payload.id !== 'number' || typeof payload.nombre !== 'string' || typeof payload.entidad !== 'string' || typeof payload.correo !== 'string' || typeof payload.perfil !== 'string' || typeof payload.tiempoInactividad !== 'string' || typeof payload.tyc !== 'number') {
      return NextResponse.redirect(new URL('/', req.url));
    }


    return NextResponse.next();
  } catch (err) {
    console.error("Invalid JWT:", err);
    return NextResponse.redirect(new URL('/', req.url));
  }
}

// Protect multiple routes
export const config = {
  matcher: [
    "/inicio",
  ],
};
