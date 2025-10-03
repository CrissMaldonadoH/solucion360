'use client'
import { sdis } from "../staticData/tableros"
//import logoSdis from '../../../public/icons/sdisLogo.svg'
//import Image from "next/image"
import { useState } from "react"
//import { Tablero } from "@/src/types/Types"
import DashboardOrTable from "./DashboardOrTable"
import EyeIcon from "@/src/shared/icons/EyeIcon"
import EyeClosedIcon from "@/src/shared/icons/EyeClosedIcon"

export default function TablerosClientComponent() {

  const [ dashboardOrTable, setDashboardOrTable ] = useState<string | null>(null)

  if(dashboardOrTable){
    return(
      <DashboardOrTable
        dashboardOrTable={dashboardOrTable}
        setDashboardOrTable={setDashboardOrTable}
      />
    )
  }
  
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-15 mx-5 mb-5">
        <div className="border-b-2 border-b-app-primary-400 pb-2">
          <h2
            className="text-main font-bold text-2xl text-center md:text-left"
          >Visualización en tableros de PowerBi</h2>
        </div>
        <div>
          <h2 className={`text-second font-semibold text-xl text-center md:text-left my-10`}>Estrategias { sdis.secretaria }</h2>
          <div className="my-10 text-[14px] text-[#333333]">
            <div className="flex py-2 bg-[#f6f7f9] rounded-tl-xl rounded-tr-xl">
                <div className="w-1/4 text-center">Estrategia</div>
                <div className="w-1/4 text-center">Fecha de actualización</div>
                <div className="w-1/4 text-center">Tableros</div>
                <div className="w-1/4 text-center">Anomalías</div>
                <div className="w-1/5 hidden">Acciones</div>
            </div>
            {
              sdis.estrategias.map((estrategia, i)=>(
                <div className=" text-[14px] text-[#333333] flex flex-col md:flex-row px-3 py-2 my-2 border-2 border-[#dedede] hover:border-app-primary-100 relative rounded-xl transition-all ease-in-out duration-300" key={`${estrategia.id}`}>
                  <div className="w-1/4 pr-3 md:px-0">
                    {estrategia.servicio}
                  </div>
                  <div className="w-1/4 text-center">
                    {estrategia.fecha}
                  </div>
                  <div className="w-full md:w-1/4 flex items-center space justify-around relative group">
                    <button
                      className={`${ estrategia.tablero ? 'cursor-pointer' : 'cursor-not-allowed' } hover:font-semibold`}
                      onClick={() => setDashboardOrTable(estrategia.tablero)}
                    >
                      {
                        estrategia.tablero ?
                          <EyeIcon
                            size={20}
                            fill="#4d73b4"
                          />
                        :
                          <EyeClosedIcon
                            size={20}
                            fill="#4d73b480"
                          />
                      }
                    </button>
                    {/*<div
                      className="hidden group-hover:block bg-white text-sm absolute top-full z-10 rounded-xl shadow-lg shadow-[#7588EA] break-words truncate"
                    >
                      {
                        estrategia.tableros.length !== 0 ?
                          estrategia.tableros.map((tablero, i)=>(
                            <button
                                key={i}
                                className="p-2 rounded-xl hover:bg-[#7588EA] hover:text-white cursor-pointer line-clamp-1"
                                onClick={() => setDashboardOrTable(tablero)}
                            >
                              { tablero.tablero }
                            </button>
                          ))
                        :
                          <></>
                      }
                    </div>*/}
                  </div>
                  <div className="w-full md:w-1/4 flex items-center space justify-around relative group">
                    <button
                      className={`${'estrategias' in sdis.anomalias[0] && sdis.anomalias[0].estrategias[i].tablero ? 'cursor-pointer' : 'cursor-not-allowed' } 
                      hover:font-semibold`}
                      onClick={() => setDashboardOrTable('estrategias' in sdis.anomalias[0] && sdis.anomalias[0].estrategias[i].tablero ? sdis.anomalias[0].estrategias[i].tablero : '')}
                    >
                      {
                        'estrategias' in sdis.anomalias[0] && sdis.anomalias[0].estrategias[i].tablero ?
                          <EyeIcon
                            size={20}
                            fill="#4d73b4"
                          />
                        :
                          <EyeClosedIcon
                            size={20}
                            fill="#4d73b480"
                          />
                      }
                    </button>
                    {/*<div
                      className="hidden group-hover:block bg-white text-sm absolute top-full z-10 rounded-xl shadow-lg shadow-[#7588EA] break-words truncate"
                    >
                      {
                        'estrategias' in sdis.anomalias[0] && sdis.anomalias[0].estrategias[i].tableros.length !== 0 ?
                          sdis.anomalias[0].estrategias[i].tableros.map((tablero, i)=>(
                            <button
                                key={i}
                                className="p-2 rounded-xl hover:bg-[#7588EA] hover:text-white cursor-pointer line-clamp-1"
                                onClick={() => setDashboardOrTable(tablero)}
                            >
                              { tablero.tablero }
                            </button>
                          ))
                        :
                          <></>
                      }
                    </div>*/}
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        <div>
          <h2 className={`text-second font-semibold text-xl text-center md:text-left my-10`}>Servicios { sdis.secretaria }</h2>
          <div className="my-10 text-[14px] text-[#333333]">
            <div className="flex py-2 bg-slate-100 rounded-tl-xl rounded-tr-xl">
                <div className="w-1/4 text-center">Servicio</div>
                <div className="w-1/4 text-center">Fecha de actualización</div>
                <div className="w-1/4 text-center">Tableros</div>
                <div className="w-1/4 text-center">Anomalías</div>
                <div className="w-1/5 hidden">Acciones</div>
            </div>
            {
              sdis.servicios.map((servicio, i)=>(
                <div className="flex flex-col md:flex-row px-3 py-2 my-2 border-2 border-[#dedede] hover:border-app-primary-100 text-[14px] text-[#333333] relative rounded-xl transition-all ease-in-out duration-300" key={`${servicio.id}`}>
                  <div className="w-1/4 pr-3 md:px-0">
                    {servicio.servicio}
                  </div>
                  <div className="w-1/4 text-center">
                    {servicio.fecha}
                  </div>
                  <div className="w-full md:w-1/4 flex items-center space justify-around relative group">
                    <button
                      className={`${ servicio.tablero ? 'cursor-pointer' : 'cursor-not-allowed'} hover:font-semibold`}
                      onClick={() => setDashboardOrTable(servicio.tablero)}
                    >
                      {
                        servicio.tablero ?
                          <EyeIcon
                            size={20}
                            fill="#4d73b4"
                          />
                        :
                          <EyeClosedIcon
                            size={20}
                            fill="#4d73b480"
                          />
                      }
                    </button>
                    {/*<div
                      className="hidden group-hover:block bg-white text-sm absolute top-full z-10 rounded-xl shadow-lg shadow-[#7588EA] break-words truncate"
                    >
                      {
                        servicio.tableros.length !== 0 ?
                          servicio.tableros.map((tablero, i)=>(
                            <button
                                key={i}
                                className="p-2 rounded-xl hover:bg-[#7588EA] hover:text-white cursor-pointer line-clamp-1"
                                onClick={() => setDashboardOrTable(tablero)}
                            >
                              { tablero.tablero }
                            </button>
                          ))
                        :
                          <></>
                      }
                    </div>*/}
                  </div>
                  <div className="w-full md:w-1/4 flex items-center space justify-around relative group">
                    <button
                      className={`${'servicios' in sdis.anomalias[1] && sdis.anomalias[1].servicios[i].tablero ? 'cursor-pointer' : 'cursor-not-allowed' } cursor-pointer hover:font-semibold`}
                      onClick={() => setDashboardOrTable('servicios' in sdis.anomalias[1] && sdis.anomalias[1].servicios[i].tablero ? sdis.anomalias[1].servicios[i].tablero : '')}
                    >
                      {
                        'servicios' in sdis.anomalias[1] && sdis.anomalias[1].servicios[i].tablero ?
                          <EyeIcon
                            size={20}
                            fill="#4d73b4"
                          />
                        :
                          <EyeClosedIcon
                            size={20}
                            fill="#4d73b480"
                          />
                      }
                    </button>
                    {/*<div
                      className="hidden group-hover:block bg-white text-sm absolute top-full z-10 rounded-xl shadow-lg shadow-[#7588EA] break-words truncate"
                    >
                      {
                        'servicios' in sdis.anomalias[1] && sdis.anomalias[1].servicios[i].tableros.length !== 0 ?
                          sdis.anomalias[1].servicios[i].tableros.map((tablero, i)=>(
                            <button
                                key={i}
                                className="p-2 rounded-xl hover:bg-[#7588EA] hover:text-white cursor-pointer line-clamp-1"
                                onClick={() => setDashboardOrTable(tablero)}
                            >
                              { tablero.tablero }
                            </button>
                          ))
                        :
                          <></>
                      }
                    </div>*/}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
    </div>
  )
}
