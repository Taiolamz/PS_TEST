"use client";

import { Dictionary } from "@/@types/dictionary";
import { CardContainer, Legend, ReusableLabel } from "@/components/fragment";
import BarChartSkeleton from "@/components/loader/barchart";
import { getPercentageColor } from "@/utils/helpers";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface OrganizationTargetChartProps {
  totalAchieveValue?: string;
  data?: Dictionary,
  loading?: boolean
}

export default function OrganizationTargetChart({
  data,
  totalAchieveValue,
  loading
}: OrganizationTargetChartProps) {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      colors: ["#008080", "#7E10E5"],
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: "top",
          },
          columnWidth: "25%",
          borderRadius: 10,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: {
        enabled: true,
        offsetY: 6,
        style: {
          fontSize: "12px",
          colors: ["#fff"],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: [],
      },
    },
  });

  const TOTAL_AVG = data?.total_achievement_average?.split("%")?.[0] ?? 0

  const TARGET = data?.chart?.map((item: Dictionary) => item.target) ?? []
  const ARCHIEVED = data?.chart?.map((item: Dictionary) => item.achieved) ?? []
  const MOS_TITLE = data?.chart?.map((item: Dictionary) => item.measure_of_success?.measure) ?? []

  const GRAPH = [
    {
      data: ARCHIEVED,
    },
    {
      data: TARGET,
    },
  ]

  console.log(data)

  useEffect(() => {
    if (data) {
      setChartData((prevState: any) => {
        return {
          ...prevState,
          series: GRAPH,
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: MOS_TITLE,
            }
          }
        }
      })
    }
  }, [data])

  return (
    <CardContainer className="">
      {
        loading ? (
          <BarChartSkeleton />
        ) :
          <>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <h1 className="text-gray-800">Organization Target Chart</h1>
                <div className="flex gap-3 mt-4">
                  <Legend
                    barHeight={6}
                    barWidth={6}
                    title="Target"
                    color="purple"
                    titleClass="text-xs"
                    titleColor="text-gray-400"
                  />
                  <Legend
                    barHeight={6}
                    barWidth={6}
                    title="Archieved"
                    color="green"
                    titleClass="text-xs"
                    titleColor="text-gray-400"
                  />
                </div>
              </div>
              <ReusableLabel
                title="Total Achievement Avg"
                value={`${TOTAL_AVG}%`}
                valueClass="text-lg"
                style={{
                  color: getPercentageColor(TOTAL_AVG),
                }}
              />
            </div>
            <div id="chart">

              <ReactApexChart
                options={chartData.options as any}
                series={chartData.series}
                type="bar"
                height={360}
              />
            </div>
          </>
      }
    </CardContainer>
  );
}
