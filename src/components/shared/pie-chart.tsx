"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useTheme } from "next-themes";
import { useRef } from "react";

type PieDataItem = {
  label: string;
  value: number;
};

type PieChartProps = {
  data: PieDataItem[];
  title?: string;
  description?: string;
  caption?: string;
  height?: number;
};

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#f97316",
  "#ef4444",
  "#06b6d4",
  "#84cc16",
];

export function PieChart({
  data,
  title = "",
  description = "",
  caption,
  height = 380,
}: PieChartProps) {
  const chartRef = useRef<HighchartsReact.RefObject>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const labelColor = isDark ? "#d1d5db" : "#374151";
  const connectorColor = isDark ? "#6b7280" : "#9ca3af";

  const options: Highcharts.Options = {
    chart: {
      type: "pie",
      height,
      style: { fontFamily: "inherit" },
      backgroundColor: "transparent",
      animation: { duration: 600 },
    },
    title: {
      text: title || caption || "",
      style: { fontSize: "14px", fontWeight: "600", color: labelColor },
    },
    subtitle: {
      text: description,
      style: { fontSize: "12px", color: connectorColor },
    },
    tooltip: {
      pointFormat: "<b>{point.percentage:.1f}%</b> ({point.y})",
      style: { fontSize: "12px" },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        colors: COLORS,
        borderWidth: 2,
        borderColor: "transparent",
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f}%",
          distance: 16,
          style: {
            fontSize: "12px",
            fontWeight: "normal",
            color: labelColor,
            textOutline: "none",
          },
          connectorWidth: 1,
          connectorColor,
        },
        showInLegend: true,
      },
    },
    legend: {
      enabled: true,
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
      itemStyle: { fontSize: "12px", fontWeight: "normal", color: labelColor },
      symbolRadius: 4,
    },
    series: [
      {
        type: "pie",
        name: "Jumlah",
        data: data.map((d, i) => ({
          name: d.label,
          y: d.value,
          color: COLORS[i % COLORS.length],
        })),
      },
    ],
    credits: { enabled: false },
    accessibility: { enabled: false },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />;
}
