import React from 'react'
import Toggle from './Toogle';
import { FormularioFiltrosProps } from '@/src/types/Types';
import { useRef } from 'react';

export default function FormularioFiltros({ handleFilter, handleLocalidadChange, initialDateRef, finalDateRef, initialAgeGroupRef, finalAgeGroupRef, servicioRef, localidadRef, upzRef, grupoEtnicoRef, victimaRef, habitanteCalleRef, lgbtiRef, migranteRef, ruralRef, discapacidadRef, initialAgeGroup, setInitialAgeGroup, finalAgeGroup, setFinalAgeGroup, listOfBenefist, listOfBenefistLoading, listOfLocations, listOfLocationsLoading, listOfUpz, listOfUpzLoading }:FormularioFiltrosProps) {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const sliderRef = useRef<HTMLDivElement>(null);
  const handleMinRef = useRef<HTMLDivElement>(null);
  const handleMaxRef = useRef<HTMLDivElement>(null);

  const handleToggleChange = (checked:boolean) => {
    console.log("Toggle is now:", checked ? "ON" : "OFF");
  }

  const handleMouseDown = (e: React.MouseEvent, min:boolean) => {
    e.preventDefault();
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const offsetX = moveEvent.clientX - rect.left;
      let newPercentage = (offsetX / rect.width) * 100;
      newPercentage = Math.max(0, Math.min(100, newPercentage));

      if(min){
          if(Math.round(newPercentage) > (finalAgeGroup - 2)){
            setInitialAgeGroup(finalAgeGroup - 1)  
            return
          }
          setInitialAgeGroup(Math.round(newPercentage));
      }else{
        if(Math.round(newPercentage) < (initialAgeGroup + 2)){
            setFinalAgeGroup(initialAgeGroup + 1)  
            return
          }
          setFinalAgeGroup(Math.round(newPercentage));
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleInitialInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)){
            if(value >= 0 && value <= (finalAgeGroup - 1)) setInitialAgeGroup(value)
        }
    };

    const handleFinalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            if((initialAgeGroup + 1) >= 50 && value <= 100) setFinalAgeGroup(value);
        }
    };
  return (
    <>
      <div className='w-full md:w-[25%] bg-slate-100 p-4 rounded-lg h-[85vh] overflow-y-auto custom-scrollbar'>
        <h3 className='text-main font-bold text-xl'>Listado beneficiarios</h3>
        <form onSubmit={handleFilter}>
          <div className='mt-5'>
            <label className='text-second mt-5'>Filtrar por:</label>
            <select
              className='w-full h-full outline-0 m-auto text-gray-400 border border-gray-300 bg-white rounded'
              ref={servicioRef}
            >
              <option
                value=''
                disabled
              >{
                listOfBenefistLoading ? 
                  'Cargando...'
                :
                  '-- Servicio --'
                }</option>
              {
                listOfBenefist.length ? 
                  listOfBenefist.map((benefist, i)=>(
                    <option
                      key={i}
                      value={benefist.CODIGO}
                    >{benefist.BENEFICIO}</option>
                  ))
                :
                  <option>{
                      listOfBenefistLoading ?
                        'Cargando'
                      :
                        !listOfBenefistLoading && !listOfBenefist.length ?
                          'Error al cargar los datos'
                        :
                          ''
                    }</option>
              }
            </select>
            <select
              className='w-full h-full outline-0 m-auto text-gray-400 border border-gray-300 bg-white rounded'
              ref={localidadRef}
              onChange={handleLocalidadChange}
            >
              <option
                value=''
                disabled
              >{
                listOfLocationsLoading ? 
                  'Cargando...'
                :
                  '-- Localidad --'
                }</option>
              {
                listOfLocations.length ? 
                  listOfLocations.map((benefist, i)=>(
                    <option
                      key={i}
                      value={benefist.CODIGO}
                    >{benefist.LOCALIDAD}</option>
                  ))
                :
                  <option>{
                      listOfLocationsLoading ?
                        'Cargando'
                      :
                        !listOfLocationsLoading && !listOfLocations.length ?
                          'Error al cargar los datos'
                        :
                          ''
                    }</option>
              }
            </select>
            <select 
              className='w-full h-full outline-0 m-auto text-gray-400 border border-gray-300 bg-white rounded'
              ref={upzRef}
            >
              <option
                value=''
                disabled
              >{
                listOfUpzLoading ? 
                  'Cargando...'
                :
                  '-- UPZ --'
                }</option>
              {
                listOfUpz.length ? 
                  listOfUpz.map((benefist, i)=>(
                    <option
                      key={i}
                      value={benefist.CODIGO}
                    >{benefist.UPZ}</option>
                  ))
                :
                  <option>{
                      listOfUpzLoading ?
                        'Cargando'
                      :
                        !listOfUpzLoading && !listOfUpz.length ?
                          'Resolviendo...'
                        :
                          ''
                    }</option>
              }
            </select>
            <select
              className='w-full h-full outline-0 m-auto text-gray-400 border border-gray-300 bg-white rounded'
              ref={grupoEtnicoRef}
            >
              <option value=''>Grupo Étnico</option>
              <option value="INDIGENA">Indigena</option>
              <option value="GITANO">Rrom o Gitano</option>
              <option value="NAP">Negro/a, Mulato/a, afro colombiano /a, o afro descendiente</option>
              <option value="RAIZAL">Raizal del Archipiélago de San Andrés, Providencia y Santa Catalina</option>
            </select>
            <div className='mt-5 justify-start'>
              <Toggle ref={victimaRef} onToggle={handleToggleChange} label="Persona víctima del conflicto armado" />
              <Toggle ref={habitanteCalleRef} onToggle={handleToggleChange} label="Habitantes de calle" />
              <Toggle ref={lgbtiRef} onToggle={handleToggleChange} label="LGBTI" />
              <Toggle ref={migranteRef} onToggle={handleToggleChange} label="Persona migrante" />
              <Toggle ref={ruralRef} onToggle={handleToggleChange} label="Ruralidad" />
              <Toggle ref={discapacidadRef} onToggle={handleToggleChange} label="Persona con discapacidad" />
            </div>

          </div>
          <div className='mt-5'>
            <label className='text-second mt-5'>Grupo etario</label>
            <div className="w-full max-w-md mx-auto mt-6">
              <div className="flex mb-4">
                  <div className="w-1/2 mr-2">
                      <input
                      type="number"
                      min={0}
                      max={50}
                      value={initialAgeGroup}
                      onChange={handleInitialInputChange}
                      className="w-full border border-gray-300 bg-white rounded px-2 py-1 text-gray-700 focus:outline-none"
                      placeholder="Desde"
                      ref={initialAgeGroupRef}
                      />
                  </div>
                  <div className="w-1/2 ml-2">
                      <input
                      type="number"
                      min={0}
                      max={100}
                      value={finalAgeGroup}
                      onChange={handleFinalInputChange}
                      className="w-full border border-gray-300 bg-white rounded px-2 py-1 text-gray-700 focus:outline-none"
                      placeholder="Hasta"
                      ref={finalAgeGroupRef}
                      />
                  </div>
              </div>
              <div
                  className="relative h-10"
                  ref={sliderRef}
              >
                  <div
                      ref={handleMinRef}
                      onMouseDown={(e) =>handleMouseDown(e, true)}
                      className="rounded-full h-5 w-5 bg-main absolute cursor-pointer z-20"
                          style={{
                          left: `calc(${(initialAgeGroup / 100) * 100}% - 10px)`, 
                          top: "50%",
                          transform: "translateY(-50%)",
                      }}
                  ></div>
                  <div
                      ref={handleMaxRef}
                      onMouseDown={(e) =>handleMouseDown(e, false)}
                      className="rounded-full h-5 w-5 bg-main absolute cursor-pointer z-20"
                          style={{
                          left: `calc(${(finalAgeGroup / 100) * 100}% - 10px)`, 
                          top: "50%",
                          transform: "translateY(-50%)",
                      }}
                  ></div>
                  <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-200 rounded -translate-y-1/2"></div>
                  <div
                      className="absolute top-1/2 h-2 bg-second rounded -translate-y-1/2 z-0"
                      style={{
                      left: `${(initialAgeGroup / 100) * 100}%`,
                      width: `${((finalAgeGroup - initialAgeGroup) / 100) * 100}%`,
                      }}
                  />
              </div>
            </div>
          </div>
          
          <div className='selector-rango mt-10'>
            <label className='text-second mt-12 mb-2'>Fecha de entrega último beneficio</label>
            <div className='flex mt-3'>
              <div className='w-1/2 mr-2'>
                <input
                  className='w-full appearance-none text-gray-400 border border-gray-300 bg-white rounded focus:outline-none'
                  type='date'
                  ref={initialDateRef}
                  max={`${year}-${month + 1}-${day}`}

                />
              </div>
              <div className='w-1/2 ml-2'>
                <input
                  className='w-full appearance-none text-gray-400 border border-gray-300 bg-white rounded focus:outline-none'
                  type='date'
                  ref={finalDateRef}
                  max={`${year}-${month + 1}-${day}`}

                />
              </div>
            </div>

          </div>
          <div className="flex justify-center mb-4">
            <button className="bg-main rounded px-4 py-2 mt-10 text-white">
              Aplicar Filtros
            </button>
          </div>
        </form>
      </div>
    </>

  );
}
