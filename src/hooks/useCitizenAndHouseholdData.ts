import { useState } from "react";
import { toast } from "react-toastify";
import { useHandleFetch } from "./useHandleFetch";
import { fetchDataProps } from "../types/Types";

type RecordData = Record<string, unknown>;

export const useCitizenAndHouseholdData = () => {
  const [dataList, setDataList] = useState<RecordData[]>([]);
  const [totalCitizens, setTotalCitizens] = useState<number | null>(null);
  const [totalHouseholds, setTotalHouseholds] = useState<number | null>(null);

  const { fetchData } = useHandleFetch()
  
  const loadTotalCitizens = async (url: fetchDataProps): Promise<void> => {
    const data = await fetchData(url);
    if (data === null) {
      toast.error("Error al cargar el total de ciudadanos.");
      return;
    }
    setTotalCitizens(typeof data.data == 'string' ? Number(data.data) : 0);
  };

  const loadTotalHouseholds = async (url: fetchDataProps): Promise<void> => {
    const data = await fetchData(url);
    if (data === null) {
      toast.error("Error al cargar el total de hogares.");
      return;
    }
    setTotalHouseholds(typeof data.data == 'string' ? Number(data.data) : 0);
  };

  const loadDataByPagination = async (url: fetchDataProps): Promise<void> => {
    const data = await fetchData(url);
    if (data === null) {
      toast.error("Error al cargar datos por paginación.");
      return;
    }
    if(typeof data.data == 'string'){
        setDataList([]);
    }else{
        setDataList([data.data]);
    }
  };

  const loadFilteredData = async (url: fetchDataProps): Promise<void> => {
    const data = await fetchData(url);
    if (data === null) {
      toast.error("Error al cargar datos filtrados.");
      return;
    }
    if(typeof data.data == 'string'){
        setDataList([]);
    }else{
        setDataList([data.data]);
    }
  };

  return {
    dataList,
    loadDataByPagination,
    loadFilteredData,
    totalCitizens,
    totalHouseholds,
    loadTotalHouseholds,
    loadTotalCitizens,
  };
};
