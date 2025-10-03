import { VistaCiudadanoProps, TableroBeneficioType } from "@/src/types/Types"
import { useEffect,useState } from "react";
import PieCharts from "../charts/PieCharts";

export default function VistaCiudadano({tableroBeneficio, tableroBeneficioLoading}:VistaCiudadanoProps) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const [chartData, setChartData] = useState<{ name: string, value: number }[]>([])
  const [lastPayments, setLastPayments] = useState<TableroBeneficioType[] >([])
  const [ lastMonthPaymentRef, setLastMonthPaymentRef] = useState<number>(0)

  useEffect(()=>{
    if(tableroBeneficio.length){
      const filterByServices = tableroBeneficio.filter((item): item is TableroBeneficioType & { SERVICIO: string } => item.SERVICIO !== null).reduce<Record<string, TableroBeneficioType[]>>((el, item) => {
        if (!el[item.SERVICIO]) {
          el[item.SERVICIO] = [];
        }
        el[item.SERVICIO].push(item);
        return el;
      }, {});

      const selectedPayments: TableroBeneficioType[] = [];
      const chartDataRaw: { name: string, value: number }[] = [];
 
      for (const service in filterByServices) {
          
        const sortingPayments = filterByServices[service].sort((a,b)=>{
            const sort1 = Number(b.ANIO) - Number(a.ANIO);
            const sort2 = Number(b.CICLO) - Number(a.CICLO);
            const sort3 = a.SERVICIO.localeCompare(b.SERVICIO);

            return sort1 === 0 ? (sort2 === 0 ? sort3 : sort2) : sort1;
        })

        const filtered = sortingPayments.filter(item => item.ANIO == currentYear && ( item.CICLO == currentMonth || item.CICLO == lastMonth ))

        if(filtered.length) selectedPayments.push(filtered[0]);

      }
      setLastPayments(selectedPayments);

      if(selectedPayments.length){
        selectedPayments.forEach(el =>{
          chartDataRaw.push({name: el.SERVICIO, value: el.MONTO_ENTREGADO ?? 0})
        })
      }

      setChartData(chartDataRaw)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[tableroBeneficio])


   useEffect(() => {
      let lastMonthPayment = 0;

      if(lastPayments.length) {

        lastPayments.forEach(el =>{
          if(el.MONTO_ENTREGADO) lastMonthPayment += el.MONTO_ENTREGADO
        })

      }

      setLastMonthPaymentRef(lastMonthPayment);  
  }, [lastPayments]);

  return (
     <>

        <div className="bg-[#f6f6f6] flex flex-col md:flex-row rounded-xl">
          <div className="border-r border-r-slate-300 w-full md:w-1/2 pt-5 px-8">
            <p className="text-second font-bold">Beneficios activos último mes</p>
            <div className="current-citizen-view">
              {
                tableroBeneficioLoading ? 
                  <div className="animate-pulse space-y-4 p-4 max-w-md w-full mx-auto flex">
                    <div className="h-30 bg-gray-300 rounded-full w-30 m-auto"></div>  
                  </div>
                :
                  <PieCharts 
                    data = { chartData }
                  />
              }
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center">
            <div className="p-8 border-b border-b-slate300">
              <p className="text-second">Monto asignado último mes</p>
              {
                tableroBeneficioLoading ? 
                  <div className="animate-pulse space-y-4 p-4 max-w-md w-full mx-auto flex">
                     <div className="h-4 bg-gray-300 rounded w-3/4"></div>  
                  </div>
                :
                <span className="font-bold text-gray-400"> { `$ ${lastMonthPaymentRef.toLocaleString("en") } ` }</span>
              }
            </div>
            <div className="p-8">
              <p className="text-second">Régimen de Afiliación al Sistema de Salud</p>
              {
                tableroBeneficioLoading ? 
                  <div className="animate-pulse space-y-4 p-4 max-w-md w-full mx-auto flex">
                     <div className="h-4 bg-gray-300 rounded w-3/4"></div>  
                  </div>
                :
                <span className="font-bold text-gray-400">Compensar (Quemado)</span>
              }
            </div>
          </div>
        </div>
        <h2 className="mt-6 mb-3 text-second font-bold">Beneficios activos</h2>
        <div className="overflow-x-auto w-full h-full">
          <div className="w-[40rem] md:w-full text-[14px] h-full">
            <div className="flex">
              <div className="bg-gray-100 text-gray-400 text-center w-1/5 p-1 border border-white rounded-tl-xl">Año</div>
              <div className="bg-gray-100 text-gray-400 text-center w-1/5 p-1 border border-white">Ciclo / Mes</div>
              <div className="bg-gray-100 text-gray-400 text-center w-1/5 p-1 border border-white">Valor Entregado</div>
              <div className="bg-gray-100 text-gray-400 text-center w-1/5 p-1 border border-white">Entidad</div>
              <div className="bg-gray-100 text-gray-400 text-center w-1/5 p-1 border border-white">Servicio</div>
              <div className="bg-gray-100 text-gray-400 text-center w-1/5 p-1 border border-white">Centro de Atención</div>
              <div className="bg-gray-100 text-gray-400 text-center w-1/5 p-1 border border-white rounded-tr-xl">Fecha de Entrega</div>

            </div>
            <div className="w-full overflow-y-auto h-full custom-scrollbar text-[#545454]">
              {
                tableroBeneficioLoading ?
                  <div className="animate-pulse w-full flex mt-3">
                     {Array.from({ length: 7 }).map((_, index)=>(
                        <div key={index} className="h-4 bg-gray-300 rounded w-1/5"></div>
                      ))
                      }
                  </div>
                :
                lastPayments.length ?
                  lastPayments.map((payment, i)=>(
                    <div
                      key={i}
                      className="flex"
                    >
                      <div className="text-center w-1/5 p-1">{ payment.ANIO }</div>
                      <div className="text-center w-1/5 p-1">{ payment.CICLO }</div>
                      <div className="text-center w-1/5 p-1">{ `${ payment.MONTO_ENTREGADO === 0 ? "No Disponible" : `$ ${ payment.MONTO_ENTREGADO?.toLocaleString("en") }`}` }</div>
                      <div className="text-center w-1/5 p-1">{ payment.ENTIDAD }</div>
                      <div className="text-center w-1/5 p-1">{ payment.SERVICIO }</div>
                      <div className="text-center w-1/5 p-1">{ payment.CENTRO_ATENCION }</div>
                      <div className="text-center w-1/5 p-1">{ `${ payment.FECHA_ENTREGA }` }</div>
                    </div>
                  ))
                :
                <div>No hay registros</div>
              }
            </div>
          </div>
        </div>
            
        
    </>
  )
}
