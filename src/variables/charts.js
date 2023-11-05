const { formatNumber } = require('../utils/numberUtils');  // Adjust the path as needed

function getGradientColor(ctx, value) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 150);
  const endColor = value >= 0 ? '#6bd098' : '#f17e5d';  // modern green for positive, modern red for negative
  gradient.addColorStop(0, '#E1E1E1');
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
              color: 'black',
            }
          },
          y: {
            grid: {
              display: true  // Hide grid lines for x-axis
            },
            ticks: {
              callback: function(value, index, values) {
                return formatNumber(value);
              },
              color: 'black',
            }
          }
        },
        plugins: {
          legend: { display: false },
        },
      }
    };
}

module.exports = {
  prepareChartData
};
