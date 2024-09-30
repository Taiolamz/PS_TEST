"use client"

import { CardContainer, Legend, ReusableLabel } from "@/components/fragment";
import dynamic from "next/dynamic";
import { useState } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

export default function OrganizationTargetChart() {
    const [chartData, setChartData] = useState({
        series: [{
            data: [44, 55, 41, 64, 22, 43]
        }, {
            data: [53, 32, 33, 52, 13, 44]
        }],
        options: {
            chart: {
                toolbar: {
                    show: false
                },
            },
            legend: {
                show: false,
            },
            colors: ['#008080', '#7E10E5'],
            plotOptions: {
                bar: {
                    horizontal: false,
                    dataLabels: {
                        position: 'top',
                    },
                    columnWidth: "25%",
                    borderRadius: 10,
                    borderRadiusApplication: 'end'
                    
                }
            },
            dataLabels: {
                enabled: true,
                offsetY: 6,
                style: {
                    fontSize: '12px',
                    colors: ['#fff']
                }
            },
            stroke: {
                show: true,
                width: 1,
                colors: ['#fff']
            },
            tooltip: {
                shared: true,
                intersect: false
            },
            xaxis: {
                categories: ['Measure 1 Title', 'Measure 2 Title', 'Measure 3 Title', 'Measure Title', 'Measure Title', 'Measure Title'],
            },
            
        },


    }
    )

    return (
        <CardContainer className="">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h1 className='text-gray-800'>Organization Target Chart</h1>
                    <div className="flex gap-3 mt-4">
                        <Legend barHeight={6} barWidth={6} title="Target" color="purple" titleClass="text-xs" titleColor="text-gray-400" />
                        <Legend barHeight={6} barWidth={6} title="Archieved" color="green" titleClass="text-xs" titleColor="text-gray-400" />
                    </div>
                </div>
                <ReusableLabel title="Total Achievement Avg" value="67%" valueClass="text-green-600 text-lg" />
            </div>
            <div id="chart">
                <ReactApexChart options={chartData.options as any} series={chartData.series} type="bar" height={360} />
            </div>
        </CardContainer>
    )
}
