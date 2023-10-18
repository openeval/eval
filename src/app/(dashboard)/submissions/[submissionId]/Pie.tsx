"use client";

import ReactApexChart from "react-apexcharts";

const Pie = ({ series, labels }) => {
  return (
    <ReactApexChart
      options={{
        // labels: [
        //   "Code Quality",
        //   "Functionality and Purpose",
        //   "Testing",
        //   "Documentation",
        //   "Consistency and Style",
        //   "Dependencies and Compatibility",
        //   "Security and Performance",
        // ],
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
      // series={[12, 0, 0, 0, 6.666666666666667, 0, 0]}
      series={series}
      type="donut"
    />
  );
};

export default Pie;
