import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts"

export default function LinesChart({ lines, data }:{ lines:string[], data:{ [x: string]: string | number | null;  MONTH: string; }[] }) {

//console.log(lines, data)

    const colors = [ '#E43F82', '#84BEE7', '#E38CA9']

    

  return (
    lines !== undefined &&
       lines.length !== 0 &&
        <div style={{ width: '100%', height: 200}}>
            <ResponsiveContainer>
                <LineChart width={730} height={250} data={ data }
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="MONTH" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                        {
                            lines.map((line, i)=>(
                                <Line key={i} type="monotone" dataKey={line} stroke={colors[i]} />

                            ))
                        }    
                        
                </LineChart>
            </ResponsiveContainer>
        </div>
  )
}
