
export default function VistaGeolocalizacionCiudadano({latitud, longitud}:{latitud:number, longitud:number}) {
  return (
    <div>
       <iframe src={ `https://maps.google.com/maps?q=${ latitud },${ longitud }&z=15&output=embed` } width="100%" className="h-[400px] rounded-xl"></iframe>
    </div>
  )
}
