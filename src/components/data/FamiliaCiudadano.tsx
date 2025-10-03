import { FamiliaCiudadanoProps } from "@/src/types/Types"
import { useRouter } from "next/navigation";

export default function FamiliaCiudadano({tableroFamilia, setData, tableroFamiliaLoading}:FamiliaCiudadanoProps) {

  const router = useRouter()

  const totalFamily = 0;


  return (
    <>
      <div className="bg-slate-100 rounded-xl px-5 pt-5">
        <h2 className="text-2xl font-bold text-[#E43F82]">
          Integrantes del hogar
        </h2>
        <div className="overflow-x-auto w-full my-5">
          <div className="w-[40rem] md:w-full text-sm">
            <div className="flex text-gray-400">
              <div className="text-center w-1/5 p-1 ">Nombres</div>
              <div className="text-center w-1/5 p-1 ">Edad</div>
              <div className="text-center w-1/5 p-1 ">Documento</div>
              <div className="text-center w-1/5 p-1 ">Beneficios</div>
              <div className="text-center w-1/5 p-1 "></div>
            </div>
            <div className="h-[250px] overflow-auto custom-scrollbar text-gray-300">
              {
                tableroFamiliaLoading ? 
                  <div className="animate-pulse w-full">
                    {Array.from({ length: 7 }).map((_, index)=>(
                        <div key={index} className="h-8 bg-gray-300 rounded w-full mb-3"></div>
                      ))
                      }
                  </div>
                :
                  tableroFamilia.length &&
                    tableroFamilia.map((item, i) => (
                      <div key={`${i}`}>
                        <div className="flex bg-white rounded-xl my-2">
                          <div className="text-center w-1/5 p-1 flex items-center"> 
                            {`${ item.PRIMER_NOMBRE ?? '' } ${ item.SEGUNDO_NOMBRE ?? '' } ${ item.PRIMER_APELLIDO ?? '' } ${ item.SEGUNDO_APELLIDO ?? '' }`}{" "}
                          </div>
                          <div className="text-center w-1/5 p-1">{item.EDAD}</div>
                          <div className="text-center w-1/5 p-1">{item.NUMERO_DOCUMENTO}</div>
                          <div className="text-center w-1/5 p-1">
                            { item.BENEFICIO }
                          </div>
                          <div className="text-center w-1/5 p-1 flex flex-col items-center">
                            <button
                              className="bg-[#292251] text-white cursor-pointer px-5 py-2 rounded-xl"
                              onClick={() =>{
                                setData(null)
                                router.push(`/inicio?document=${item.NUMERO_DOCUMENTO}&type=${item.TIPO_DOCUMENTO}`)
                              }}
                            >
                              VER
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-around py-2">
            <div className="w-full md:w-1/2 text-left">
              <p className="text-sm text-gray-400">
                Suma de los beneficios entregados a los integrantes del hogar
                desde el mes anterior hasta la fecha actual del mes en curso,
                teniendo en cuenta los valores promedio cupo entregados por
                SDIS.
              </p>
            </div>
            <div className="w-full md:w-1/2 uppercase font-bold text-[#E43F82] text-right">
              <span>Total Hogar</span>
              <br />
              <span className="text-2xl">
                {`$ ${totalFamily.toLocaleString("en")}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
