import { SetStateAction, Dispatch } from "react"
//import { Tablero } from "@/src/types/Types"
//import DynamicTable from "./DynamicTable"
import DoubleArrowLeft from "@/src/shared/icons/DoubleArrowLeft"

export default function DashboardOrTable({dashboardOrTable, setDashboardOrTable}:{dashboardOrTable:string | null, setDashboardOrTable:Dispatch<SetStateAction<string | null>>}) {

  return (
    <div
        className="my-15 relative"
    >
        <button
          className="cursor-pointer font-semibold text-gray-300 hover:text-gray-400 m-auto text-sm flex items-center"
          onClick={() => setDashboardOrTable(null)}
        >
          <DoubleArrowLeft
            size={10}
            fill="#c0c0c0"
          />
          Volver
        </button>
        {dashboardOrTable &&
          <iframe
              title="Report Section"
              className="w-full h-screen"
              src={ dashboardOrTable ?? '' }
          ></iframe>
        }
        {/*
            dashboardOrTable?.api ? 
                <DynamicTable
                    vista={dashboardOrTable?.vista || ''}
                />
            :
            <iframe
                title="Report Section"
                className="w-full h-screen"
                src={ dashboardOrTable?.iframe }
            ></iframe>
        */}
    </div>
  )
}
