import React from 'react'
import { useState, useEffect } from 'react'
import { defaultSchemas } from '../staticData/defaultSchemas';
import { SchemaPropertiesType, fetchDataProps } from '@/src/types/Types';
import { useHandleFetch } from '@/src/hooks/useHandleFetch';
import { useDataTableConfig, dataTableDefaultProps } from '@/src/hooks/useDataTableConfig';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Skeleton } from "primereact/skeleton";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";

 function DynamicTable({vista: vistaProp, camposParaVisualizar: camposProp,}:{vista:string, camposParaVisualizar?: string[];}) {

    const [properties, setProperties] = useState<SchemaPropertiesType | null>(null);
    const [filterOptions, setFilterOptions] = useState<string[] | null>(null);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [enabledFilter, setEnabledFilter] = useState(false);
    const [totalRecords, setTotalRecords] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { fetchData } = useHandleFetch()
    
    type MyRowData = Record<string, unknown>;
    const {
        data,
        setData,
        lazyState,
        onPage: defaultOnPage,
        onSort: defaultOnSort,
        onFilter: defaultOnFilter,
    } = useDataTableConfig<MyRowData>();
    // Usa la función proporcionada o la predeterminada
    const onPage = defaultOnPage;
    const onSort = defaultOnSort;
    const onFilter = defaultOnFilter;
    const camposFinal = camposProp;

    const getFilters = async(view:string)=>{
        const request = await fetchData({
            endpoint:'ds_validacion_ciudadano_sdis',
            view:view,
            method:'GET',
            params:{
                select:'motivo',
                groupby:'motivo'
            }
        })

        if(request == null){
            console.log('No se obtuvieron los filtros')
            toast.error('No se obtuvieron los filtros')
            setEnabledFilter(false)
            return
        }

        if(request){
            setFilterOptions(typeof request.data == 'string' ? [request.data] : null)
            /*setFilterOptions(
                data.elements.map((item) => ({
                label: item.motivo,
                value: item.motivo,
                }))
            );*/
            setEnabledFilter(false)
        }
    }

    useEffect(()=>{
        const matchingSchema = defaultSchemas.find(
          (schema) => schema.name === vistaProp
        );
        if (matchingSchema) {
          setProperties(matchingSchema.properties); 
        } else {
          console.error(`No se encontró un esquema predefinido para la vista: ${vistaProp}`);
          toast.error(`No se encontró un esquema predefinido para la vista: ${vistaProp}`)
        }

        getFilters(vistaProp)
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vistaProp])

    useEffect(() => {
        let url, urlTotal = null;
        if (selectedFilter) {
            url={
                endpoint:'ds_validacion_ciudadano_sdis',
                view: vistaProp,
                method:'GET',
                params:{
                    motivo:selectedFilter,
                    start_index: lazyState.first,
                    count: lazyState.rows
                }
            }
            urlTotal = {
                endpoint:'ds_validacion_ciudadano_sdis',
                view: vistaProp,
                method:'GET',
                params:{
                    motivo:selectedFilter,
                    count: lazyState.rows
                }
            }
        } else {
            url={
                endpoint:'ds_validacion_ciudadano_sdis',
                view: vistaProp,
                method:'GET',
                params:{
                    start_index: lazyState.first,
                    count: lazyState.rows
                }
            }
            urlTotal = {
                endpoint:'ds_validacion_ciudadano_sdis',
                view: vistaProp,
                method:'GET',
                params:{
                    count: lazyState.rows
                }
            }
        }
        getData(url);
        getTotalRecords(urlTotal);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lazyState, selectedFilter]);

    const getTotalRecords = async (url:fetchDataProps |null) => {
        if(url){
            const data = await fetchData(url);
            if (data === null) {
                console.log("Error al cargar el total de registros.");
                toast.error('Error al cargar el total de registros.')
                return;
            }
            if (data.data === '0') {
                console.log("No hay registros por presentar para esta validación.");
                toast.error('No hay registros por presentar para esta validación.')
                return;
            }
            // toast.info(`Total de registros: ${data}`);
            setTotalRecords(typeof data.data == 'string' ?  data.data : null);
            
        }
    };

    const getData = async (url:fetchDataProps |null) => {
        if(url){
            setLoading(true);
            const data = await fetchData(url);
            if (data === null) {
                console.log("Error al cargar el total de ciudadanos.");
                toast.error('No hay registros por presentar para esta validación.')
                setLoading(false);
                return;
            }
            if (typeof data.data === 'string') {
                setData([]); 
            } else {
                setData([data.data]);
            }
            setLoading(false);

        }
    };

    const generateColumnsSkeleton = () => {
        const bodyTemplate = () => {
        return <Skeleton></Skeleton>;
        };

        let columns;

        if (camposFinal && camposFinal.length > 0) {
            columns = camposFinal;
        } else {
            columns = Object.keys(properties ? properties : {});
        }

        return columns.map((campo, index) => {
            const headerName = campo
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase());

            return (
                <Column
                    key={index}
                    field={campo}
                    header={headerName}
                    headerClassName={`${index === 0 ? "rounded-tl-xl" : ""} ${
                        index === columns.length - 1 ? "rounded-tr-xl" : ""
                    } bg-slate-50 text-gray-500 text-center p-3 border border-white`}
                    body={bodyTemplate}
                ></Column>
            );
        });
    };

    function DataTableSkeleton() {
        const items = Array.from({ length: 50 }, (_, i) => ({ index: i }));

        return (
        <div className="card">
            <DataTable
            paginator
            first={0}
            rows={50}
            totalRecords={100}
            value={items}
            className="p-datatable-striped"
            scrollable
            scrollHeight="400px"
            >
            {generateColumnsSkeleton()}
            </DataTable>
        </div>
        );
  }

  const generateColumns = () => {
    let columns;

    if (camposFinal && camposFinal.length > 0) {
      columns = camposFinal;
    } else {
      columns = Object.keys(properties ? properties : {});
    }

    return columns.map((campo, index) => {
      // Título amigable para la columna
      const headerName = campo
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      return (
        <Column
          key={index}
          field={campo}
          header={headerName}
          headerClassName={`${index === 0 ? "rounded-tl-xl" : ""} ${
            index === columns.length - 1 ? "rounded-tr-xl" : ""
          } bg-slate-50 text-gray-500 text-center p-3 border border-white`}
          // {...dataColumnsProps}
        />
      );
    });
  };

  const exportToExcel = async () => {
    setLoading(true);

    try {
      let allData:string[] = [];
      let startIndex = 0;
      const pageSize = Math.ceil((totalRecords ? parseInt(totalRecords) : 0) / 5); 
      let url; 
      // Calcular la URL para descargar todos los datos, esto puede requerir ajustes
      if (selectedFilter) {
        url ={
            endpoint:'ds_validacion_ciudadano_sdis',
            view: vistaProp,
            method:'GET',
            params:{
                motivo: selectedFilter,
                start_index: startIndex,
                count: pageSize
            }
        }
      } else {
        url ={
            endpoint:'ds_validacion_ciudadano_sdis',
            view: vistaProp,
            method:'GET',
            params:{
                start_index: startIndex,
                count: pageSize
            }
        }
      }
      while (true) {
        const partialData = await fetchData(url);
        if (!partialData === null) {
          break; // No hay más datos para cargar
        }
        if(typeof partialData?.data == 'string') allData = [...allData, ...[partialData?.data]]; // Concatenar datos
        startIndex += pageSize;
      }

      const worksheet = XLSX.utils.json_to_sheet(allData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
      XLSX.writeFile(workbook, "Datos_Exportados.xlsx");
    } catch (error) {
      console.error("Error al exportar datos.", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <div
        className={`flex items-center w-full border-orange-800 px-5 ${
          enabledFilter ? "flex-row" : "justify-between"
        }`}
      >
        {/* Se muestra el Dropdown solo si enabledFilter es verdadero. */}
        {enabledFilter && (
          <div className="flex items-center">
            <Dropdown
              value={selectedFilter}
              options={filterOptions ? filterOptions : []}
              onChange={(e) => setSelectedFilter(e.value)}
              placeholder="Selecciona un motivo"
            />
          </div>
        )}

        {/* Se muestra el conteo total siempre, pero con un margen solo si el dropdown está presente. */}
        <div className={`flex items-center ${enabledFilter ? "ml-5" : "ml-0"}`}>
          {loading ? (
            <Skeleton
              width="10rem"
              className="mb-2"
              borderRadius="16px"
            ></Skeleton>
          ) : (
            <div
                className='text-gray-300'
            >
              Total de personas:{" "}
              {
                totalRecords === '0' ?
                    "0"
                : 
                    `${lazyState.first + 1} - ${Math.min( lazyState.first + lazyState.rows, parseInt(totalRecords ? totalRecords : '0'))}`
                
                } de {totalRecords === '0' ? "0" : totalRecords}
            </div>
          )}
        </div>

        {/* Botón de exportar, que se mantiene a la derecha. */}
        <div className="flex justify-end flex-grow text-gray-300">
          <button onClick={exportToExcel}>
            Descargar
          </button>
        </div>
      </div>

      {loading ? (
        DataTableSkeleton()
      ) : (
        <>
          <DataTable
            value={data}
            lazy
            filterDisplay="row"
            scrollable
            scrollHeight="400px"
            className="mt-0 overflow-x-auto w-full text-gray-300"
            stripedRows
            paginator
            first={lazyState.first}
            rows={lazyState.rows}
            totalRecords={totalRecords ? parseInt(totalRecords) : 0}
            onPage={onPage}
            onSort={onSort}
            onFilter={onFilter}
          >
            {generateColumns()}
          </DataTable>
        </>
      )}
    </div>
  );
}

DynamicTable.defaultProps = dataTableDefaultProps;

export default DynamicTable;