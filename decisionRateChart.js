
let totalDRChartData = [];
let approvalDRChartData = [];
let declinesDRChartData = [];
let DRTimeInterval = [];

function getDRChartData(intervalInDay) {
    // debugger
    totalDRChartData = [];
    approvalDRChartData = [];
    declinesDRChartData = [];
    DRTimeInterval = [];
    chartData[intervalInDay].response.forEach(res => {
        totalDRChartData.push(res.total);
        approvalDRChartData.push(res.approves);
        declinesDRChartData.push(res.declines);
        DRTimeInterval.push(res._id)
    });
    renderDecisionRateChart(intervalInDay);

}
function renderDecisionRateChart(intervalInDay) {
    const canvas = document.getElementById(`decisionRateChart${intervalInDay}`);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const myDRChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: DRTimeInterval,
            datasets: [{
                label: 'Total', // Name the series
                data: totalDRChartData,
                fill: true,
                borderColor: '#2196f3', // Add custom color border (Line)
                backgroundColor: 'green', // Add custom color background (Points and Fill)
                borderWidth: 1 // Specify bar border width
            },
            {
                label: 'Approval', // Name the series
                data: approvalDRChartData,
                fill: true,
                borderColor: '#4CAF50', // Add custom color border (Line)
                backgroundColor: 'yellow', // Add custom color background (Points and Fill)
                borderWidth: 1 // Specify bar border width
            },
            {
                label: 'Decline', // Name the series
                data: declinesDRChartData,
                fill: true,
                borderColor: '#4CAF50', // Add custom color border (Line)
                backgroundColor: 'red', // Add custom color background (Points and Fill)
                borderWidth: 1 // Specify bar border width
            }]
        },
        options: {
            // responsive: true, // Instruct chart js to respond nicely.
            // maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
            scales: {
                yAxes: [{
                    stacked: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'response time'
                    },
                    ticks: {
                        // beginAtZero:true,
                        min: 0,
                        max: 100,
                        callback: function (value) {
                            return value + "%"
                        }
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