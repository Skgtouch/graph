let avgRespChartData = [];
let maxRespChartData = [];
let timeInterval = [];
function intiateChartRender(intervalInDay) {
    avgRespChartData = [];
    maxRespChartData = [];
    timeInterval = [];
    chartData[intervalInDay].response.forEach(res => {
        avgRespChartData.push(res.avgResp);
        maxRespChartData.push(res.maxResp);
        timeInterval.push(res._id)
    });
    renderResponseChart(intervalInDay);
}

function renderResponseChart(intervalInDay) {
    const ctx = document.getElementById(`responseTimeChart${intervalInDay}`).getContext('2d');

    const myRTChart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line', // also try bar or other graph types

        // The data for our dataset
        data: {
            labels: timeInterval,
            // Information about the dataset
            datasets: [{
                label: "Average Response Time",
                backgroundColor: 'transparent',
                borderColor: 'green',
                data: avgRespChartData
            }, {
                label: "Max Repsonse Time",
                backgroundColor: 'transparent',
                borderColor: 'red',
                data: maxRespChartData
            }]
        },

        // Configuration options
        options: {
            layout: {
                padding: 10,
            },
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Decision Rate'
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'decision rate'
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: false,
                        labelString: 'time'
                    },
                    // type: 'time',
                    // time: {
                    //   format: "HH:mm",
                    //   unit: 'hour',
                    //   unitStepSize: 1,
                    //   displayFormats: {
                    //     'minute': 'HH:mm', 
                    //     'hour': 'HH:mm', 
                    //     min: '00:00',
                    //     max: '23:59'
                    //   },
                    // }
                }]
            }
        }
    });
}

