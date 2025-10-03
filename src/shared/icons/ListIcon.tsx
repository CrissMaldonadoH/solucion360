

export default function ListIcon({size, fill}:{size:number, fill?:string}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} x="0" y="0" viewBox="0 0 60.123 60.123" ><g><path d="M57.124 51.893H16.92a3 3 0 1 1 0-6h40.203a3 3 0 0 1 .001 6zM57.124 33.062H16.92a3 3 0 1 1 0-6h40.203a3 3 0 0 1 .001 6zM57.124 14.231H16.92a3 3 0 1 1 0-6h40.203a3 3 0 0 1 .001 6z" fill={fill ? fill : '#000'} opacity="1"></path><circle cx="4.029" cy="11.463" r="4.029" fill={fill ? fill : '#000'} opacity="1"></circle><circle cx="4.029" cy="30.062" r="4.029" fill={fill ? fill : '#000'} opacity="1"></circle><circle cx="4.029" cy="48.661" r="4.029" fill={fill ? fill : '#000'} opacity="1"></circle></g></svg>
  )
}
