'use client'
import React, { ChangeEvent, FormEvent } from 'react'
import { AdministrarUsuariosClientComponentProps, userResponse } from '@/src/types/Types'
import { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import AppUser from './AppUser'
import LinearSpinerLoading from '@/src/shared/LinearSpinnerLoading'

export default function AdministrarUsuariosClientComponent({getUsers, editUsers, createUsers, deleteUsers}:AdministrarUsuariosClientComponentProps) {
    const [usersApp, setUsersApp] = useState<userResponse[]>([])
    const [ loadingUsers, setLoadingUsers ] = useState<boolean>(false)
    const [ leakedData, setleakedData ] = useState<userResponse[]>([]) 
    const [editUser, setEditUser] = useState<boolean>(false)
    const [editUserData, setEditUserData] = useState<userResponse | null>(null)
    const [editUserLoading, setEditUserLoading] = useState<boolean>(false)
    const [userToCreate, setUserToCreate] =useState<{nombre: string, entidad: string, correo: string, perfil: string,} | null>(null)
    const [createUserLoading, setCreateUserLoading] = useState<boolean>(false)
    const [userToDelete, setUserToDelete] = useState<{id:number, nombre:string} | null>(null)
    const [deletingUser, setDeletingUser] = useState<boolean>(false)

    const filterSelectRef = useRef<HTMLSelectElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)

    const nombreRef = useRef<HTMLInputElement>(null)
    const empresaRef = useRef<HTMLInputElement>(null)
    const correoRef = useRef<HTMLInputElement>(null)
    const perfilRef = useRef<HTMLSelectElement>(null)

    const handleChage = (e:FormEvent)=>{
        const element = e.target as HTMLInputElement | HTMLSelectElement
        const {name, value} = element;

        setEditUserData((prev) => {
            if (!prev) return prev; // or throw if null is unexpected
            return {
            ...prev,
            [name]: value,
            } as userResponse;
        });
    }

    const handleChageToCreateUser = (e:FormEvent)=>{
        const element = e.target as HTMLInputElement | HTMLSelectElement
        const {name, value} = element;

        setUserToCreate((prev) => {
            if (!prev) return prev; // or throw if null is unexpected
            return {
            ...prev,
            [name]: value,
            } as userResponse;
        });
    }

    async function getAllUsers() {
        const newState:userResponse[] = [];
        setLoadingUsers(true)
        const request = await getUsers()
        setLoadingUsers(false)

        if(request == null){
            toast.error('No se pudo cargar los usuarios')
        }

        if(request && request.length && Array.isArray(request)){
            newState.push(...request)
            setUsersApp(newState)
        }

    }

    const handleUpdateUser = async() =>{
        if(editUserData){

            setEditUserLoading(true)
            const fillsIsOk = Object.values(editUserData).every( value => value !== null && value !== undefined && value !== '');
    
            if(!fillsIsOk) toast.error('Todos los campos son obligatorios')
    
            const request = await editUsers(editUserData)
    
            setEditUserLoading(false)

            if(request == null){
                toast.error('No se pudo actualizar el usuario')
            }
    
            if(request){
                toast.done('Usuario actualizado existosamente')
                setEditUserData(null)
                setEditUser(false)
                getAllUsers()
            }
        }

    }

    const handleCreateUser = async() =>{
        if(userToCreate){

            setCreateUserLoading(true)
            const fillsIsOk = Object.values(userToCreate).every( value => value !== null && value !== undefined && value !== '');
    
            if(!fillsIsOk) toast.error('Todos los campos son obligatorios')
    
            const request = await createUsers(userToCreate)
    
            setCreateUserLoading(false)

            if(request == null){
                toast.error('No se pudo crear el usuario')
            }
    
            if(request){
                toast.done('Usuario creado existosamente')
                setUserToCreate(null)
                getAllUsers()
            }
        }

    }

    const handleDeleteUser = async() =>{
        if(userToDelete){

            setDeletingUser(true)
            
            const request = await deleteUsers(userToDelete.id)
    
            setDeletingUser(false)

            if(request == null){
                toast.error('No se pudo Eliminar el usuario')
            }
    
            if(request){
                toast.done('Usuario eliminado existosamente')
                setUserToDelete(null)
                getAllUsers()
            }
        }

    }

    const filterSelect = (e:ChangeEvent<HTMLSelectElement>) =>{
        const value = e.target.value
        const filterData = value === "todos" ? usersApp : usersApp.filter(user => user.perfil === value);
        setleakedData(filterData);
        
    }

    const filterInput = (filter:string) =>{

        const input = filter.toLowerCase();
        const filterData:userResponse[] = []

        usersApp.forEach( item  => {
            
            const user = item.nombre.toLowerCase()

            if( user.indexOf(input) !== -1 ){
                filterData.push(item)
            }

            if(input === ''){
                setleakedData(usersApp)
            }

        });  
        
        setleakedData(filterData)
    }

    useEffect(()=>{
        getAllUsers()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[getUsers])
  return (
    <>
        <div
            className='mt-15 mx-5 mb-5'
        >
    
            <div className="flex flex-col md:flex-row items-center justify-between">

                <div className="flex w-full md:w-2/5 justify-between items-center">
                    <p className="w-2/5 text-gray-500 font-semibold">
                        {
                            loadingUsers ?
                                <div className="space-y-4 animate-pulse p-4 max-w-md mx-auto">
                                    <div className="h-4 bg-gray-300 rounded w-full mx-auto"></div>
                                </div>
                            :
                            `${ usersApp.length } usuarios tienen acceso`
                        }
                    
                    </p>
                    <select
                        className="w-2/5 outline-none bg-white border border-gray-300 rounded-xl py-3 px-2 text-gray-400"
                        ref = { filterSelectRef }
                        onChange={ e => filterSelect(e)}
                    >
                        <option className="bg-white" value="todos">Ver todos</option>
                        <option className="bg-white" value="usuario">Ver usuarios</option>
                        <option className="bg-white" value="administrador">Ver administradores</option>
                    </select>
                </div>

                <div
                    className='w-1/5 flex'
                >
                    <button
                        className='bg-main rounded px-2 py-1 m-auto cursor-pointer'
                        onClick={() => setUserToCreate({nombre:'', entidad:'', correo:'', perfil:''})}
                    >
                        Nuevo usuario
                    </button>
                </div>

                <div className="flex w-full md:w-2/5 justify-between items-center bg-white border border-gray-300 rounded-xl py-3 px-2">
                        
                    <input
                        placeholder="Buscar por nombre"
                        className="w-full outline-none bg-transparent text-gray-400"
                        onChange={ e => filterInput(e.target.value)}
                    />
                </div>
            </div>

            <div className="mt-10">
                <div className="hidden md:flex py-5 px-2 mb-5 bg-[#F6F7F9] text-[#909090]">
                    <div className="w-1/5">
                        Nombre
                    </div>
                    <div className="w-1/5">
                        Entidad
                    </div>
                    <div className="w-1/5">
                        Correo
                    </div>
                    <div className="w-1/5">
                        Perfil
                    </div>
                    <div className="w-1/5"></div>
                </div>
                <div ref= { containerRef } className="overflow-y-auto h-[48vh] custom-scrollbar">
                {
                loadingUsers ?
                    <div className="space-y-4 animate-pulse p-4 w-full">
                        <div className="h-10 bg-gray-300 rounded w-full mx-auto mb-3"></div>
                        <div className="h-10 bg-gray-300 rounded w-full mx-auto mb-3"></div>
                        <div className="h-10 bg-gray-300 rounded w-full mx-auto mb-3"></div>
                    </div>
                :
                leakedData.length ?

                    leakedData.map( user =>(
                        <AppUser
                            key = { user.id }
                            user={user} 
                            setEditUser={setEditUser}
                            setEditUserData={setEditUserData}
                            setUserToDelete={setUserToDelete}
                            
                        />
                    ))
                :
                    usersApp.map( user =>(
                        <AppUser
                            key = { user.id }
                            user={user}
                            setEditUser={setEditUser}
                            setEditUserData={setEditUserData}
                            setUserToDelete={setUserToDelete}
                            
                        />
                    ))
                }
                </div>
            </div>
        
        </div>
        {
            userToCreate &&
                <div
                    className='bg-white/90 absolute w-full top-0 bottom-0 z-10 flex flex-col justify-center'
                >
                    <div className="w-3/5 uppercase flex items-center justify-between border-b-2 border-gray-300 py-3 px-5  mx-auto">
                        <p className="w-full font-bold text-gray-400 text-xl uppercase">Nuevo usuario</p>
                        <button
                            onClick={() => setUserToCreate(null) }
                            className="font-bold text-xl text-red-950 cursor-pointer"
                        >X</button>
                    </div>
                    <div className="w-3/5 mx-auto">
                        <div>
                            <div className="w-full mx-2 px-1 flex border-2 rounded-3xl border-black my-5 justify-center text-gray-400">
                                
                                <input
                                    type="text"
                                    placeholder="Ej: Jhon Doe"
                                    className="outline-none w-11/12"
                                    id="nombre"
                                    name="nombre"
                                    ref={ nombreRef }
                                    value =  {userToCreate.nombre}
                                    onChange={(e) => handleChageToCreateUser(e)}
                                />
                            </div>
                            <div className="w-full mx-2 px-1 flex border-2 rounded-3xl border-black my-5 justify-center text-gray-400">
                                
                                <input
                                    type="text"
                                    placeholder="Ej: Secretaría de Integración Social"
                                    className="outline-none w-11/12"
                                    id="empresa"
                                    name="entidad"
                                    ref={ empresaRef }
                                    value =  {userToCreate.entidad}
                                    onChange={(e) => handleChageToCreateUser(e)}
                                />
                            </div>
                            <div className="w-full mx-2 px-1 flex border-2 rounded-3xl border-black my-5 justify-center text-gray-400">
                                
                                <input
                                    type="email"
                                    placeholder="Ej: usuario@empresa.com"
                                    className="outline-none w-11/12"
                                    id="correo"
                                    name="correo"
                                    ref={ correoRef }
                                    value =  {userToCreate.correo}
                                    onChange={(e) => handleChageToCreateUser(e)}
                                />
                            </div>
                            <div className="w-full mx-2 px-1 flex border-2 rounded-3xl border-black my-5 justify-center text-gray-400">
                                
                                <select
                                    className="outline-none w-11/12"
                                    name="perfil"
                                    ref={ perfilRef }
                                    value =  {userToCreate.perfil}
                                    onChange={(e) => handleChageToCreateUser(e)}
                                >
                                    <option value="usuario">Usuario</option>
                                    <option value="administrador">Administrador</option>
                                </select>
                            </div>
                            <div className="flex">
                                <button
                                    className='m-auto px-2 py-1 rounded text-base bg-main cursor-pointer'
                                    onClick={() => handleCreateUser()}
                                >
                                    {
                                        createUserLoading ?
                                            <LinearSpinerLoading
                                                width={20}
                                                height={20}
                                            />
                                        :
                                            'Crear'
                                    }
                                    
                                </button>
                                    
                            </div>
                        </div>
                    </div>
                </div>
        }
        {
            (editUser && editUserData) &&
                <div
                    className='bg-white/90 absolute w-full top-0 bottom-0 z-10 flex flex-col justify-center'
                >
                    <div className="w-3/5 uppercase flex items-center justify-between border-b-2 border-gray-300 py-3 px-5  mx-auto">
                        <p className="w-full font-bold text-gray-400 text-xl uppercase">Actualizar usuario</p>
                        <button
                            onClick={() => setEditUser(false) }
                            className="font-bold text-xl text-red-950 cursor-pointer"
                        >X</button>
                    </div>
                    <div className="w-3/5 mx-auto">
                        <div>
                            <div className="w-full mx-2 px-1 flex border-2 rounded-3xl border-black my-5 justify-center text-gray-400">
                                
                                <input
                                    type="text"
                                    placeholder="Ej: Jhon Doe"
                                    className="outline-none w-11/12"
                                    id="nombre"
                                    name="nombre"
                                    ref={ nombreRef }
                                    value =  {editUserData.nombre}
                                    onChange={(e) => handleChage(e)}
                                />
                            </div>
                            <div className="w-full mx-2 px-1 flex border-2 rounded-3xl border-black my-5 justify-center text-gray-400">
                                
                                <input
                                    type="text"
                                    placeholder="Ej: Secretaría de Integración Social"
                                    className="outline-none w-11/12"
                                    id="empresa"
                                    name="entidad"
                                    ref={ empresaRef }
                                    value =  {editUserData.entidad}
                                    onChange={(e) => handleChage(e)}
                                />
                            </div>
                            <div className="w-full mx-2 px-1 flex border-2 rounded-3xl border-black my-5 justify-center text-gray-400">
                                
                                <input
                                    type="email"
                                    placeholder="Ej: usuario@empresa.com"
                                    className="outline-none w-11/12"
                                    id="correo"
                                    name="correo"
                                    ref={ correoRef }
                                    value =  {editUserData.correo}
                                    onChange={(e) => handleChage(e)}
                                />
                            </div>
                            <div className="w-full mx-2 px-1 flex border-2 rounded-3xl border-black my-5 justify-center text-gray-400">
                                
                                <select
                                    className="outline-none w-11/12"
                                    name="perfil"
                                    ref={ perfilRef }
                                    value =  {editUserData.perfil}
                                    onChange={(e) => handleChage(e)}
                                >
                                    <option value="usuario">Usuario</option>
                                    <option value="administrador">Administrador</option>
                                </select>
                            </div>
                            <div className="flex">
                                <button
                                    className='m-auto px-2 py-1 rounded text-base bg-main cursor-pointer'
                                    onClick={() => handleUpdateUser()}
                                >
                                    {
                                        editUserLoading ?
                                            <LinearSpinerLoading
                                                width={20}
                                                height={20}
                                            />
                                        :
                                            'Actualizar'
                                    }
                                    
                                </button>
                                    
                            </div>
                        </div>
                    </div>
                </div>
        }
        {
            userToDelete &&
                <div
                    className='bg-white/90 absolute w-full top-0 bottom-0 z-10 flex flex-col justify-center'
                >
                    <div className="w-3/5 uppercase flex items-center justify-between border-b-2 border-gray-300 py-3 px-5  mx-auto">
                        <p className="w-full font-bold text-gray-400 text-xl uppercase">¿Eliminar a {userToDelete.nombre}</p>
                        <button
                            onClick={() => setUserToDelete(null) }
                            className="font-bold text-xl text-red-950 cursor-pointer"
                        >X</button>
                    </div>
                    <div className="w-3/5 mx-auto flex">
                        <button
                            className='mx-auto mt-5 px-2 py-1 rounded text-base bg-red-800 cursor-pointer'
                            onClick={() => handleDeleteUser()}
                        >
                            {
                                deletingUser ?
                                    <LinearSpinerLoading
                                        width={20}
                                        height={20}
                                    />
                                :
                                    'Eliminar'
                            }
                            
                        </button>
                    </div>
                </div>
        }
    </>
  )
}
