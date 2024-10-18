"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Dictionary } from "@/@types/dictionary";
import { toWholeNumber } from "@/utils/helpers";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const SpecifiedTaskChart = ({ width, data }: { width?: string, data?: Dictionary[] }) => {
  const [chartData, setChartData] = useState({
    series: [20, 24, 10, 4],
    options: {
      chart: {
        width: "100%",
        height: "100%",
        // type: 'pie',
      },
      labels: ['In Progress', 'Completed', 'Not Started', 'Overdue'],
      // theme: {
      //     monochrome: {
      //         enabled: true,
      //     },
      // },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -10,
            style: {
              fontSize: "16px",
              fontFamily: "Lexend",
              fontWeight: "normal",
              colors: ["#ffffff"],
              textOutline: "2px solid #000000",
            },
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
        colors: data?.map((item: Dictionary) => item?.color),
      },
    },
  });

  useEffect(() => {
    if (data) {
      setChartData((prevData) => {
        return {
          ...prevData,
          series: data?.map((item: Dictionary) => toWholeNumber(item?.percentage)),
          options: {
            ...prevData.options,
            labels: data?.map((item: Dictionary) => item?.status),
            fill: {
              ...prevData.options.fill,
              colors: data?.map((item: Dictionary) => item?.color),
            }

          }
        }
      })
    }
  }, [data])


  return (
    <div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        width={width || "500"}
        height="auto"
      />
    </div>
  );
};

export default SpecifiedTaskChart;
