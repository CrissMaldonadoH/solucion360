import { useState } from "react";
import { useRouter } from "next/navigation";
import { useHandleFetch } from "@/src/hooks/useHandleFetch";
import { FormEvent } from "react";

export default function Buscador() {
    const [documentNumber, setDocumentNumber] = useState<string>("");
    const [typeView, setTypeView] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [documentType, setDocumentType] = useState<number>(0);
    const [documentTypes] = useState<{codigo:number, campo:string}[]>([]);

    const router = useRouter();

    const { fetchData } = useHandleFetch()

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validateNumber = /^[0-9\b]+$/;

        if ([documentNumber, documentType, typeView].includes("")) {
        setError("Todos los campos son obligatorios");
        return;
        } else if (!validateNumber.test(documentNumber)) {
        setError("Sólo se aceptan números");
        return;
        }

        const request = await fetchData({
          endpoint: process.env.VITE_DS_INFORMACION_CIUDADANO || '',
          method: 'GET',
          view: process.env.VITE_CA_INFORMACION_CIUDADANO || '',
          params:{
            select:'fuente',
            filter:{
              numero_documento: documentNumber,
              tipo_documento:documentType
            }
          }
        })

        if(request == null) console.log('No se pudo conectar con el servidor')

        if(request && typeof request.data == 'string') router.push(`/inicio/data?source=${request.data}&type=${documentType}&document=${documentNumber}`); 

    };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col md:flex-row justify-center w-full h-full bg-white divide-x rounded shadow-xl m-auto overflow-hidden`}
      >
        <div
          className={`w-full md:w-2/5 mx-0 my-3 md:my-0 p-4 md:p-3 px-1 flex`}
        >
          <select
            className={`w-full h-full outline-0 m-auto`}
            value={documentType}
            onChange={(e) => setDocumentType(parseInt(e.target.value))}
          >
            <option value="">Tipo de Documento</option>
            {documentTypes !== undefined &&
              documentTypes.length !== 0 &&
                documentTypes.map((doc) => (
                    <option
                    key={`${doc.codigo}`}
                    value={`${doc.codigo}`}
                    className="appearance-none p-5 text-red"
                    >
                    {doc.campo}
                    </option>
                ))}
          </select>
        </div>
        <div
          className={`w-full md:w-2/5 mx-0 my-3 md:my-0 p-4 md:p-3 px-1 flex`}
        >
          <input
            placeholder="Número de Doc"
            className={`w-full h-full outline-0 m-auto`}
            value={documentNumber}
            pattern="[0-9]+"
            onChange={(e) => setDocumentNumber(e.target.value)}
          />
        </div>
        <div
          className={`w-full md:w-1/5 flex`}
        >
            <button
                className="w-full h-full bg-[#334553] hover:bg-[#334553]/80 text-white"
            >
                Buscar
            </button>
        </div>
      </form>
      {error !== "" && (
        <div className="text-center font-semibold bg-red-100 text-red-500 p-2 rounded mt-3 text-[12px]">
          <p> {error} </p>
        </div>
      )}
    </>
  )
}
