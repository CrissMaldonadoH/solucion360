
export default function CasosDeUsoClientComponent() {
  return (
    <div className="max-w-5xl mx-auto p-6 mt-15 max-h-[90vh] overflow-auto custom-scrollbar">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Casos de uso</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Caso 1: Buscar ciudadano</h3>
        <p className="text-gray-600 mb-4">
          Seleccione entre cualquiera de estas cédulas para consultar un ciudadano:
        </p>

        <ul className="list-disc list-inside text-gray-800 mb-4">
          <li>389372476</li>
          <li>832654313</li>
          <li>476793253</li>
        </ul>
        <p className="text-gray-600 mb-4">Al ubicar al ciudadano en la parte derecha encontrará las secciones con los datso generales del ciudadano, como nombre, documento, datos de constacto, caracterización, entre otros.</p>
        <table className="w-full text-left border border-gray-300 rounded-md overflow-hidden text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Vista</th>
              <th className="px-4 py-2">Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium text-gray-800">Actual</td>
              <td className="px-4 py-2 text-gray-600">Puedes ver el balance de los últimos beneficios que recibió el ciudadano.</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium text-gray-800">Histórico</td>
              <td className="px-4 py-2 text-gray-600">Puedes ver el historial de beneficios que ha recibido el ciudadano.</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium text-gray-800">Geolocalización</td>
              <td className="px-4 py-2 text-gray-600">Puedes la ubicación del ciudadano.</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2 font-medium text-gray-800">Grupo Familiar</td>
              <td className="px-4 py-2 text-gray-600">
                Puedes ver los integrandes del grupo familiar del ciudadano.
                <ul className="list-disc list-inside">
                    <li>Aquí puedes dar click en el botón VER, ubicado la lado derecho de la casilla de cada integrante de la familia, para obtener detalles sobre los beneficios que este ha recibido.</li>
                </ul>    
            </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Caso 2: Tableros</h3>
        <p className="text-gray-600">
          Ingrese a cualquier tablero para conocer métricas en Power BI sobre el estado actual de las estrategias y servicios del Ministerio de Salud.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Caso 3: Listados</h3>
        <p className="text-gray-600 mb-4">
          Use los siguientes filtros para obtener el listado de ciudadanos que cumplen con los criterios:
        </p>

        <ul className="text-gray-800 mb-4">
          <li>Filtros:
            <ul className="list-disc list-inside text-gray-800 mb-4">
                <li>Servicio: Afiliación al Régimen Subsidiado</li>
                <li>Localidad: Caquetá</li>
                <li>UPZ: Florencia</li>
                <li>Grupo Étnico: Ninguno</li>
                <li>Persona víctima del conflicto armado: NO</li>
                <li>Habitantes de calle: SI</li>
                <li>LGBTI: SI</li>
                <li>Persona migrante: NO</li>
                <li>Ruralidad: NO</li>
                <li>Persona con discapacidad: NO</li>
            </ul>
          </li>
          <li>Grupo etario:
            <ul className="list-disc list-inside text-gray-800 mb-4">
                <li>Desde: 10</li>
                <li>Hasta: 20</li>
            </ul>
          </li>
          <li>Fecha de entrega último beneficio
            <ul className="list-disc list-inside text-gray-800 mb-4">
                <li>Desde: 01/01/2024</li>
                <li>Hasta: 12/31/2024</li>
            </ul>
          </li>
        </ul>

        <p className="text-gray-600">
          El listado mostrará ciudadanos que coincidan con todos los filtros seleccionados.
        </p>
      </div>
    </div>
  );
}
