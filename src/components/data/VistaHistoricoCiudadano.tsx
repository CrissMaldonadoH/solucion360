import { VistaHistoricoCiudadanoProps, TableroBeneficioType, TableroBeneficioTypeExtended } from "@/src/types/Types"
import { useState, useRef, useEffect } from "react"
import LinesChart from "../charts/LinesChart"

export default function VistaHistoricoCiudadano({tableroBeneficio, tableroBeneficioLoading}:VistaHistoricoCiudadanoProps) {
    const [ selectEntityFilter, setSelectEntityFilter ] = useState<string>('')
    const [ selectYearfilter, setSelectYearfilter] = useState<string>('') 
    const [ selectServiceFilter, setSelectServiceFilter ] = useState<string>('')
    const [ selectMonthFilter, setSelectMonthFilter ] = useState<string>('')
    const [ month, setMonth ] = useState<string[]>([])
    const [ selectService, setSelectService ] = useState<string[]>()
    const [ filteredByEntity, setFilteredByEntity ] = useState<Record<string, TableroBeneficioType[]>>({});
    const [byYear, setByYear] = useState<{ [key: string]: TableroBeneficioTypeExtended[]; } | null>(null);
    const [ linesChart, setLinesChart ] = useState<string[]>([])
    const [ selectEntity, setSelectEntity ] = useState<string[]>([])
    const [ selectAnio, setSelectAnio ] = useState<string[]>([])
    


    const err = useRef<string | null>(null);
    const leakedData = useRef<TableroBeneficioType[]>([]);
    const serviceValueRef = useRef<HTMLSelectElement>(null); 
    //const historicTableRef = useRef<HTMLTableElement | null>(null);

    let totalValuePayments: number = 0;
    let totalDeliveries: number = 0;
    const allServicesAllyearsArr1: TableroBeneficioTypeExtended[] = [];

    //const filteredObj: Record<string, any> = {};
    let dataLineChart: { [x: string]: string | number | null; MONTH: string; }[] = [];
   
    useEffect(()=>{
      if( tableroBeneficio){

        const filterByEntity = tableroBeneficio.filter((item): item is TableroBeneficioType & { ENTIDAD: string } => item.ENTIDAD !== null).reduce<Record<string, TableroBeneficioType[]>>((el, item) => {
          if (!el[item.ENTIDAD]) {
            el[item.ENTIDAD] = []
          }

          el[item.ENTIDAD].push(item)
          return el
        }, {})

        setFilteredByEntity(filterByEntity)

        const entities:string[] = []
        for(const entity in filterByEntity){
          entities.push(entity)
        }

        setSelectEntity(entities)

        const filterByServices = tableroBeneficio.filter((item): item is TableroBeneficioType & { SERVICIO: string } => item.SERVICIO !== null).reduce<Record<string, TableroBeneficioType[]>>((el, item) => {
          if (!el[item.SERVICIO]) {
            el[item.SERVICIO] = [];
          }
          el[item.SERVICIO].push(item);
          return el;
        }, {});

        const services:string[] = []

        for (const service in filterByServices) {
          services.push(service)
        }

        setLinesChart(services)
        

        const filterByAnio = tableroBeneficio.filter((item): item is TableroBeneficioType & { ANIO: string } => item.ANIO !== null).reduce<Record<string, TableroBeneficioTypeExtended[]>>((el, item) => {

          if (!el[item.ANIO]) {
              el[item.ANIO] = []
          }

          const obj = {
              MONTH: `${ item.CICLO == 1 ? 'Ene' : item.CICLO == 2 ? 'Feb' :  item.CICLO == 3 ? 'Mar' :  item.CICLO == 4 ? 'Abr' :  item.CICLO == 5 ? 'May' :  item.CICLO == 6 ? 'Jun' :  item.CICLO == 7 ? 'Jul' :  item.CICLO == 8 ? 'Ago' :  item.CICLO == 9 ? 'Sep' :  item.CICLO == 10 ? 'Oct' :  item.CICLO == 11 ? 'Nov' : 'Dic' }`,
              [`${item.SERVICIO}`]: item.MONTO_ENTREGADO,
              [`cantidad_entregas_${item.servicio}`]: item.CANTIDAD_ENTREGAS,
              [`monto_entregado_${item.servicio}`]: item.MONTO_ENTREGADO,
              [`entidad_${item.entidad}`]: item.ENTIDAD,
              [`monto_entregado_${item.entidad}`]: item.MONTO_ENTREGADO,
              [`cantidad_entregas_${item.entidad}`]: item.CANTIDAD_ENTREGAS,
              [`servicio_${item.entidad}`] : item.SERVICIO,
              CENTRO_ATENCION: item.CENTRO_ATENCION,

              ANIO: item.ANIO,
              CICLO: item.CICLO,
              SERVICIO: item.SERVICIO,
              ENTIDAD: item.ENTIDAD,
              CANTIDAD_ENTREGAS: item.CANTIDAD_ENTREGAS,
              FECHA_ENTREGA: item.FECHA_ENTREGA,
              MONTO_ENTREGADO: item.MONTO_ENTREGADO ?? 0,
          }

          
          if(el[item.ANIO].length !== 0){
              const keysObj1 = Object.keys(obj)
              
              for(let i = 0; i < el[item.ANIO].length; i++){

                  const keysObj2 = Object.keys(el[item.ANIO][i])
                  

                  if(el[item.ANIO][i].month === obj.month){

                      for (const key of keysObj2) {
                        
                          if (!keysObj1.includes(key)) {
                            
                            obj[key] = el[item.ANIO][i][key]
                            
                          }
                      }

                 } 
              }
          }
          
          el[item.ANIO].push(obj)
          return el
       }, {})


       const emptyArr1:{[key:string]: TableroBeneficioTypeExtended[]} = {}
       
       for (const anio in filterByAnio) {

        const emptyArr2 = []

        for(let i = 0 ; i < filterByAnio[anio].length; i++ ){

          if(emptyArr2.length === 0){

            emptyArr2.push(filterByAnio[anio][i])

          }else{

            if(emptyArr2.filter(el => el.month === filterByAnio[anio][i].month).length === 0 ){
              
              emptyArr2.push(filterByAnio[anio][i])
  
            }else{

              emptyArr2.pop()
              emptyArr2.push(filterByAnio[anio][i])
            }

          }
        }

        emptyArr1[`${anio}`] = emptyArr2
      }

      setByYear(emptyArr1)
      
      const years:string[] = []
      for (const anio in filterByAnio) {
          years.push( anio )
      }
      setSelectAnio(years)
    }
    },[tableroBeneficio])

    // Inicio - Rendimiento de todos los servicios en todos los años

    const allServicesAllYears = tableroBeneficio.reduce<Record<string, TableroBeneficioTypeExtended[]>>((el, item) => {

      if (!el[item.ANIO]) {
          el[item.ANIO] = []
      }

      const obj = {
          MONTH: `${item.ANIO}-${ item.CICLO == 1 ? 'Ene' : item.CICLO == 2 ? 'Feb' :  item.CICLO == 3 ? 'Mar' :  item.CICLO == 4 ? 'Abr' :  item.CICLO == 5 ? 'May' :  item.CICLO == 6 ? 'Jun' :  item.CICLO == 7 ? 'Jul' :  item.CICLO == 8 ? 'Ago' :  item.CICLO == 9 ? 'Sep' :  item.CICLO == 10 ? 'Oct' :  item.CICLO == 11 ? 'Nov' : 'Dic' }`,
          [`${item.SERVICIO}`]: item.MONTO_ENTREGADO, 
          [`cantidad_entregas_${item.SERVICIO}`]: item.CANTIDAD_ENTREGAS,
          [`monto_entregado_${item.SERVICIO}`]: item.MONTO_ENTREGADO,
          [`entidad_${item.ENTIDAD}`]: item.ENTIDAD,
          CENTRO_ATENCION: item.CENTRO_ATENCION,

          ANIO: item.ANIO,
          CICLO: item.CICLO,
          SERVICIO: item.SERVICIO && typeof item.SERVICIO == 'string' ? item.SERVICIO : '',
          ENTIDAD: item.ENTIDAD, 
          CANTIDAD_ENTREGAS: item.CANTIDAD_ENTREGAS, 
          FECHA_ENTREGA: item.FECHA_ENTREGA,
          MONTO_ENTREGADO: item.MONTO_ENTREGADO,
      }
      

      if(el[item.ANIO].length !== 0){
          const keysObj1 = Object.keys(obj)
          
          for(let i = 0; i < el[item.ANIO].length; i++){

              const keysObj2 = Object.keys(el[item.ANIO][i])
              

              if(el[item.ANIO][i].month === obj.month){

                  for (const key of keysObj2) {
                    
                      if (!keysObj1.includes(key)) {
                        
                        obj[key] = el[item.ANIO][i][key]
                        
                      }
                  }

             } 
          }
      }
      
      el[item.ANIO].push(obj)
      return el
   }, {})


       for (const anio in allServicesAllYears) {

        for(let i = 0 ; i < allServicesAllYears[anio].length; i++ ){

          if(allServicesAllyearsArr1.length === 0){

            allServicesAllyearsArr1.push(allServicesAllYears[anio][i])

          }else{

            if(allServicesAllyearsArr1.filter(el => el.month === allServicesAllYears[anio][i].month).length === 0 ){
              
              allServicesAllyearsArr1.push(allServicesAllYears[anio][i])
  
            }else{

              allServicesAllyearsArr1.pop()
              allServicesAllyearsArr1.push(allServicesAllYears[anio][i])
            }

          }
        }

        
      }

   // Fin - Rendimiento de todos los servicios en todos los años

   const handleFilter = ( entity:string, year:string, service:string, month:string) =>{
      setSelectEntityFilter(entity)
      setSelectYearfilter(year) 
      setSelectServiceFilter(service)
      setSelectMonthFilter(month)

      filterLinerChart(entity, year, service, month)
    }



    const filterLinerChart = (entity:string, year:string, service:string, month:string) =>{

      if( entity ==='' && year === '' && service === '' && month === '' ){
        
        err.current = ''
        dataLineChart = allServicesAllyearsArr1;
        leakedData.current = tableroBeneficio;

        for(let i = 0; i < leakedData.current.length; i++){
    
          totalValuePayments = totalValuePayments + (leakedData.current[i].MONTO_ENTREGADO ?? 0);
          totalDeliveries = totalDeliveries + (isNaN(Number(leakedData.current[i].CANTIDAD_ENTREGAS)) ? 0 : Number(leakedData.current[i].CANTIDAD_ENTREGAS))
      }
        
      }else if( entity !=='' && year === '' && service === '' && month === '' ){
                
        if(allServicesAllyearsArr1.filter(el => el[`entidad_${entity}`] === entity)){
          
          const data = []
          
          leakedData.current = tableroBeneficio.filter(el =>el.entidad === entity)
          
          for(let i = 0; i < leakedData.current.length; i++){
    
            err.current = ''

            totalValuePayments = totalValuePayments + (leakedData.current[i].MONTO_ENTREGADO ?? 0);
            console.log(leakedData.current[i].CANTIDAD_ENTREGAS)
            totalDeliveries = totalDeliveries + (isNaN(Number(leakedData.current[i].CANTIDAD_ENTREGAS)) ? 0 : Number(leakedData.current[i].CANTIDAD_ENTREGAS))

            const obj = {
              MONTH: `${leakedData.current[i].ANIO}-${ leakedData.current[i].CICLO == 1 ? 'Ene' : leakedData.current[i].CICLO == 2 ? 'Feb' :  leakedData.current[i].CICLO == 3 ? 'Mar' :  leakedData.current[i].CICLO == 4 ? 'Abr' :  leakedData.current[i].CICLO == 5 ? 'May' :  leakedData.current[i].CICLO == 6 ? 'Jun' :  leakedData.current[i].CICLO == 7 ? 'Jul' :  leakedData.current[i].CICLO == 8 ? 'Ago' :  leakedData.current[i].CICLO == 9 ? 'Sep' :  leakedData.current[i].CICLO == 10 ? 'Oct' :  leakedData.current[i].CICLO == 11 ? 'Nov' : 'Dic' }`,
              [`${leakedData.current[i].servicio}`]: leakedData.current[i].monto_entregado, 
              
            }

            data.push(obj)
          }
          dataLineChart = data.reverse();
        }else{
          err.current = 'No existen datos para la consulta'
        }


      }else if( entity !=='' && year === '' && service !== '' && month === '' ){
        
        err.current = ''

        const data = []

        
        for(let i = 0; i < allServicesAllyearsArr1.length; i++){
  
          const keys = Object.keys(allServicesAllyearsArr1[i])
          if(keys.filter(el => el == service).length !== 0){
            
              const obj = {
                MONTH: allServicesAllyearsArr1[i].MONTH,
                [`${service}`]: allServicesAllyearsArr1[i][`${service}`],

                TIPO_DOCUMENTO: Number(allServicesAllyearsArr1[i].TIPO_DOCUMENTO ?? 0),
                NUMERO_DOCUMENTO: Number(allServicesAllyearsArr1[i].NUMERO_DOCUMENTO ?? 0),
                UNIDAD_MEDIDA_ENTREGA: String(allServicesAllyearsArr1[i].UNIDAD_MEDIDA_ENTREGA ?? ''),

                ANIO: allServicesAllyearsArr1[i].ANIO,
                CICLO: Number(allServicesAllyearsArr1[i].CICLO ?? 0),
                SERVICIO: service,
                MONTO_ENTREGADO:  Number(allServicesAllyearsArr1[i][`monto_entregado_${service}`]),
                CANTIDAD_ENTREGAS: Number(allServicesAllyearsArr1[i][`cantidad_entregas_${service}`]),
                ENTIDAD: String(allServicesAllyearsArr1[i][`entidad_${entity}`]),
                FECHA_ENTREGA: allServicesAllyearsArr1[i].FECHA_ENTREGA,
                CENTRO_ATENCION: allServicesAllyearsArr1[i].CENTRO_ATENCION,
              }
              
              
              data.push(obj)  
            }
        }

        dataLineChart = data;
        leakedData.current = data;

        for(let i = 0; i < leakedData.current.length; i++){
    
          totalValuePayments = totalValuePayments + (leakedData.current[i].MONTO_ENTREGADO ?? 0);
          totalDeliveries = totalDeliveries + (isNaN(Number(leakedData.current[i].cantidad_entregas)) ? 0 : Number(leakedData.current[i].cantidad_entregas))
        }
        
      }else if(entity ==='' && year !== '' && service === '' && month === ''){

        /*err.current = ''

        if(byYear){

          for(let i = 0; i < byYear[year].length; i++){
            for(const key in byYear[year][i]){
              if(key.includes("monto_entregado")){
                byYear[year][i].MONTO_ENTREGADO = Number(byYear[year][i][key]) 
  
              }
            }
          }


          dataLineChart = byYear[year].reverse();
          leakedData.current = byYear[year]
  
          for(let i = 0; i < byYear[year].length; i++){
            
            for(const key in byYear[year][i]){
              if(key === "cantidad_entregas"){
                totalDeliveries = totalDeliveries + (isNaN(Number(byYear[year][i][key])) ? 0 : Number(byYear[year][i][key]))
                
              }
  
              if(key === "monto_entregado"){
                totalValuePayments = totalValuePayments + (isNaN(Number(byYear[year][i][key])) ? 0 : Number(byYear[year][i][key]))
              }
            }          
          }
        }*/

        err.current = '';

        if (byYear) {
          const rawItems = byYear[year];

          const transformedItems: TableroBeneficioType[] = rawItems.map((item) => {
            let monto_entregado = 0;
            let cantidad_entregas = 0;

            for (const key in item) {
              if (key.includes("monto_entregado")) {
                monto_entregado = Number(item[key]) || 0;
              }
              if (key === "cantidad_entregas") {
                cantidad_entregas = Number(item[key]) || 0;
              }
            }

            const parsed: TableroBeneficioType = {
              TIPO_DOCUMENTO: Number(item.TIPO_DOCUMENTO ?? 0),
              NUMERO_DOCUMENTO: Number(item.NUMERO_DOCUMENTO ?? 0),
              UNIDAD_MEDIDA_ENTREGA: String(item.UNIDAD_MEDIDA_ENTREGA ?? ''),

              ANIO: Number(item.ANIO ?? 0),
              CICLO: Number(item.CICLO ?? 0),
              SERVICIO: item.SERVICIO ?? '',
              MONTO_ENTREGADO: monto_entregado,
              CANTIDAD_ENTREGAS: cantidad_entregas,
              ENTIDAD: String(item.ENTIDAD ?? ''),
              FECHA_ENTREGA: String(item.FECHA_ENTREGA ?? ''),
              CENTRO_ATENCION: String(item.CENTRO_ATENCION ?? ''),
            };

            return parsed;
          });

          const forLineChart: {[x: string]: string | number | null; MONTH: string; }[] = rawItems.map((item) => {
            return {
              MONTH: String(item.MONTH ?? ''), 
            };
          });


          dataLineChart = forLineChart.slice().reverse();
          leakedData.current = transformedItems;


          for (const item of transformedItems) {
            totalDeliveries += item.CANTIDAD_ENTREGAS ?? 0;
            totalValuePayments += item.MONTO_ENTREGADO ?? 0;
          }
        }
        

      }else if(entity !=='' && year !== '' && service !== ''  && month === ''){

        err.current = ''
        const data:TableroBeneficioTypeExtended[] = []
        if(byYear){
          for(let i = 0; i < byYear[year].length; i++){
  
                const keysObj = Object.keys(byYear[year][i])
  
                if(keysObj.filter(el => el == service).length !== 0){
  
  
                    let serviceValue;
                    let monto = 0;
                    let entregas = 0;
  
                    for(const key in byYear[year][i]){
                      
                      if(key == service){
                        serviceValue = byYear[year][i][key]
                        monto = monto + Number(byYear[year][i][`monto_entregado_${service}`])
                        entregas = entregas + Number(byYear[year][i][`cantidad_entregas_${service}`])
                        }
                    }
  
                    const obj:TableroBeneficioTypeExtended = {
                        MONTH : byYear[year][i].MONTH,
                        [`${service}`]: serviceValue ?? '',

                        ANIO: byYear[year][i].ANIO,
                        CICLO: byYear[year][i].CICLO,
                        SERVICIO: String(service),
                        MONTO_ENTREGADO: Number(monto),
                        CANTIDAD_ENTREGAS: Number(entregas),
                        ENTIDAD: String(byYear[year][i][`entidad_${entity}`]),
                        FECHA_ENTREGA: byYear[year][i].FECHA_ENTREGA,
                        CENTRO_ATENCION: byYear[year][i].CENTRO_ATENCION,
                    }
             
                    data.push(obj)
  
                }
          }   
          leakedData.current = data as unknown as TableroBeneficioType[];
          dataLineChart = data.reverse();
            
          for(let i = 0; i < leakedData.current.length; i++){
    
            totalValuePayments = totalValuePayments + (leakedData.current[i].MONTO_ENTREGADO ?? 0);
            totalDeliveries = totalDeliveries + (isNaN(Number(leakedData.current[i].cantidad_entregas)) ? 0 : Number(leakedData.current[i].cantidad_entregas))
          }
        }
          
      }else if( entity !=='' && year !== '' && service !== '' && month !== '' ){
        
        if(byYear){
          err.current = ''
  
          const data:TableroBeneficioTypeExtended[] = []
          for(let i = 0; i < byYear[year].length; i++){
  
                const keysObj = Object.keys(byYear[year][i])
  
                if(keysObj.includes(service)){

                  const currentItem = byYear[year][i];
                    
                    if (currentItem.month === month && !data.some(el => el.month === currentItem.month)) {
                      currentItem.MONTO_ENTREGADO = Number(currentItem[`monto_entregado_${service}`]);
                      currentItem.CANTIDAD_ENTREGAS = Number(currentItem[`cantidad_entregas_${service}`]);

                      data.push(currentItem);
                    }
                }
          }   
          dataLineChart = data;
          leakedData.current = data as unknown as TableroBeneficioType[]
  
          for(let i = 0; i < leakedData.current.length; i++){
      
            totalValuePayments = totalValuePayments + (leakedData.current[i].MONTO_ENTREGADO ?? 0);
            totalDeliveries = totalDeliveries + (isNaN(Number(leakedData.current[i].cantidad_entregas)) ? 0 : Number(leakedData.current[i].cantidad_entregas))
          }

        }

      }else if( entity ==='' && year !== '' && service === '' && month !== '' ){
        if(byYear){

          err.current = ''
          const data = byYear[year].filter(el => el.MONTH === month);
          let monto = 0;
          let entregas = 0;
  
          if(data.length !== 0){
  
            for(const key in data[0]){
              if(key.toLowerCase().includes("cantidad_entregas")){
                entregas = entregas + Number(data[0][key])
              }
    
              if(key.toLowerCase().includes("monto_entregado")){
                monto = monto + Number(data[0][key])
              }
            }
    
            data[0].cantidad_entregas = entregas
            data[0].monto_entregado = monto
    
            dataLineChart = data;
            leakedData.current = data as unknown as TableroBeneficioType[]
    
            for(let i = 0; i < leakedData.current.length; i++){
        
              totalValuePayments = totalValuePayments + (leakedData.current[i].MONTO_ENTREGADO ?? 0);
              totalDeliveries = totalDeliveries + (isNaN(Number(leakedData.current[i].cantidad_entregas)) ? 0 : Number(leakedData.current[i].cantidad_entregas))
            }
          }else{
            err.current = 'Relación mes / año inválida'
          }
        }
        

        
      }else if( entity !=='' && year !== '' && service === '' && month === '' ){
        if(byYear){
          const rawData = byYear[year].filter(el => el[`entidad_${entity}`] === entity)
          const data = []
          const dataForChart = []
  
          if( rawData.length !== 0){
  
            
            for(let i = 0; i < rawData.length; i++){
              
              for( const key in rawData[i]){
                if(selectService){
                  if(selectService.includes(key)){
    
                    const obj = {
                      MONTH : rawData[i].MONTH,
                      [`${selectService[selectService.indexOf(key)]}`] : rawData[i][key]
                    }
    
                    const keysObj1 = Object.keys(obj)
                    
                    for( let i = 0; i < dataForChart.length; i++){
                      
                      const keysObj2 = Object.keys(dataForChart[i])
                      
                      if(dataForChart[i].MONTH === obj.MONTH){
    
                          for (const key of keysObj2) {
                            
                              if (!keysObj1.includes(key)) {
                                
                                obj[key] = dataForChart[i][key]
                                
                              }
                          }
    
                     }
                    }
    
                    dataForChart.push(obj)
    
                  }
                }
              }
  
              totalValuePayments = totalValuePayments + Number(rawData[i][`monto_entregado_${entity}`])
              totalDeliveries = totalDeliveries + (isNaN(Number(rawData[i][`cantidad_entregas_${entity}`])) ? 0 : Number(rawData[i][`cantidad_entregas_${entity}`]))
  
              const obj = {
                ANIO: rawData[i].ANIO,
                CICLO: rawData[i].CICLO,
                MONTO_ENTREGADO: Number(rawData[i][`monto_entregado_${entity}`]),
                ENTIDAD: String(rawData[i][`entidad_${entity}`]),
                SERVICIO: String(rawData[i][`servicio_${entity}`]),
                FECHA_ENTREGA: rawData[i].FECHA_ENTREGA,
                CENTRO_ATENCION: rawData[i].CENTRO_ATENCION,
              }
  
              data.push(obj)
  
            }
  
            dataLineChart = dataForChart.reverse();
            leakedData.current = data as unknown as TableroBeneficioType[]
          }else{
            err.current = 'Relación Entidad / año inválida'
          }
        }

      }else if( entity !=='' && year !== '' && service === '' && month !== '' ){
        if(byYear){
          const rawData = byYear[year].filter(el => el[`entidad_${entity}`] === entity && el.MONTH === month)
          const data = []
          const dataForChart = []
  
          if( rawData.length !== 0){
  
            
            for(let i = 0; i < rawData.length; i++){
              
              for(const key in rawData[i]){
                if(selectService){
                  if(selectService.includes(key)){
    
                    const obj = {
                      MONTH: rawData[i].MONTH,
                      [`${selectService[selectService.indexOf(key)]}`] : rawData[i][key]
                    }
    
                    const keysObj1 = Object.keys(obj)
                    
                    for( let i = 0; i < dataForChart.length; i++){
                      
                      const keysObj2 = Object.keys(dataForChart[i])
                      
                      if(dataForChart[i].MONTH === obj.MONTH){
    
                          for (const key of keysObj2) {
                            
                              if (!keysObj1.includes(key)) {
                                
                                obj[key] = dataForChart[i][key]
                                
                              }
                          }
    
                     }
                    }
    
                    dataForChart.push(obj)
    
                  }
                }
              }
  
              totalValuePayments = totalValuePayments + Number(rawData[i][`monto_entregado_${entity}`])
              totalDeliveries = totalDeliveries + (isNaN(Number(rawData[i][`cantidad_entregas_${entity}`])) ? 0 : Number(rawData[i][`cantidad_entregas_${entity}`]))
  
              const obj = {
                ANIO: rawData[i].ANIO,
                CICLO: rawData[i].CICLO,
                MONTO_ENTREGADO: Number(rawData[i][`monto_entregado_${entity}`]),
                ENTIDAD: String(rawData[i][`entidad_${entity}`]),
                SERVICIO: String(rawData[i][`servicio_${entity}`]),
                FECHA_ENTREGA: rawData[i].FECHA_ENTREGA,
                CENTRO_ATENCION: rawData[i].CENTRO_ATENCION
              }
  
              data.push(obj)
  
            }
  
            dataLineChart = dataForChart;
            leakedData.current = data  as unknown as TableroBeneficioType[]
          }else{
            err.current = 'Relación Entidad / año / mes inválida'
          }
        }


      }else if( entity ==='' && year === '' && service !== '' && month !== '' ){
        err.current = 'Debe seleccionar un año'
        handleFilter( selectEntityFilter, selectYearfilter, selectServiceFilter, '')
      }else if( entity ==='' && year !== '' && service !== '' && month !== '' ){
        err.current = 'Debe seleccionar una Entidad'
        handleFilter( selectEntityFilter, '', '', '')
      }else if( entity ==='' && year === '' && service === '' && month !== '' ){
        err.current = 'Debe seleccionar un año'
        handleFilter( selectEntityFilter, selectYearfilter, selectServiceFilter, '')
      }else if( entity ==='' && year !== '' && service !== '' && month === '' ){
        err.current = 'Debe seleccionar una Entidad'
        handleFilter( selectEntityFilter, selectYearfilter, '', selectYearfilter)
      }

    }

    const handleEntityService = (e:React.ChangeEvent<HTMLSelectElement>) =>{

      const data:string[] = []
      const value = e.target.value
      
      if( value !== ''){
        for(let i = 0; i < filteredByEntity[value].length; i++){
            
            if(data.filter(el => el == filteredByEntity[value][i].SERVICIO).length === 0){
              data.push(filteredByEntity[value][i].SERVICIO)
            }
        }

        setSelectService(data)
      }else{
        setSelectService([''])
      }

      setSelectEntityFilter(value)
      handleFilter( value, selectYearfilter, selectServiceFilter, selectMonthFilter )

    }

    

    const handleSelectDate = (e:React.ChangeEvent<HTMLSelectElement>) =>{
      const value = e.target.value
      const handleMonths:string[] = []
      if(byYear){
        if( value !== '' ){
          for( let i = 0 ; i < byYear[value].length; i++){
       
            handleMonths.push(byYear[value][i].MONTH)
    
            if(handleMonths.length === byYear[value].length){
              setMonth(handleMonths)
            }
            
          }
  
        }else{
          setMonth(handleMonths)
        }
      }

      

      handleFilter( selectEntityFilter, value, selectServiceFilter, selectMonthFilter )
    }
  
if(byYear !== undefined ){
  filterLinerChart( selectEntityFilter, selectYearfilter, selectServiceFilter, selectMonthFilter )
}


  return (
    <div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 mr-2">
            <div className="w-full flex flex-col md:flex-row items-center justify-around my-2">
                <select
                    className="outline-0 w-full md:w-1/5 border border-[#c0c0c0] text-sm text-[#c0c0c0]"
                    onChange={ (e) => handleEntityService( e ) }
                >
                    <option value=''>Entidad</option>
                    {
                      selectEntity !== undefined &&
                        selectEntity.length !== 0 &&
                          selectEntity.map((option, i)=>(
                            <option key={i} value={option}>{option}</option>
                          ))
                    }

                </select>
                <select
                    className="outline-0 w-full md:w-1/5 border border-[#c0c0c0] text-sm text-[#c0c0c0]"
                    onChange={ (e) => handleFilter( selectEntityFilter, selectYearfilter, e.target.value, selectMonthFilter) }
                    ref= { serviceValueRef }
                >
                    <option value=''>Servicio / estrategia</option>
                    {
                      selectService !== undefined &&
                        selectService.length !== 0 &&
                          selectService.map((option:string, i:number) =>(
                            <option key={i} value={option}>{option}</option>
                            
                          ))
                    }
                </select>
                <select
                    className="outline-0 w-full md:w-1/5 border border-[#c0c0c0] text-sm text-[#c0c0c0]"
                    onChange={ (e) => handleSelectDate( e ) }
                >
                    <option value=''>Año</option>
                    {
                      selectAnio !== undefined &&
                        selectAnio.length !== 0 &&
                          selectAnio.map((option, i)=>(
                            <option key={i} value={option}>{option}</option>
                          ))
                    }
                </select>
                <select
                    className="outline-0 w-full md:w-1/5 border border-[#c0c0c0] text-sm text-[#c0c0c0]"
                    onChange={ (e) => handleFilter( selectEntityFilter, selectYearfilter, selectServiceFilter, e.target.value) }
                >
                    <option value=''>Mes</option>
                    {
                      month.length !== 0 &&
                        month.map((option, i)=>(
                            <option key={i} value={option}>{option}</option>
                          ))
                    }
                </select>
            </div>
            <div className={`${err.current === '' || err.current === null ? 'hidden' : 'block'} text-center  text-red-800 w-full rounded-xl`}>{ err.current !== '' && err.current}</div>
          <div className="w-full bg-[#f6f6f6] rounded-xl pt-5 px-8">
            <p className="text-second font-bold">Beneficios históricos</p>
            <div className="historic-citizen">
              {
                tableroBeneficioLoading ? 
                  <div className="animate-pulse space-y-4 p-4 max-w-md w-full mx-auto">
                    <div className="h-20 bg-gray-300 rounded w-3/4"></div>
                  </div>
                :
                  <LinesChart
                    lines = { linesChart }
                    data = { dataLineChart } 
                  />
              }
            </div>
          </div>
 
          </div>

          <div className="w-full md:w-1/3 text-center flex flex-col items-center justify-between">
            <div className="h-[45%] p-8 bg-[#f6f6f6] rounded-xl mb-2 w-full">
              {
                tableroBeneficioLoading ? 
                  <div className="animate-pulse space-y-4 p-4 max-w-md w-full mx-auto flex">
                     <div className="h-4 bg-gray-300 rounded w-3/4"></div>  
                  </div>
                :
                  <span className="font-bold text-2xl text-gray-400"> { totalDeliveries }</span>
              }
              <p className="text-second">Entregas</p>
            </div>
            <div className="h-[45%] p-8 bg-[#f6f6f6] rounded-xl mt-2 w-full">
              {
                tableroBeneficioLoading ? 
                  <div className="animate-pulse space-y-4 p-4 max-w-md w-full mx-auto flex">
                     <div className="h-4 bg-gray-300 rounded w-3/4"></div>  
                  </div>
                :
                  <span className="font-bold text-2xl text-gray-400">{ `$ ${totalValuePayments !== undefined && totalValuePayments.toLocaleString("en")}` }</span>
              }
              <p className="text-second">Valor</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto w-full mt-5">
          <div className="w-11/12 h-5 flex items-center justify-between mb-2">
            <p className="text-[20px] text-second font-bold">Beneficios Activos</p>
            {/*<DownloadTableExcel
              filename={`${citizenData.primer_nombre !== null ? citizenData.primer_nombre : '' } ${citizenData.segundo_nombre !== null ? citizenData.segundo_nombre : ''} ${citizenData.primer_apellido !== null ? citizenData.primer_apellido : ''} ${citizenData.segundo_apellido !== null ? citizenData.segundo_apellido : '' } Doc-${ citizenData.numero_documento } Filtro por ${ selectEntityFilter === '' ? 'Todas las entidades' : `Entidad_${selectEntityFilter}` } - ${ selectServiceFilter === '' ? 'Todos los servicios' : `Servicio_${selectServiceFilter}` } - ${ selectYearfilter === '' ? 'Todos los anios' : `Anio_${ selectYearfilter }`} - ${ selectMonthFilter === '' ? 'todos los meses' : `Mes_${selectMonthFilter}` } `}
              sheet="users"
              currentTableRef={historicTableRef.current}
            > 
              <img
                src={ download }
                alt="icono-descarga"
                className="cursor-pointer "
              />
            </DownloadTableExcel>*/}

          </div>
          <div className="overflow-x-auto w-full h-full">
            <div className="w-[40rem] md:w-full text-[14px] h-full">
              <div className="flex">
                <div className="bg-gray-100 text-gray-400 text-center w-1/5 p-1 border border-white rounded-tl-xl">
                  Año
                </div>
                <div className="bg-gray-100 text-gray-400 text-center w-1/5 p-1 border border-white">
                  Ciclo / Mes
                </div>
                <div className="bg-gray-100 text-gray-400 text-center w-1/5 p-1 border border-white">
                  Valor Entregado
                </div>
                <div className="bg-gray-100 text-gray-400 text-center w-1/5 p-1 border border-white">
                  Entidad
                </div>
                <div className="bg-gray-100 text-gray-400 text-center w-1/5 p-1 border border-white">
                  Servicio
                </div>
                <div className="bg-gray-100 text-gray-400 text-center w-1/5 p-1 border border-white">
                  Centro de Atención
                </div>
                <div className="bg-gray-100 text-gray-400 text-center w-1/5 p-1 border border-white rounded-tr-xl">
                  Fecha de Entrega
                </div>
              </div>
              <div className="w-full overflow-y-auto h-32 custom-scrollbar text-[#545454]">
                {
                  tableroBeneficioLoading ?
                    <div className="animate-pulse w-full flex mt-3">
                      {Array.from({ length: 7 }).map((_, index)=>(
                          <div key={index} className="h-4 bg-gray-300 rounded w-1/5"></div>
                        ))
                        }
                    </div>
                  :
                  leakedData.current !== null &&
                    leakedData.current.length !== 0 ?
                      leakedData.current.map ( (item, i) =>(
                              <div className="flex w-full" key={`${i}`}>
                                <div className="text-center w-1/5 p-1">{ item.ANIO }</div>
                                <div className="text-center w-1/5 p-1">{ item.CICLO }</div>
                                <div className="text-center w-1/5 p-1">{ typeof(item.MONTO_ENTREGADO) === 'number' ? `$ ${item.MONTO_ENTREGADO.toLocaleString("en")}`  : item.MONTO_ENTREGADO }</div>
                                <div className="text-center w-1/5 p-1">{ item.ENTIDAD }</div>
                                <div className="text-center w-1/5 p-1">{ item.SERVICIO }</div>
                                <div className="text-center w-1/5 p-1">{ item.CENTRO_ATENCION }</div>
                                <div className="text-center w-1/5 p-1">{ `${ item.FECHA_ENTREGA }` }</div>
                              </div>
                          ))
                          :
                          <div className="text-center italic">No hay resultados para el filtro seleccionado</div>
                  }
              </div>
            </div>
          </div>
         {/* <table
            className="w-[40rem] md:w-full h-full"
            ref= { historicTableRef }
          > 
            <thead>
              <tr className="flex">
                <th className="bg-gray-100 text-gray-400 text-center w-1/5 p-1 border border-white rounded-tl-xl">Año</th>
                <th className="bg-gray-100 text-gray-400 text-center w-1/5 p-1 border border-white">Ciclo / Mes</th>
                <th className="bg-gray-100 text-gray-400 text-center w-1/5 p-1 border border-white">Valor Entregado</th>
                <th className="bg-gray-100 text-gray-400 text-center w-1/5 p-1 border border-white">Entidad</th>
                <th className="bg-gray-100 text-gray-400 text-center w-1/5 p-1 border border-white">Servicio</th>
                <th className="bg-gray-100 text-gray-400 text-center w-1/5 p-1 border border-white">Centro de Atención</th>
                <th className="bg-gray-100 text-gray-400 text-center w-1/5 p-1 border border-white rounded-tr-xl">Fecha de Entrega</th>

              </tr>
            </thead>
             <tbody className='w-full overflow-y-auto h-32 custom-scrollbar text-[#545454]'>
                  {
                  leakedData.current !== null &&
                    leakedData.current.length !== 0 ?
                      leakedData.current.map ( (item, i) =>(
                              <tr className="flex w-full" key={`${i}`}>
                                <td className="text-center w-1/5 p-1">{ item.ANIO }</td>
                                <td className="text-center w-1/5 p-1">{ item.CICLO }</td>
                                <td className="text-center w-1/5 p-1">{ typeof(item.MONTO_ENTREGADO) === 'number' ? `$ ${item.MONTO_ENTREGADO.toLocaleString("en")}`  : item.MONTO_ENTREGADO }</td>
                                <td className="text-center w-1/5 p-1">{ item.ENTIDAD }</td>
                                <td className="text-center w-1/5 p-1">{ item.SERVICIO }</td>
                                <td className="text-center w-1/5 p-1">{ item.CENTRO_ATENCION }</td>
                                <td className="text-center w-1/5 p-1">{ `${ item.FECHA_ENTREGA }` }</td>

                              </tr>
                          ))
                          :
                          <div className="text-center italic">No hay resultados para el filtro seleccionado</div>
                  }
             </tbody>
          </table>*/}
        </div>
    </div>
  )
}
