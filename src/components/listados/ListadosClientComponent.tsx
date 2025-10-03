'use client'
import { useCitizenAndHouseholdData } from "@/src/hooks/useCitizenAndHouseholdData"
import { useState, useRef, useEffect } from "react";
import { localidadesYUpz } from "../staticData/FiltroPorLocalidadYUpz";
import { FiltersType } from "@/src/types/Types";
import { CustomParamsType, } from "@/src/types/Types";
import FormularioFiltros from "./FormularioFiltros";
import VisionGeneral from "./VisionGeneral";
import ListadoResultados from "./ListadoResultados";
import { ListadosClientComponentProps, ListOfBenefistType, LocalidadType, UpzType, ListOfPersonType} from "@/src/types/Types";
import { toast } from "react-toastify";

//SELECT * FROM [sql_maestra_s360].S_360.POC_LISTADO_PERSONAS WHERE COD_LOCALIDAD = 98(Caquetá) AND COD_UPZ = 120(Florencia) AND HABITANTE_CALLE = 1 AND LGTBI = 1 AND MIGRANTE = 0 AND RURAL = 0 AND DISCAPACIDAD = 0 AND VICTIMA = 0 AND CODIGO_BENEFICIO = 402(Afiliación al Regimén Subsidiado) AND EDAD BETWEEN 10 AND 20 AND FECHA_ULTIMA_ENTREGA BETWEEN '2024-01-01' AND '2024-12-31'

export default function ListadosClientComponent({getBenefistList, getLocationsList, getUpzList, getPeopleList, getAllPeopleList, getPeopleListCount, getAllPeopleListCount, getHomesListCount, getAllHomesListCount}:ListadosClientComponentProps) {

  const {
    loadDataByPagination,
  } = useCitizenAndHouseholdData();

  const [filters, setFilters] = useState<FiltersType>({
    indices: { initial: 10, final: 20 },
    ageGroup: { initial: 0, final: 0 },
    upz: [],
  });

  const [listOfBenefist, setListOfBenefist] = useState<ListOfBenefistType[]>([])
  const [listOfBenefistLoading, setListBenefistLoading] = useState<boolean>(false)
  const [listOfLocations, setListOfLocations] = useState<LocalidadType[]>([])
  const [listOfLocationsLoading, setListOfLocationsLoading] = useState<boolean>(false)
  const [listOfUpz, setListOfUpz] = useState<UpzType[]>([])
  const [listOfUpzLoading, setListOfUpzLoading] = useState<boolean>(false)
  const [dataList, setDataList] = useState<ListOfPersonType[]>([])
  const [dataListLoading, setDataListLoading] = useState<boolean>(false)
  const [totalCitizens, setTotalCitizens] = useState<number>(0)
  const [totalCitizensLoading, setTotalCitizensLoading] = useState<boolean>(false)
  const [totalHouseholds, setTotalHouseholds] = useState<number>(0)
  const [totalHouseholdsLoading, setTotalHouseholdsLoading] = useState<boolean>(false)

  const refs = {
    servicio: useRef<HTMLSelectElement | null>(null),
    localidad: useRef<HTMLSelectElement | null>(null),
    upz: useRef<HTMLSelectElement | null>(null),

    grupoEtnicoRef: useRef<HTMLSelectElement | null>(null),

    victimaRef: useRef<HTMLInputElement | null>(null),
    habitanteCalleRef: useRef<HTMLInputElement | null>(null),
    lgbtiRef: useRef<HTMLInputElement | null>(null),
    migranteRef: useRef<HTMLInputElement | null>(null),
    ruralRef: useRef<HTMLInputElement | null>(null),
    discapacidadRef: useRef<HTMLInputElement | null>(null),

    initialAgeGroup: useRef<HTMLInputElement | null>(null),
    finalAgeGroup: useRef<HTMLInputElement | null>(null),
    initialDate: useRef<HTMLInputElement | null>(null),
    finalDate: useRef<HTMLInputElement | null>(null),

    apiForPagination: useRef<HTMLInputElement | null>(null),
};

  const tableRef = useRef<HTMLTableElement | null>(null);

  const optionsLocalidades = Object.keys(localidadesYUpz);

  const handleLocalidadChange = async(e: React.ChangeEvent<HTMLSelectElement>) => {
    setListOfUpzLoading(true)
    const selectedLocalidad = parseInt(e.target.value);

    const handleUpz = await await getUpzList(selectedLocalidad)
    setListOfUpzLoading(false)
    if(handleUpz === null){
      toast.error('No se pudo cargar lista de Servicios')
      return
    }

    if(handleUpz && Array.isArray(handleUpz)){
      setListOfUpz(handleUpz)
      if (refs.upz.current) {
        refs.upz.current.selectedIndex = 0;
      }
  
      setFilters((prevFilters) => ({ ...prevFilters, upz: handleUpz }));
    }

    // Restablecer el valor del select de UPZ a la primera opción
  };

  const handleFilter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const customParams:CustomParamsType = {
      COD_LOCALIDAD: parseInt(refs.localidad.current?.value || ''),
      COD_UPZ: parseInt(refs.upz.current?.value || ''),
      HABITANTE_CALLE: refs.habitanteCalleRef.current?.checked ? 1 : 0,
      LGTBI: refs.lgbtiRef.current?.checked ? 1 : 0,
      MIGRANTE: refs.migranteRef.current?.checked ? 1 : 0,
      RURAL: refs.ruralRef.current?.checked ? 1 : 0,
      DISCAPACIDAD: refs.discapacidadRef.current?.checked ? 1 : 0,
      VICTIMA: refs.victimaRef.current?.checked ? 1 : 0,
    };

    if(refs.servicio.current && refs.servicio.current.value) {
      //customParams[refs.servicio.current.value] = 1;
      customParams['CODIGO_BENEFICIO'] = parseInt(refs.servicio.current.value)
    }

    if (refs.grupoEtnicoRef.current && refs.grupoEtnicoRef.current.value) {
      customParams[refs.grupoEtnicoRef.current.value] = 1;
    }

    if (filters.ageGroup.initial !== 0 && filters.ageGroup.final !== 0) {
      customParams["EDAD"] = {
        between: [filters.ageGroup.initial, filters.ageGroup.final],
      };
    }

    if ((refs.initialDate.current && refs.initialDate.current.value) && (refs.finalDate.current && refs.finalDate.current.value)) {
      customParams["FECHA_ULTIMA_ENTREGA"] = {
        between: [refs.initialDate.current.value, refs.finalDate.current.value],
      };
    }

    setDataListLoading(true)
    setTotalCitizensLoading(true)
    setTotalHouseholdsLoading(true)
    
    const persons = await getPeopleList(customParams)
    const totalPersons = await getPeopleListCount(customParams)
    const totalHousesRequest = await getHomesListCount(customParams)

    
    setDataListLoading(false)
    setTotalCitizensLoading(false)
    setTotalHouseholdsLoading(false)

    if(persons === null){
      toast.error('No se pudo cargar lista de personas')
      return
    }
    
    if(totalPersons === null){
      toast.error('No se pudo cargar la cantidad de personas')
      return
    }

    if(totalHousesRequest === null){
      toast.error('No se pudo cargar la cantidad de Hogares')
      return
    }

    if(persons && Array.isArray(persons)) setDataList(persons)

    if(totalPersons && Array.isArray(totalPersons)) setTotalCitizens(totalPersons[0].total)
    
    if(totalHousesRequest && Array.isArray(totalHousesRequest)) setTotalHouseholds(totalHousesRequest[0].total)

  };

  const benefistList = async()=>{
    setListBenefistLoading(true)

    const request = await getBenefistList()
    
    setListBenefistLoading(false)

    if(request === null){
      toast.error('No se pudo cargar lista de Servicios')
      return
    }

    if(request && Array.isArray(request)) setListOfBenefist(request)
  }

  const locationsList = async()=>{
    setListOfLocationsLoading(true)

    const request = await getLocationsList()
    
    setListOfLocationsLoading(false)
    
    if(request === null){
      toast.error('No se pudo cargar lista de Localidades')
      return
    }

    

    if(request && Array.isArray(request)){

      setListOfLocations(request)
      
      setListOfUpzLoading(true)
      const requestUPZ = await getUpzList(request[0].CODIGO)
      setListOfUpzLoading(false)
      
      if(requestUPZ === null){
        toast.error('No se pudo cargar lista de UPZ')
        return
      }
      if(requestUPZ && Array.isArray(requestUPZ)){
        setListOfUpz(requestUPZ)
      }
    }
  }


  const peopleList = async()=>{
    setDataListLoading(true)

    const request = await getAllPeopleList()
    
    setDataListLoading(false)

    if(request === null){
      toast.error('No se pudo cargar lista de Personas')
      return
    }

    if(request && Array.isArray(request)) setDataList(request)
  }

  const peopleListCount = async()=>{
    setTotalCitizensLoading(true)

    const request = await getAllPeopleListCount()
    
    setTotalCitizensLoading(false)

    if(request === null){
      toast.error('No se pudo cargar el total de Personas')
      return
    }

    if(request && Array.isArray(request)) setTotalCitizens(request[0].total)
  }

  const homesListCount = async()=>{
    setTotalHouseholdsLoading(true)

    const request = await getAllHomesListCount()
    
    setTotalHouseholdsLoading(false)

    if(request === null){
      toast.error('No se pudo cargar el total de Hogares')
      return
    }

    if(request && Array.isArray(request)) setTotalHouseholds(request[0].total)
  }


  useEffect(()=>{
    benefistList()
    locationsList()
    peopleList()
    peopleListCount()
    homesListCount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[getBenefistList, getLocationsList,  getAllPeopleList, getAllPeopleListCount, getAllHomesListCount])

  return (
    <div className="mt-15 mx-5 mb-5 flex flex-col md:flex-row">
      <FormularioFiltros
        handleFilter={handleFilter}
        handleLocalidadChange={handleLocalidadChange}
        initialDateRef={refs.initialDate}
        finalDateRef={refs.finalDate}
        initialAgeGroupRef={refs.initialAgeGroup}
        finalAgeGroupRef={refs.finalAgeGroup}
        servicioRef={refs.servicio}
        localidadRef={refs.localidad}
        upzRef={refs.upz}
        initialAgeGroup={filters.ageGroup.initial}
        setInitialAgeGroup={(value) =>
          setFilters((prevFilters) => ({
            ...prevFilters,
            ageGroup: { ...prevFilters.ageGroup, initial: value },
          }))
        }
        finalAgeGroup={filters.ageGroup.final}
        setFinalAgeGroup={(value) =>
          setFilters((prevFilters) => ({
            ...prevFilters,
            ageGroup: { ...prevFilters.ageGroup, final: value },
          }))
        }
        upz={filters.upz}
        optionsLocalidades={optionsLocalidades}
        victimaRef={refs.victimaRef}
        habitanteCalleRef={refs.habitanteCalleRef}
        lgbtiRef={refs.lgbtiRef}
        migranteRef={refs.migranteRef}
        ruralRef={refs.ruralRef}
        discapacidadRef={refs.discapacidadRef}
        grupoEtnicoRef={refs.grupoEtnicoRef}
        listOfBenefist={listOfBenefist}
        listOfBenefistLoading={listOfBenefistLoading}
        listOfLocations={listOfLocations}
        listOfLocationsLoading={listOfLocationsLoading}
        listOfUpz={listOfUpz}
        listOfUpzLoading={listOfUpzLoading}
      />
        <div className="w-full md:w-[75%] px-3">
          <VisionGeneral
            totalCitizens={totalCitizens}
            totalHouseholds={totalHouseholds}
            totalCitizensLoading={totalCitizensLoading}
            totalHouseholdsLoading={totalHouseholdsLoading}
          />
          <ListadoResultados
            gettingLists={dataList}
            handleDecrease={loadDataByPagination}
            handleIncrease={loadDataByPagination}
            tableRef={tableRef}
            dataListLoading={dataListLoading}
          />
        </div>
    </div>
  )
}
