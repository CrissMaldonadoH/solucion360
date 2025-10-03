'use client'
import LinearSpinerLoading from '@/src/shared/LinearSpinnerLoading';
import DataSidebar from './DataSidebar';
import DataDashboard from './DataDashboard';
import {  DataClientComponetProps, tableroFamiliaType, TableroBeneficioType } from '@/src/types/Types';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";

//http://localhost:3000/inicio/data?source=databricks&type=cc&document=1030

export default function DataClientComponent({data, setData, loading, documents, getBenefitsBoard, getFamilyBoard}: DataClientComponetProps) {

    const [tableroBeneficio, setTableroBeneficio] = useState<TableroBeneficioType[]>([]);
    const [tableroBeneficioLoading, setTableroBeneficioLoading] = useState<boolean>(false);
    const [tableroFamilia, setTableroFamilia] = useState<tableroFamiliaType[]>([]);
    const [tableroFamiliaLoading, setTableroFamiliaLoading] = useState<boolean>(false);
    
    const benefitsBoard = async() =>{

        setTableroBeneficioLoading(true)
        const request = await getBenefitsBoard(data.TIPO_DOCUMENTO, data.NUMERO_DOCUMENTO)
        setTableroBeneficioLoading(false)

        if(request === null){
            toast.error('Error al cargar el tipo de documentos')
            return
        }

        if(request && Array.isArray(request)){
            setTableroBeneficio(request)
        }
    }

    const familyBoard = async() =>{

        setTableroFamiliaLoading(true)
        const request = await getFamilyBoard(Number(data.ID_HOGAR))
        setTableroFamiliaLoading(false)

        if(request === null){
            toast.error('Error al cargar el tipo de documentos')
            return
        }

        if(request && Array.isArray(request)){
            setTableroFamilia(request)
        }
    }

    useEffect(()=>{
        benefitsBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[getBenefitsBoard])

    useEffect(()=>{
        familyBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[getFamilyBoard])

  return (
    <>
        {
            loading ?
                <div
                    className='flex items-center justify-center h-full'
                >
                    <LinearSpinerLoading
                        width={20}
                        height={20}
                    />
                </div>
            :
                data ?
                    <div className='flex flex-col mt-[4%] h-screen w-4/5 md:w-full bg-white rounded-xl p-4'>
                        <div className='flex flex-col md:flex-row'>
                            <div className='w-full md:w-1/3'>
                                <DataSidebar
                                    data = { data }
                                    documents={documents}
                                />
                            </div>
                            <DataDashboard
                                data = { data }
                                tableroBeneficio={tableroBeneficio}
                                tableroBeneficioLoading={tableroBeneficioLoading}
                                setData={setData}
                                tableroFamilia={tableroFamilia}
                                tableroFamiliaLoading={tableroFamiliaLoading}
                            />
                        </div>
                    </div>
                :
                    <div
                        className='flex items-center justify-center h-full'
                    >
                        Dartos no encontrados
                    </div>
        }
    </>
  )
}
