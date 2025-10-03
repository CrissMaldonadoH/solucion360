"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useMsal } from "@azure/msal-react";
import { setUser, fetchUserByEmail } from "@/app/redux/features/authUserSlice";
import { AppDispatch } from "@/app/redux/store";
import Image from "next/image";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import LinearSpinerLoading from "@/src/shared/LinearSpinnerLoading";
import logo from '../../../public/img/logo.png'

export default function HomeClientComponent() {
  const { instance, accounts } = useMsal();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error, token } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (accounts.length > 0) {
      const email:string = accounts[0].username;
      if (email) {
        dispatch(setUser(email));
        dispatch(fetchUserByEmail(email));
      }
    }
  }, [accounts, dispatch, router]);


  const handleLogin = async () => {
    try {
      const loginResponse = await instance.loginPopup({
        scopes: ["User.Read"],
      });

      const email:string = loginResponse.account?.username;
      if (email) {
        dispatch(setUser(email));
        dispatch(fetchUserByEmail(email));
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  useEffect(() => {
    if (token) {
      router.push("/inicio");
    }
  }, [token, router]);
/*
  const handleLogout = () => {
    instance.logoutPopup().then(() => {
      dispatch(clearUser());
      router.push("/");
    });
  };
*/
  return (
    <main className="min-h-screen bg-white flex flex-col justify-between">
      <header className="w-full px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image src={logo} alt="Logo" width={60} height={60} />
        </div>
        <div>
          <button
            onClick={handleLogin}
            className="bg-main text-white px-5 py-2 rounded-md hover:bg-main/80 transition duration-200 cursor-pointer"
          >
            {
              loading ?
                <LinearSpinerLoading
                  width={20}
                  height={20}
                />
              :
                'Iniciar sesión con Microsoft'
            }
          </button>
        </div>
        {
          error &&
          <p
            className="text-red-500"
          >{error}</p>
        }
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-16 py-12 gap-10">
        {/* Left Content */}
        <div className="max-w-xl space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Optimiza tu Información. <br />
            Transforma tu Cultura de Datos.
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Más que una plataforma, es una mentalidad. Comparte datos, identifica patrones y genera decisiones de impacto. Únete a una cultura donde la información trabaja para ti.
          </p>
          <div className="flex justify-center md:justify-start">
            <button
              onClick={handleLogin}
              className="bg-main text-white px-6 py-3 rounded-md hover:bg-main/80 transition duration-200 text-lg cursor-pointer"
            >
              {
                loading ?
                  <LinearSpinerLoading
                    width={20}
                    height={20}
                  />
                :
                  'Iniciar sesión con Microsoft'
              }
            </button>
            {
              error &&
              <p
                className="text-red-500"
              >{error}</p>
            }
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2">
          <svg
            width="600"
            height="400"
            viewBox="0 0 600 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="600" height="400" fill="#F9FAFB" />

            <circle cx="150" cy="100" r="8" fill="#2563EB" />
            <circle cx="250" cy="180" r="8" fill="#2563EB" />
            <circle cx="120" cy="260" r="8" fill="#2563EB" />
            <circle cx="300" cy="100" r="8" fill="#2563EB" />
            <circle cx="420" cy="200" r="8" fill="#2563EB" />
            <circle cx="350" cy="300" r="8" fill="#2563EB" />

            <line x1="150" y1="100" x2="250" y2="180" stroke="#93C5FD" strokeWidth="2" />
            <line x1="150" y1="100" x2="120" y2="260" stroke="#93C5FD" strokeWidth="2" />
            <line x1="250" y1="180" x2="300" y2="100" stroke="#93C5FD" strokeWidth="2" />
            <line x1="250" y1="180" x2="420" y2="200" stroke="#93C5FD" strokeWidth="2" />
            <line x1="420" y1="200" x2="350" y2="300" stroke="#93C5FD" strokeWidth="2" />
            <line x1="120" y1="260" x2="350" y2="300" stroke="#93C5FD" strokeWidth="2" />

            <rect x="450" y="250" width="25" height="90" fill="#60A5FA" />
            <rect x="490" y="220" width="25" height="120" fill="#3B82F6" />
            <rect x="530" y="280" width="25" height="60" fill="#2563EB" />

            <text x="445" y="245" fontFamily="sans-serif" fontSize="12" fill="#4B5563">A</text>
            <text x="485" y="215" fontFamily="sans-serif" fontSize="12" fill="#4B5563">B</text>
            <text x="525" y="275" fontFamily="sans-serif" fontSize="12" fill="#4B5563">C</text>
          </svg>

        </div>
      </section>

      {/* Objetivos */}
      <section className="bg-gray-50 py-12 px-6 md:px-24">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          Objetivos Clave de Nuestra Cultura de Datos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="32" cy="32" r="24" stroke="#2563EB" strokeWidth="3" />

              <g stroke="#2563EB" strokeWidth="3">
                <line x1="32" y1="4" x2="32" y2="12" />
                <line x1="32" y1="52" x2="32" y2="60" />
                <line x1="4" y1="32" x2="12" y2="32" />
                <line x1="52" y1="32" x2="60" y2="32" />
                <line x1="11" y1="11" x2="16" y2="16" />
                <line x1="48" y1="48" x2="53" y2="53" />
                <line x1="11" y1="53" x2="16" y2="48" />
                <line x1="48" y1="16" x2="53" y2="11" />
              </g>

              <path
                d="M24 36 L32 28 L40 36"
                stroke="#22C55E"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="32"
                y1="28"
                x2="32"
                y2="44"
                stroke="#22C55E"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <h3 className="font-semibold text-gray-700 mb-2">Mayor eficiencia</h3>
            <p className="text-sm text-gray-500">Aprovecha al máximo tus datos para agilizar procesos y decisiones.</p>
          </div>
          <div className="flex flex-col items-center">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="28" cy="28" r="14" stroke="#2563EB" strokeWidth="3" />

              <line x1="37" y1="37" x2="52" y2="52" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />

              <path
                d="M28 15 L30 25 H26 L28 15 Z"
                fill="#F97316"
              />
              <circle cx="28" cy="28" r="3" fill="#F97316" />
            </svg>

            <h3 className="font-semibold text-gray-700 mb-2">Identificación de necesidades</h3>
            <p className="text-sm text-gray-500">Detecta oportunidades y áreas de mejora antes de que se conviertan en problemas.</p>
          </div>
          <div className="flex flex-col items-center">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="32" cy="32" r="24" stroke="#2563EB" strokeWidth="3" />
              <circle cx="32" cy="32" r="16" stroke="#2563EB" strokeWidth="2" />
              <circle cx="32" cy="32" r="8" fill="#2563EB" />

              <path
                d="M16 44 L28 32 L36 40 L48 24"
                stroke="#22C55E"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M48 24 L44 24 L48 20"
                fill="#22C55E"
              />
            </svg>

            <h3 className="font-semibold text-gray-700 mb-2">Análisis de impacto</h3>
            <p className="text-sm text-gray-500">Evalúa el efecto real de tus acciones a través de datos confiables.</p>
          </div>
          <div className="flex flex-col items-center">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="5" fill="#2563EB" />
              <circle cx="48" cy="16" r="5" fill="#2563EB" />
              <circle cx="16" cy="48" r="5" fill="#2563EB" />
              <circle cx="48" cy="48" r="5" fill="#2563EB" />

              <circle cx="32" cy="32" r="6" fill="#22C55E" stroke="#2563EB" strokeWidth="2" />

              <line x1="32" y1="32" x2="16" y2="16" stroke="#93C5FD" strokeWidth="2" />
              <line x1="32" y1="32" x2="48" y2="16" stroke="#93C5FD" strokeWidth="2" />
              <line x1="32" y1="32" x2="16" y2="48" stroke="#93C5FD" strokeWidth="2" />
              <line x1="32" y1="32" x2="48" y2="48" stroke="#93C5FD" strokeWidth="2" />

            </svg>

            <h3 className="font-semibold text-gray-700 mb-2">Integración de la información</h3>
            <p className="text-sm text-gray-500">Centraliza, conecta y haz visibles tus fuentes de información.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 py-6">
        &copy; {new Date().getFullYear()} RealTime Analytics. Todos los derechos reservados.
      </footer>
    </main>
  );
}
