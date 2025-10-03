import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts';
import CustomTooltip from './CustomTooltip';

import React from 'react'

export default function PieCharts({data}:{data:{ name: string, value: number }[]}) {
  const colors = [ '#E43F82', '#84BEE7', '#E38CA9']

    return (
        <>
            {
                data !== undefined &&
                    data.length !== 0 &&
                    <div style={{ width: '100%', height: 200}}>
        
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={data}
                                    dataKey='value'
                                    nameKey="name"
                                    innerRadius={40}
                                    outerRadius={80}
                                    fill='#82ca9d'
                                >
                                    { data.map((entry, i) => (
                                        <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend  width={100} align='right' verticalAlign='middle' layout='vertical' />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
            }
        </>
  )
}
