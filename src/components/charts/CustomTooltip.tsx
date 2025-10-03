import React from 'react'

export default function CustomTooltip({ active, payload }:{ active?:boolean, payload?:{name:string, value:number}[] }) {
  if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white border border-slate-500 p-5">
          <p className="label">{`${payload[0].name} : $ ${payload[0].value.toLocaleString("en")}`}</p>
          
        </div>
      );
    }
  
    return null;
}
