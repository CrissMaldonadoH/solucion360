'use client'
import MagnifyGlassIcon from "@/src/shared/icons/MagnifyGlassIcon";
import { InicioClientComponentProps, getAllDocumentsType } from "@/src/types/Types";
import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import LinearSpinerLoading from "@/src/shared/LinearSpinnerLoading";
import { useSearchParams } from 'next/navigation';
import DataClientComponent from "../data/DataClientComponent";
import { CitizenType } from "@/src/types/Types";

export default function InicioClientComponent({getAllDocuments, getCitizenInformation, getBenefitsBoard, getFamilyBoard}:InicioClientComponentProps) {

  const [ documents, setDocuments ] = useState<getAllDocumentsType[]>([])
  const [ loadingDocuments, setLoadingDocuments ] = useState<boolean>(false)
  const [ identityData, setIdentityData ] = useState<{type_document:string, number:string}>({type_document:'', number:''})
  const [ data, setData ] = useState<CitizenType | null>(null)
  const [ loadingData, setLoadingData ] = useState<boolean>(false)

  const searchParams = useSearchParams();
  const document = useMemo(() => searchParams.get('document'), [searchParams]);
  const type = useMemo(() => searchParams.get('type'), [searchParams]);

  const homeStepByStep = [
    {
      id: 1,
      step: "Elija el tipo de documento del ciudadano que desea consultar.",
    },
    {
      id: 2,
      step: "Ingrese el número de identificación del ciudadano.",
    },
    {
      id: 3,
      step: "Seleccione ver información individual o del grupo familiar del ciudadano.",
    },
  ];

  const getDocuments = async () =>{

    setLoadingDocuments(true)
    const request = await getAllDocuments()
    setLoadingDocuments(false)
    
    if(request === null){
      toast.error('Error al cargar el tipo de documentos')
      return
    }

    if(request && Array.isArray(request)){
      setDocuments(request)
    }
  }

  const handleSubmit = async() => {


    const validateNumber = /^[0-9\b]+$/;

    if (Object.values(identityData).some(val => val.trim() === '')) {
      toast.error('Todos los campos son obligatorios')
      return
    }

    if (!validateNumber.test(identityData.number)) {
      toast.error("Sólo se aceptan números");
      return;
    }

    setLoadingData(true)
    
    const request = await getCitizenInformation(parseInt(identityData.type_document), parseInt(identityData.number))

    setLoadingData(false)

    if(request == null) toast.error('No se pudo conectar con el servidor')

    if(request && Array.isArray(request)){
      if(!request.length){
        toast.error(`No se existe un registro para ${identityData.type_document}: ${identityData.number}`)
        setIdentityData({type_document:'', number:''})
        return
      }

      if(request.length){
        toast.success(`${request[0].PRIMER_NOMBRE} ${request[0].PRIMER_APELLIDO} encontrado`)
        setData(request[0])
        setIdentityData({type_document:'', number:''})
        //router.push(`/inicio?type=${documentType}&document=${documentNumber}`);
        return
      }
    }

  
  };

  useEffect(()=>{
    getDocuments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[getAllDocuments])

  useEffect(()=>{
    if((document && type) && (!identityData.number && !identityData.type_document)){
      setIdentityData({number: document, type_document: type})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[document, type])

  useEffect(()=>{
    if((document && type) && (identityData.number && identityData.type_document)){
      handleSubmit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[identityData])


  return (
    <div
      className="w-full h-screen transition-all duration-500 ease-in-out transform animate-fadeUp"
    >
      {
        data ? 
          <DataClientComponent
            data={data}
            setData={setData}
            loading={loadingData}
            documents={documents}
            getBenefitsBoard={getBenefitsBoard}
            getFamilyBoard={getFamilyBoard}
          />
        :
          <div
            style={{background:'linear-gradient(to bottom, #4d73b4 50%, white 50%)'}}
            className={`${ data ? 'hidden' : 'block'} w-full h-screen`}>
            <div className="text-center flex flex-col items-center justify-center h-[45%]">
              <div className="w-4/5 flex flex-col items-center justify-center">
                <h1 className="uppercase font-bold text-3xl md:text-6xl text-white">Solución360º</h1>
                <h3 className=" text-xl mt-2 text-white w-4/5">Comparte datos, identifica patrones y genera decisiones de impacto.</h3>
              </div>
            </div>
            <div
              className="h-[10%] flex flex-col items-center justify-center"
            >
              <div
                className={`flex flex-col md:flex-row h-4/5 bg-white rounded-full shadow-xl m-auto overflow-hidden w-1/2`}
              >
                <div
                  className="w-3/12"
                >
                  <select
                    className={`${ loadingDocuments ? 'bg-white' : 'bg-gradient-to-b from-slate-100 to-white'} border border-slate-200 w-full h-full outline-0 m-auto text-gray-400 text-sm text-center`}
                    value={identityData.type_document}
                    onChange={(e) =>{
                      setIdentityData((prevState) => ({...prevState, type_document: e.target.value}))
                    }}
                  >
                    <option
                      disabled
                      value=''
                    >
                      {
                        loadingDocuments ?
                          'Cargando...'
                        :
                          'Seleccione'
                      }
                    </option>
                    {
                      documents.length ? 
                        documents.map((document, i)=>(
                          <option
                            key={i}
                            value={document.codigo}
                          >{ document.campo }</option>
                        ))
                      :
                        <option
                          disabled
                          value=''
                        >Error al cargar documentos</option>
                    }
                  </select>
                </div>
                <div
                  className="w-7/12"
                >
                  <input
                    type="number"
                    placeholder="Número de Doc"
                    className={`w-full h-full outline-0 m-auto text-sm px-5 text-gray-400 no-arrows`}
                    value={identityData.number}
                    pattern="[0-9]+"
                    onChange={(e) => setIdentityData((prevState) =>({...prevState, number: e.target.value}))}
                    disabled={loadingData}
                  />
                </div>
                <div
                  className="w-2/12 rounded-r-full p-1"
                >
                  <button
                    type="submit"
                    className="bg-accent h-full w-full rounded-r-full cursor-pointer flex items-center justify-center disabled:opacity-80"
                    disabled={loadingDocuments ?  loadingDocuments : loadingData}
                    onClick={() => handleSubmit()}
                  >
                    {
                      loadingData ? 
                        <LinearSpinerLoading
                          width={20}
                          height={20}
                        />
                      :
                        <MagnifyGlassIcon
                          size={20}
                          fill="#fff"
                        />
                    }
                  </button>
                </div>
              </div>
            </div>                  
            <div className="flex flex-col w-full h-[45%]">
              <div className="w-full md:w-4/5 m-auto">
                <h2 className="text-center text-black text-2xl font-semibold">Realice la búsqueda en 3 pasos:</h2>
                <div className="flex flex-col md:flex-row mt-5 justify-center items-center">
                  {
                    homeStepByStep.map( item =>(
                      
                      <div key={item.id} className="flex flex-col w-full md:flex-row md:w-1/3 md:h-28">
                        
                        <div className="w-1/5 md:w-2/5 flex justify-end">
                          <div className="h-14 w-14 bg-main text-white text-center text-3xl flex items-center justify-center rounded-full">{ item.id }</div>
                        </div>
                        
                        <div className="w-4/5 md:w-3/5 text-lg relative">
                          <p className="text-[16px] absolute top-5 p-3 leading-5 text-black">
                            { item.step }
                          </p>
                        </div>
                      </div>

                    ))
                  
                  }
                </div>
              </div>
            </div>
          </div>
      }

    </div>
  );
}
