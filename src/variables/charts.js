/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
const dashboard24HoursPerformanceChart = {
  data: (canvas) => {
    return {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
      datasets: [
        {
          borderColor: "#6bd098",
          backgroundColor: "#6bd098",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354],
        },
        {
          borderColor: "#f17e5d",
          backgroundColor: "#f17e5d",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420],
        },
        {
          borderColor: "#fcc468",
          backgroundColor: "#fcc468",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484],
        },
      ],
    };
  },
  options: {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      y: {
        ticks: {
          color: "#9f9f9f",
          beginAtZero: false,
          maxTicksLimit: 5,
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
      x: {
        barPercentage: 1.6,
        grid: {
          drawBorder: false,
          display: false,
        },
        ticks: {
          padding: 20,
          color: "#9f9f9f",
        },
      },
    },
  },
};

const dashboardEmailStatisticsChart = {
  data: (canvas) => {
    return {
      labels: [1, 2, 3],
      datasets: [
        {
          label: "Emails",
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157"],
          borderWidth: 0,
          data: [342, 480, 530, 120],
        },
      ],
    };
  },
  options: {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    maintainAspectRatio: false,
    pieceLabel: {
      render: "percentage",
      fontColor: ["white"],
      precision: 2,
    },
    scales: {
      y: {
        ticks: {
          display: false,
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
      x: {
        barPercentage: 1.6,
        grid: {
          drawBorder: false,
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  },
};

const dashboardNASDAQChart = {
  data: (canvas) => {
    return {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
          fill: false,
          borderColor: "#6bd098",
          backgroundColor: "transparent",
          pointBorderColor: "#6bd098",
          pointRadius: 4,
          pointHoverRadius: 4,
          pointBorderWidth: 8,
          tension: 0.4,
        },
        {
          data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
          fill: false,
          borderColor: "#3C53F4",
          backgroundColor: "transparent",
          pointBorderColor: "#3C53F4",
          pointRadius: 4,
          pointHoverRadius: 4,
          pointBorderWidth: 8,
          tension: 0.4,
        },
      ],
    };
  },
  options: {
    plugins: {
      legend: { display: false },
    },
  },
};

function formatNumber(value) {
  if (value >= 1e9) {
      return (value / 1e9).toFixed(2);
  } else if (value >= 1e6) {
      return (value / 1e6).toFixed(2);
  } else if (value >= 1e3) {
      return (value / 1e3).toFixed(2);
  } else {
      return value.toString();
  }
}

function getGradientColor(ctx, value) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 150);
  const endColor = value >= 0 ? '#6bd098' : '#f17e5d';  // modern green for positive, modern red for negative
  gradient.addColorStop(0, '#FFFFFF');
  gradient.addColorStop(1, endColor);
  return gradient;
}

function prepareChartData(ratio) {
    let dates = [];
    let values = [];
    try {
      if (ratio['Duration'] !== undefined && ratio['Value'] !== undefined) {
        dates = Object.values(ratio['Duration']).slice(0, 10).reverse().map(dateStr => dateStr.split('-')[0]);
        values = Object.values(ratio['Value']).slice(0, 10).reverse();
      }
    } catch (error) {
      console.error('Error preparing chart data:', error);
    }

    
    return {
      data: (canvas) => {
        if (!canvas) {
          return;
        }
        const ctx = canvas.getContext("2d");
      
        const backgroundColors = values.map(value => getGradientColor(ctx, value));
        const borderColors = values.map(value => value >= 0 ? '#6bd098' : '#f17e5d');
      
        return {
          labels: dates,
          datasets: [{
            data: values,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            fill: true,
            pointBorderColor: '#364dee',
            pointRadius: 0.5,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
            tension: 0.4,
          }]
        };
      },
      options: {
        scales: {
          x: {  // x-axis configurations
            grid: {
              display: false  // Hide grid lines for x-axis
            },
            ticks: {
              color: 'white',
            }
          },
          y: {
            grid: {
              display: true  // Hide grid lines for x-axis
            },
            ticks: {
              callback: function(value, index, values) {
                if (value >= 1000000000) {
                  return (value / 1000000000) + 'B';  // convert to billions
                } else
                if (value >= 1000000 && value < 1000000000) {
                  return (value / 1000000) + 'M';  // convert to millions
                } else {
                  return value;
                }
              },
              color: 'white',
            }
          }
        },
        plugins: {
          legend: { display: false },
        },
      }
    };
}

// function getUnit(maxValue) {
//   if (maxValue >= 1e9) {
//     return 'Billions';
//   } else if (maxValue >= 1e6) {
//     return 'Millions';
//   } else if (maxValue >= 1e3) {
//     return 'Thousands';
//   } else {
//     return '';
//   }
// }

// function prepareChartData(ratio) {
//   const dates = Object.keys(ratio);
//   const values = Object.values(ratio);
//   const maxValue = Math.max(...values);
//   const unit = getUnit(maxValue);
//   const unitMultiplier = unit === 'Billions' ? 1e9 : unit === 'Millions' ? 1e6 : unit === 'Thousands' ? 1e3 : 1;

//   // Normalize values based on unit
//   const normalizedValues = values.map(value => value / unitMultiplier);

//   console.log("normalizedValues", normalizedValues);

//   // Assuming you have an array of colors to differentiate each line on the chart
//   const colors = ["#6bd098", "#3C53F4", "#f17e5d", "#fcc468", "#68d4fc", "#fcc468"];

//   return {
//     labels: dates,
//     datasets: [
//       {
//         data: normalizedValues,
//         fill: false,
//         borderColor: colors[0],  // Use the first color as there's no index provided
//         backgroundColor: "transparent",
//         pointBorderColor: colors[0],  // Use the first color as there's no index provided
//         pointRadius: 4,
//         pointHoverRadius: 4,
//         pointBorderWidth: 8,
//         tension: 0.4,
//       }
//     ],
//     options: {
//       plugins: {
//         legend: { display: false },
//       }
//     },
//   };
// }


module.exports = {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
  prepareChartData
};
