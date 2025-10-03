import React from 'react'
import { useState, useEffect } from 'react'
import { DataDashboardProps } from '@/src/types/Types';
import VistaCiudadano from './VistaCiudadano';
import VistaHistoricoCiudadano from './VistaHistoricoCiudadano';
import VistaGeolocalizacionCiudadano from './VistaGeolocalizacionCiudadano';
import FamiliaCiudadano from './FamiliaCiudadano';
import DoubleArrowLeft from '@/src/shared/icons/DoubleArrowLeft';
import { useRouter } from 'next/navigation';

export default function DataDashboard({data, tableroBeneficio, tableroBeneficioLoading, setData, tableroFamilia, tableroFamiliaLoading}:DataDashboardProps) {

    const [valorServicio, setValorServicio] = useState(0);
    const [ componentToShow, setComponentToShow] = useState(0)

    const router = useRouter()

    useEffect(()=>{
        if (tableroBeneficio.length) {
            let value = 0
            tableroBeneficio.map((item) => {
              if(item.MONTO_ENTREGADO) value += item.MONTO_ENTREGADO;
            });
            setValorServicio(value)
        }
    },[tableroBeneficio])

  
    return (
    <div className="w-full flex flex-col pl-0 md:pl-4">
          <div className="flex flex-col items-center justify-center mb-5 md:flex-row md:items-center md:justify-between ">
            <div>
              <button
                  className='text-[12px] text-gray-300 font-semibold hover:text-gray-500 cursor-pointer flex items-center'
                  onClick={() =>{
                    setData(null)
                    router.push('/inicio')
                  }}
              >
                  <DoubleArrowLeft
                      size={10}
                      fill='#c9c9c9'
                  />
                  <span
                      className='ml-1'
                  >
                      Volver
                  </span>
              </button>
            </div>
            <div>
              {
                ['Actual', 'Histórico', 'Geolocalizacion', `Ver Grupo Familiar (${tableroFamilia.length})`].map((button, i) =>(
                  <button
                    key={i}
                    className={`${
                      componentToShow === i ? "shadow-xl font-semibold text-sm bg-main hover:bg-main/80 text-white" : "bg-[#f9f9f9] hover:bg-[#f0f0f0] text-[#c0c0c0]" } rounded-xl  py-2 px-5 mx-2 cursor-pointer`}
                    onClick={() => {
                      setComponentToShow(i);
                    }}
                  >
                    {button}
                  </button>
                ))
              }
            </div>
          </div>
          {componentToShow == 0 ? (
            <VistaCiudadano
              tableroBeneficio={tableroBeneficio}
              valorServicio={valorServicio}
              data={data}
              tableroBeneficioLoading={tableroBeneficioLoading}
            />
          ) : componentToShow == 1 ? (
            <VistaHistoricoCiudadano
              tableroBeneficio={tableroBeneficio}
              data={data}
              tableroBeneficioLoading={tableroBeneficioLoading}
            />
          ) : componentToShow == 2 ? (
            <VistaGeolocalizacionCiudadano
              latitud={data.LATITUD}
              longitud={data.LONGITUD}
            />
          ) : (
            <FamiliaCiudadano
                tableroFamilia={tableroFamilia}
                tableroFamiliaLoading={tableroFamiliaLoading} 
                setData={setData}   
            />
          )}
        </div>
  )
}
