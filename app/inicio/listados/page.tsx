import ListadosClientComponent from "@/src/components/listados/ListadosClientComponent"
import { getBenefistList, getLocationsList, getUpzList, getPeopleList, getAllPeopleList, getPeopleListCount, getAllPeopleListCount, getHomesListCount, getAllHomesListCount } from "@/app/lib/s360"

export default function ListadosPage() {
  return (
    <ListadosClientComponent
      getBenefistList={getBenefistList}
      getLocationsList={getLocationsList}
      getUpzList={getUpzList}
      getPeopleList={getPeopleList}
      getAllPeopleList={getAllPeopleList}
      getPeopleListCount={getPeopleListCount}
      getAllPeopleListCount={getAllPeopleListCount}
      getHomesListCount={getHomesListCount}
      getAllHomesListCount={getAllHomesListCount}
    />
  )
}
