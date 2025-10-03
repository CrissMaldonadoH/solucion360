'use client'
import { useState } from "react"
import SidebarIcon from "@/src/shared/icons/SidebarIcon"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedTab } from "@/app/redux/features/pathSlice"
import { useRouter } from "next/navigation"
import { RootState } from "@/app/redux/store"
import { navItems } from "@/app/redux/features/pathSlice"
import UsersIcon from "@/src/shared/icons/UsersIcon"
import logoBlanco from '../../../public/img/logo-blanco.png'
import Image from "next/image"

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(true);
    const router = useRouter();
    const selectedTab = useSelector((state: RootState) => state.path.selectedTab);
    
    const dispatch = useDispatch();
    
    const handleClick = (tab: string) => {
        dispatch(setSelectedTab(tab));
    };

  return (
    <aside
      className={`bg-[#334553] flex flex-col shadow-md transition-all duration-300 ease-in-out ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4 h-16 border-b">
        {
          !collapsed ? 
            <Image
              src={logoBlanco}
              alt="logo"
              width={50}
            />
          :
            <></>
        }
        <button
          className="text-gray-500 focus:outline-none cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          <SidebarIcon
            size={20}
            fill="#ffffff"  
          />
        </button>
      </div>

      <nav className="mt-6 h-full flex flex-col justify-between">
        <ul className="space-y-2 px-2">
          {navItems.map(({ name, href, icon: Icon }) => (
            <li
              className="w-full"
            key={name}>
              <button
                  onClick={() =>{
                    handleClick(href)
                    router.push(href)
                  }}
                  className={`${ href === selectedTab ? 'bg-white/30' : 'bg-transparent' } w-full flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-white/20 transition cursor-pointer`}
              >
                  <Icon size={20} fill="#ffffff" />
                  {!collapsed && <span className="text-sm font-medium text-white">{name}</span>}
              </button>
            </li>
          ))}
        </ul>
        <div
          className="p-2"
        >
          <button
              onClick={() =>{
                handleClick('/inicio/administrar-usuarios')
                router.push('/inicio/administrar-usuarios')
              }}
              className={`${ '/inicio/administrar-usuarios' === selectedTab ? 'bg-white/30' : 'bg-transparent' } w-full flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-white/20 transition cursor-pointer`}
          >
              <UsersIcon size={20} fill="#fff" />
              {!collapsed && <span className="text-sm font-medium text-white">Administrar usuarios</span>}
          </button>
        </div>
      </nav>
    </aside>
  );
}