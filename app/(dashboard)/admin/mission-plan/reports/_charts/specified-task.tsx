"use client"
import { useState } from "react";
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const SpecifiedTaskChart = () => {
    const [chartData, setChartData] = useState({
        series: [20, 35, 40, 5],
        options: {
            chart: {
                width: '100%',
                height: '100%',
                // type: 'pie',
            },
            labels: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
            ],
            // theme: {
            //     monochrome: {
            //         enabled: true,
            //     },
            // },
            plotOptions: {
                pie: {
                    dataLabels: {
                        offset: -50,
                    },
                },
            },
            // grid: {
            //     padding: {
            //         top: 0,
            //         bottom: 0,
            //         left: 0,
            //         right: 0,
            //     },
            // },
            // dataLabels: {
            //     formatter(val: any, opts: any) {
            //         const name = opts.w.globals.labels[opts.seriesIndex]
            //         return [name, val.toFixed(1) + '%']
            //     },
            // },
            legend: {
                show: false,
            },
            fill: {
                colors: ["#22c55e", "#eab308", "#ef4444", "#835101cc"]
              },
        },
    })
    return (
        <div>
            <ReactApexChart 
                options={chartData.options} 
                series={chartData.series} 
                type="pie" 
                width="500" height="auto"
            />
        </div>
    );
}

export default SpecifiedTaskChart;
