import React from 'react'
import { ListadoResultadosProps } from '@/src/types/Types'

export default function ListadoResultados({ gettingLists, handleDecrease, handleIncrease, tableRef, dataListLoading}:ListadoResultadosProps) {
  return (
    <>
      <div className="mt-5">
        <h3 className="text-main">Listado de resultados</h3>
        {/*<div className="flex flex-col md:flex-row items-center justify-around w-full">
          <div className="w-6/12">
            <select className="w-full outline-0">
              <option value="">Ordenar por</option>
            </select>
          </div>

          <div className="w-2/12 flex items-center justify-center">
          </div>
        </div>*/}
      </div>

      <div className="mt-5">
        <table className="w-full m-auto " id="table-lists" ref={tableRef}>
          <thead>
            <tr className="w-full flex">
              <th className="bg-slate-50 text-gray-500 text-center w-1/5 p-1 border border-white rounded-tl-xl">
                Nombre
              </th>
              <th className="bg-slate-50 text-gray-500 text-center w-1/5 p-1 border border-white">
                Apellido
              </th>
              <th className="bg-slate-50 text-gray-500 text-center w-1/5 p-1 border border-white">
                Número de documento
              </th>
              <th className="bg-slate-50 text-gray-500 text-center w-1/5 p-1 border border-white">
                Número de contacto
              </th>
              <th className="bg-slate-50 text-gray-500 text-center w-1/5 p-1 border border-white">
                Localidad
              </th>
              <th className="bg-slate-50 text-gray-500 text-center w-1/5 p-1 border border-white rounded-tr-xl">
                Programa
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            <div className="h-[40vh] overflow-auto scrollbar-thin scrollbar-thumb-transparent text-gray-400">
              {
              dataListLoading ?
                <div className="animate-pulse space-y-4 p-4 w-full">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </div>
              :
              gettingLists.length ? (
                gettingLists.map((item, i) => (
                  <tr className="w-full flex" key={i}>
                    <td scope="col" className="text-center w-1/5 p-1">
                      {`${item.PRIMER_NOMBRE || ''}`}
                      {`${item.SEGUNDO_NOMBRE || ''}`}
                    </td>
                    <td className="text-center w-1/5 p-1">
                      {`${item.PRIMER_APELLIDO || ''}`}
                      {`${item.SEGUNDO_APELLIDO || ''}`}
                    </td>
                    <td className="text-center w-1/5 p-1">
                      {`${item.NUMERO_DOCUMENTO || ''}`}
                    </td>
                    <td className="text-center w-1/5 p-1">{`${item.TELEFONO || ''}`}</td>
                    <td className="text-center w-1/5 p-1">
                      {`${item.NOMLOCALIDAD || ''}`}
                    </td>
                    <td className="text-center w-1/5 p-1">
                      {`${item.BENEFICIO || ''}`}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="w-full flex">
                  <td scope="col" className="text-center w-full p-1 italic">
                    No se han obtenido resultados, filtre por los criterios de
                    la columna izquierda
                  </td>
                </tr>
              )}
            </div>
          </tbody>
        </table>
        <div className="flex items-center justify-center">
          <span
            onClick={() => handleDecrease({
                endpoint:'',
                view:'',
                method:'GET',
                params:{}
            })}
            className="cursor-pointer m-auto text-c360-secondary-200"
          >
            &#11164;
          </span>

          <span
            onClick={() => handleIncrease({
                endpoint:'',
                view:'',
                method:'GET',
                params:{}
            })}
            className="cursor-pointer m-auto text-c360-secondary-200"
          >
            &#11166;
          </span>
        </div>
      </div>
    </>
  );
}
