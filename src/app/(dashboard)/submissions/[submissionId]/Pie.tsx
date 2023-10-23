"use client";

import ReactApexChart from "react-apexcharts";

const Pie = ({ series, labels }) => {
  return (
    <ReactApexChart
      options={{
        labels,
        chart: {
          type: "donut",
          height: 200,
        },
        stroke: {
          width: 4,
        },
        legend: {
          show: false,
        },
        plotOptions: {
          pie: {
            startAngle: 30,

            donut: {
              size: "80%",
              labels: {
                total: {
                  show: true,
                  showAlways: false,
                  fontSize: "0.8rem",
                },
                show: true,
                name: {
                  show: true,
                  fontSize: "0.5rem",
                },
                value: {
                  show: true,
                },
              },
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          fillSeriesColor: false,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      }}
      series={series}
      type="donut"
    />
  );
};

export default Pie;
