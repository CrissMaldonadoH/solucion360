import React from 'react'
import { AppUserType } from '@/src/types/Types'

export default function AppUser({ user, setEditUser, setEditUserData, setUserToDelete}:AppUserType) {
  return (
    <>
        <div className="group flex flex-col md:flex-row py-5 px-2 my-3 bg-white border border-[#F6F7F9] hover:border-gray-300 items-center rounded-xl pointer text-gray-400 hover:text-gray-500">
            <div className="w-4/5 flex flex-col md:flex-row">
                <div className="w-full md:w-1/4 break-words pr-2">
                    { user.nombre }
                </div>
                <div className="w-full md:w-1/4 break-words pr-2">
                    { user.entidad }
                </div>
                <div className="w-full md:w-1/4 break-words pr-2">
                    { user.correo }
                </div>
                <div className="w-full md:w-1/4 break-words pr-2">
                    { user.perfil }
                </div>
            </div>
            <div className="w-full md:w-1/5 flex items-center justify-around">
                <button
                    className="w-3/7 py-2 px-1 cursor-pointer rounded flex items-center justify-center bg-white bg-opacity-40 group-hover:bg-blue-400 group-hover:text-white group-hover:bg-opacity-100 "
                        onClick={ () =>{
                            setEditUser(true)
                            setEditUserData(user)
                        }}
                    >
                    Editar
                </button>

                <button
                    className="w-3/7 py-2 px-1 cursor-pointer rounded flex items-center justify-center bg-white bg-opacity-40 group-hover:bg-red-500 group-hover:bg-opacity-100 group-hover:text-white "
                    onClick={ ()=>setUserToDelete({id: user.id, nombre: user.nombre}) }
                >
                    Eliminar
                </button>
                </div>
        </div> 
    </>
  )
}
