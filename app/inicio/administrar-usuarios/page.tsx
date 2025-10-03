import React from 'react'
import AdministrarUsuariosClientComponent from '@/src/components/AdministrarUsuarios/AdministrarUsuariosClientComponent'
import { getUsers, editUsers, createUsers, deleteUsers } from '@/app/lib/handleUsers'

export default async function AdministrarUsuariosPage() {
  return (
    <AdministrarUsuariosClientComponent
      getUsers={getUsers}
      editUsers={editUsers}
      createUsers={createUsers}
      deleteUsers={deleteUsers}
    />
  )
}
