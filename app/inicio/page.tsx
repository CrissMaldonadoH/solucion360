import InicioClientComponent from "@/src/components/inicio/InicioClientComponent";
import { getAllDocuments, getCitizenInformation, getBenefitsBoard, getFamilyBoard } from "../lib/s360";

export default function InicioPage() {

  return (
    <InicioClientComponent
      getAllDocuments={getAllDocuments}
      getCitizenInformation={getCitizenInformation}
      getBenefitsBoard={getBenefitsBoard}
      getFamilyBoard={getFamilyBoard}
    />
  );
}