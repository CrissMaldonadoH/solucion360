import { StaticImageData } from "next/image"
import { RefObject, ComponentType, Dispatch, SetStateAction } from "react"

export type userResponse ={
    id:number,
    nombre: string,
    entidad: string,
    correo: string,
    perfil:string,
    tiempoInactividad: number,
    tyc:number,
    accesos:{
        "Consultar ciudadano":number,
        "Datos actuales del ciudadano":number,
        "Datos históricos del ciudadano":number,
        "Grupo familiar del ciudadano":number,
        "Ver tableros":number,
        "Ver anomalías":number,
        "Consultar listados":number,
        "Componente Geográfico":number,
        "Calidad de datos":number,
        "Administrar usuarios":number
    }
}

export type getUserResponseType = {
    recordsets: [ userResponse[] ],
    recordset: userResponse[],
    output: object,
    rowsAffected: [ number ]
  }

export type requestOptions= {
    method: string,
    headers: {
        "Content-Type": string,
        token?:string
        'Access-Control-Allow-Credentials'?: string,
        Authorization?: string,
    },
    body?:string,
}

export type responseStructure ={
    body: object | null,
    bodyUsed: boolean,
    headers: object,
    ok: boolean,
    redirected:boolean,
    status: number,
    statusText:string,
    type: string,
    url: string,
}

export type FilterParamsStructure={
    [param:string]: string | number | undefined, 
    numero_documento?:string,
    tipo_documento?:string | number,
    id_hogar?:string,
    fuente?:string,
}

export type fetchDataProps = {
    endpoint: string,
    method: string,
    view:string,
    fuente?: string,
    params:{
        [param:string]: string | number | FilterParamsStructure | undefined,
        filter?:FilterParamsStructure,
        groupby?:string,
        select?:string,
        start_index?:number,
        count?:number,
    } | CustomParamsType,
}

export type fetchDataResponse ={
    response: responseStructure,
    data: {
        message?: string,
        token?: string,
        id_conv?: string,
        detail?: string,
    } | string
} | null

export type CitizenType= {
  TIPO_DOCUMENTO: number;
  NUMERO_DOCUMENTO: number;
  FUENTE: number;
  ID_HOGAR: string;
  EDAD: number;
  TELEFONO: string;
  PRIMER_NOMBRE: string;
  SEGUNDO_NOMBRE: string;
  PRIMER_APELLIDO: string;
  SEGUNDO_APELLIDO: string;
  SEXO: string;
  INDIGENA: number;
  FALLECIDO: number;
  GITANO: number;
  HABITANTE_CALLE: number;
  NAP: number;
  RAIZAL: number;
  REGIMEN_CAPITAL_SALUD: string;
  PENSIONADO: number;
  COLOMBIA_MAYOR: number;
  BOGOTA_CUIDADORA: number;
  LGTBI: number;
  DISCAPACIDAD: number;
  RURAL: number;
  MIGRANTE: number;
  INSEGURIDAD_ALIMENTARIA: string;
  PALENQUERO: number;
  VICTIMA: number;
  TENENCIA_VIVIENDA: string;
  COD_LOCALIDAD: number;
  COD_UPZ: number;
  LATITUD: number;
  LONGITUD: number;
  DIRECCION_VIVIENDA: string;
  NOMLOCALIDAD: string;
  NOMUPZ: string;
  PARENTESCO: string;
  GRUPO_SISBEN: string;
  CLASIFICACION_SISBEN: string;
  ID_HOGAR_SIRBE: string;
  ID_HOGAR_SISBEN: string;
};

export type DataSidebarProps={
    data: CitizenType,
    documents: getAllDocumentsType[]
}

export type DataDashboardProps={
    data: CitizenType,
    tableroBeneficio: TableroBeneficioType[],
    tableroBeneficioLoading: boolean,
    setData: Dispatch<SetStateAction<CitizenType | null>>,
    tableroFamilia: tableroFamiliaType[],
    tableroFamiliaLoading:boolean,
}

export type TableroBeneficioType = {
  TIPO_DOCUMENTO: number;
  NUMERO_DOCUMENTO: number;
  ANIO: number;
  CICLO: number;
  CANTIDAD_ENTREGAS: number;
  MONTO_ENTREGADO: number | null;
  SERVICIO: string;
  FECHA_ENTREGA: string; // ISO date string (e.g., "2024-03-04T00:00:00.000Z")
  ENTIDAD: string;
  CENTRO_ATENCION: string;
  UNIDAD_MEDIDA_ENTREGA: string;
  [key: string]: string | number | null;
};

export type TableroBeneficioResponse = {
    recordsets: [ TableroBeneficioType[] ],
    recordset: TableroBeneficioType[],
    output: object,
    rowsAffected: [ number ]
  }

export type TableroBeneficioTypeExtended = {
  [key: string]: string | number | null;
  MONTH: string;
  CENTRO_ATENCION: string;
  ANIO: number;
  CICLO: string | number;
  SERVICIO: string;
  ENTIDAD: string;
  CANTIDAD_ENTREGAS: string | number;
  FECHA_ENTREGA: string;
  MONTO_ENTREGADO: number | null;
};

export type VistaCiudadanoProps={
    tableroBeneficio: TableroBeneficioType[],
    valorServicio:number,
    data: CitizenType,
    tableroBeneficioLoading:boolean
}

export type VistaHistoricoCiudadanoProps={
    tableroBeneficio: TableroBeneficioType[],
    data: CitizenType,
    tableroBeneficioLoading:boolean
}

export interface tableroFamiliaType {
  TIPO_DOCUMENTO: string;
  NUMERO_DOCUMENTO: number;
  PRIMER_NOMBRE: string;
  SEGUNDO_NOMBRE: string;
  PRIMER_APELLIDO: string;
  SEGUNDO_APELLIDO: string;
  ID_HOGAR: string;
  EDAD: number;
  COD_LOCALIDAD: number;
  NOMLOCALIDAD: string;
  COD_UPZ: number;
  NOMUPZ: string;
  TELEFONO: string;
  INDIGENA: number;
  GITANO: number;
  NAP: number;
  PALENQUERO: number;
  RAIZAL: number;
  VICTIMA: number;
  HABITANTE_CALLE: number;
  LGTBI: number;
  MIGRANTE: number;
  RURAL: number;
  DISCAPACIDAD: number;
  CODIGO_BENEFICIO: number;
  BENEFICIO: string;
  FECHA_ULTIMA_ENTREGA: string
}

export type FamiliaCiudadanoProps={
    tableroFamilia: tableroFamiliaType[],
    tableroFamiliaLoading:boolean,
    setData: Dispatch<SetStateAction<CitizenType | null>>
}

//TEMPORAL
export type Tablero = {
  tablero: string;
  route: string;
  iframe: string;
  api?: boolean;
  vista?: string;
  urlAPi?: {
        endpoint: string;
        view: string;
        params: {
            start_index: number;
            count: number;
        };
    } | string;
  titulo?: string;
  texto?: string;
};

type Estrategia = {
  id: string;
  servicio: string;
  fecha: string;
  tablero:string
  //tableros: Tablero[];
};

type Servicio = {
  id: string;
  servicio: string;
  fecha: string;
  tablero:string
  //tableros: Tablero[];
};

type AnomaliaEstrategia = {
  estrategias: Estrategia[];
};

type AnomaliaServicio = {
  servicios: Servicio[];
};

export type SdisType = {
  id: number;
  idSecretaria: string;
  secretaria: string;
  colorExt: string;
  colorInt: string;
  logo: StaticImageData; 
  icono: StaticImageData;
  estrategias: Estrategia[];
  servicios: Servicio[];
  anomalias: (AnomaliaEstrategia | AnomaliaServicio)[];
};

type PropertyType = 'string' | 'number';

type SchemaProperty = {
  type: PropertyType;
};

export type SchemaPropertiesType = {
  [key: string]: SchemaProperty;
};

export type SchemaDefinitionType = {
  name: string;
  properties: SchemaPropertiesType;
}[];

export type FiltersType = {
  indices: {
    initial: number;
    final: number;
  };
  ageGroup: {
    initial: number;
    final: number;
  };
  upz: UpzType[];
};


type BetweenFilter = {
  between: [number, number];
};

type DatesFilter = {
  between: [string, string];
};

export type CustomParamsType = {
  COD_LOCALIDAD: number;
  COD_UPZ: number;
  HABITANTE_CALLE: number;
  LGTBI: number;
  MIGRANTE: number;
  RURAL: number;
  DISCAPACIDAD: number;
  VICTIMA: number;
  EDAD?: BetweenFilter;
  FECHA_ULTIMA_ENTREGA?: DatesFilter;
  [key: string]: string | number | BetweenFilter | undefined | DatesFilter;
};

export type FormularioFiltrosProps = {
  handleFilter: (e: React.FormEvent<HTMLFormElement>) => void;
  handleLocalidadChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;

  initialDateRef: RefObject<HTMLInputElement | null>;
  finalDateRef: RefObject<HTMLInputElement | null>;
  initialAgeGroupRef: RefObject<HTMLInputElement | null>;
  finalAgeGroupRef: RefObject<HTMLInputElement | null>;

  servicioRef: RefObject<HTMLSelectElement | null>;
  localidadRef: RefObject<HTMLSelectElement | null>;
  upzRef: RefObject<HTMLSelectElement | null>;
  grupoEtnicoRef: RefObject<HTMLSelectElement | null>;

  victimaRef: RefObject<HTMLInputElement | null>;
  habitanteCalleRef: RefObject<HTMLInputElement | null>;
  lgbtiRef: RefObject<HTMLInputElement | null>;
  migranteRef: RefObject<HTMLInputElement | null>;
  ruralRef: RefObject<HTMLInputElement | null>;
  discapacidadRef: RefObject<HTMLInputElement | null>;

  optionsLocalidades: string[];
  initialAgeGroup: number;
  setInitialAgeGroup: (value: number) => void;
  finalAgeGroup: number;
  setFinalAgeGroup: (value: number) => void;
  upz: UpzType[];
  listOfBenefist: ListOfBenefistType[],
  listOfBenefistLoading:boolean,
  listOfLocations: LocalidadType[],
  listOfLocationsLoading: boolean,
  listOfUpz:UpzType[],
  listOfUpzLoading: boolean,
};


export type ListadoResultadosProps = {
  gettingLists: ListOfPersonType[]; 
  handleDecrease: (url: fetchDataProps) => Promise<void>;
  handleIncrease: (url: fetchDataProps) => Promise<void>;
  tableRef: RefObject<HTMLTableElement | null>;
  dataListLoading: boolean,
};

export type AdministrarUsuariosClientComponentProps={
    getUsers:() =>Promise<userResponse[] | null>,
    editUsers: (dataUser: userResponse) => Promise<boolean | null>,
    createUsers: (dataUser: {nombre: string, entidad: string, correo: string, perfil: string,}) => Promise<boolean | null>,
    deleteUsers: (id:number) => Promise<boolean | null>,
}

export type AppUserType={
    user: userResponse
    setEditUser: Dispatch<SetStateAction<boolean>>,
    setEditUserData: Dispatch<SetStateAction<userResponse | null>>,
    setUserToDelete: Dispatch<SetStateAction<{id:number, nombre:string} | null>>,
}

export type NavItem = {
  name: string;
  href: string;
  icon: ComponentType<{size:number, fill?:string}>;
};

export type DecodedUserToken= {
  id: number;
  nombre: string;
  entidad: string;
  correo: string;
  perfil: string;
  tiempoInactividad: string;
  tyc: number;
  accesos: Record<string, number>;
  iat: number;
  exp: number;
}

export type getAllDocumentsType ={
    codigo:number,
    sigla: string,
    campo: string,
}

export type getAllDocumentsTyperesponse = {
    recordsets: [ getAllDocumentsType[] ],
    recordset: getAllDocumentsType[],
    output: object,
    rowsAffected: [ number ]
  }

export type CitizenTypeResponse = {
  recordsets: [ CitizenType[] ],
  recordset: CitizenType[],
  output: object,
  rowsAffected: [ number ]
}

export type InicioClientComponentProps={
  getAllDocuments:()=> Promise<getAllDocumentsType[] | null>,
  getCitizenInformation:(type_document: number, number: number) => Promise<CitizenType[] | null>,
  getBenefitsBoard: (type_document: number, number: number) => Promise<TableroBeneficioType[] | null>,
  getFamilyBoard:(id_hogar:number) => Promise<unknown>
}

export type DataClientComponetProps={
  data: CitizenType,
  setData: Dispatch<SetStateAction<CitizenType | null>>,
  loading:boolean,
  documents: getAllDocumentsType[],
  getBenefitsBoard: (type_document: number, number: number) => Promise<TableroBeneficioType[] | null>,
  getFamilyBoard: (id_hogar:number) => Promise<unknown>
}

export type ListadosClientComponentProps={
  getBenefistList:() => Promise<ListOfBenefistType[] | null>,
  getLocationsList:() => Promise<LocalidadType[] | null>,
  getUpzList:(codigo_localidad:number) => Promise<UpzType[] | null>,
  getPeopleList:(conditions: CustomParamsType) => Promise<ListOfPersonType | null>,
  getAllPeopleList:() => Promise<ListOfPersonType | null>,
  getPeopleListCount: (conditions: CustomParamsType) => Promise<countType | null>,
  getAllPeopleListCount: () => Promise<countType | null>,
  getHomesListCount: (conditions: CustomParamsType) => Promise<countType | null>,
  getAllHomesListCount: () => Promise<countType | null>,
}

export type ListOfBenefistType = {
  CODIGO: number;
  ENTIDAD: string;
  BENEFICIO: string;
  UNIDAD_MEDIDA_ENTREGA: string | null;
};

export type LocalidadType = {
  CODIGO: number;
  LOCALIDAD: string;
};

export type UpzType = {
  CODIGO: number;
  UPZ: string;
  CODIGO_LOCALIDAD:number;
};

export type ListOfPersonType = {
  TIPO_DOCUMENTO: string;
  NUMERO_DOCUMENTO: number;
  PRIMER_NOMBRE: string;
  SEGUNDO_NOMBRE: string;
  PRIMER_APELLIDO: string;
  SEGUNDO_APELLIDO: string;
  ID_HOGAR: string;
  EDAD: number;
  COD_LOCALIDAD: number;
  NOMLOCALIDAD: string;
  COD_UPZ: number;
  NOMUPZ: string;
  TELEFONO: string;
  INDIGENA: number;
  GITANO: number;
  NAP: number;
  PALENQUERO: number;
  RAIZAL: number;
  VICTIMA: number;
  HABITANTE_CALLE: number;
  LGTBI: number;
  MIGRANTE: number;
  RURAL: number;
  DISCAPACIDAD: number;
  CODIGO_BENEFICIO: number;
  BENEFICIO: string;
  FECHA_ULTIMA_ENTREGA: string; // ISO date string
};

export type countType ={
  total: number
}