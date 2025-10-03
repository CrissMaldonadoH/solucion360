import { requestOptions, fetchDataProps, fetchDataResponse, FilterParamsStructure } from "../types/Types";

export const useHandleFetch = () =>{

    const fetchData = async ({endpoint, method, view, fuente, params}: fetchDataProps):Promise<fetchDataResponse> =>{

        let BASE_URL:string = `http://172.171.225.112:9090/server/c360`;

        if(endpoint) BASE_URL +=  `/${endpoint}`
        if(view) BASE_URL +=  `/views/${view}?`
        if(fuente) BASE_URL +=  `fuente=${fuente}&`

        for (const param in params) {
            const value = params[param];

            if (param === 'groupby' && typeof value === 'string') {
                BASE_URL += `$groupby=${value}&`;
            }

            if (param === 'select' && typeof value === 'string') {
                BASE_URL += `$select=${value}&`;
            }

            if (param === 'filter' && typeof value === 'object' && value !== null) {
                BASE_URL += `$filter=`;
                const filterObj = value as FilterParamsStructure;
                for (const filterKey in filterObj) {
                    BASE_URL += `${filterKey}=${filterObj[filterKey]}&`;
                }
            }

            // Agrega aquí otros posibles params si es necesario (start_index, count, etc.)
        }
        
        const requestOptions:requestOptions = {
            method: method,
            headers: { "Content-Type": "application/json" },
        };
   
       

        try {
            const response = await fetch(`${BASE_URL}$format=json`, requestOptions);

            if(!response.ok){
                const error = await response.json();
                console.error(error)
                return null
            }
            
            let data;
            try {
                data = await response.json();
                
                const organizedData = {
                    response: response,
                    data: data
                    }
                return organizedData
                // Si es un objeto con 'elements', devuelve 'elements', sino devuelve el objeto completo (en este caso, el número)
                // return (data && typeof data === 'object' && 'elements' in data) ? data.elements : data;
            } catch(err:unknown) {
                const knownError = err as {message: string};
                console.log(knownError);
                return null
            }
        } catch (err:unknown) {
            const knownError = err as {message: string};
            console.log(knownError);
            // Informar al usurio
            return null;
        } 
      
    }
     
    return{
        fetchData,
    }
}