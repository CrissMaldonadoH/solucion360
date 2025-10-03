'use client'
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/app/redux/store"
import { useRouter } from "next/navigation";
import { setSelectedTab } from "@/app/redux/features/pathSlice";
import { navItems } from "@/app/redux/features/pathSlice";
import { jwtDecode } from "jwt-decode";
import { DecodedUserToken } from "@/src/types/Types";
import { useState } from "react";
import Cookies from "js-cookie";
import SimpleArrowDown from "@/src/shared/icons/SimpleArrowDown";
import PowerOffIcon from "@/src/shared/icons/PowerOffIcon";
import { useMsal } from "@azure/msal-react";
import { clearUser } from "@/app/redux/features/authUserSlice";

export default function Header() {
    const selectedTab = useSelector((state: RootState) => state.path.selectedTab);
    //const token = useSelector((state: RootState) => state.user.token);
    const token = Cookies.get("auth");
    const pathName:string[] = selectedTab.split('/').filter(Boolean);
    const router = useRouter();
    const dispatch = useDispatch();
    const { instance } = useMsal();

    const [ floatWindow, setFloatWindow ] = useState(false)

    let user: DecodedUserToken | null = null;

    if (token) {
      try {
        user = jwtDecode<DecodedUserToken>(token);
      } catch (error) {
        console.error("Invalid JWT:", error);
      }
    }

    const handleClick = (tab: string) => {
        const a = navItems.find(item => {
          const segments = item.href.split('/').filter(Boolean);
          return segments[segments.length -1] == tab
        });

        dispatch(setSelectedTab(a ? a.href : navItems[0].href));
        router.push(a ? a.href : navItems[0].href)
    };

    const handleLogout = () => {
      instance.logoutPopup().then(() => {
        dispatch(clearUser());
        router.push("/");
      });
    };
  return (
    <div
      className="absolute w-full top-0 z-10 px-3 py-2 text-sm flex items-center justify-between"
    >
        <h1 className="font-semibold">
          {
            pathName.length ? 
              pathName.map((path, i)=>{
                if(i === pathName.length - 1){
                  return(
                    <span
                      key={i}
                      className="text-main font-semibold"
                    >
                      {path.replaceAll('-', ' ')}
                    </span>
                  )
                }else{
                  return(
                    <span
                      key={i}
                      className="text-slate-400 cursor-pointer font-normal"
                      onClick={() =>{
                        handleClick(path)
                      }}
                    >
                      {`${path} / `}
                    </span>
                  )
                }
              })
            :
              <></>
          }
        </h1>
        <div
          className="relative"
        >
          <button
            className={`${selectedTab == '/inicio' ? 'text-white' : 'text-main'} flex items-center cursor-pointer`}
            onClick={()=>{ setFloatWindow(!floatWindow)}}
          >
            {user && (
              <>
                <span
                  className="flex flex-col items-start"
                >
                  <span
                    className="font-semibold"
                  >{user.nombre}</span>
                  <span>{user.entidad}</span>
                </span>
                <SimpleArrowDown
                  size={15}
                  fill={selectedTab == '/inicio' ? '#fff' : '#4d73b4'}
                />
              </>
            )}
          </button>
          {
            floatWindow &&
              <div className={ `top-full right-0 transition-all duration-500 absolute bg-white rounded-lg w-38 py-1 px-2 border border-gray-200` }>
                <button
                  className="text-slate-900 text-right cursor-pointer font-bold"
                  onClick={()=>{ setFloatWindow(!floatWindow)}}
                >X</button>

                <button
                  className="flex items-center gap-2 w-full m-auto p-2 cursor-pointer rounded-lg my-2 justify-center transition-all duration-500 text-sm text-white bg-red-800 hover:bg-red-700"
                  onClick={ () => handleLogout()  }
                >
                  <PowerOffIcon
                    size={15}
                    fill="#fff"
                  />
                  
                  Cerrar sesión
                </button>

            </div>
                  }
        </div>
    </div>
  )
}
