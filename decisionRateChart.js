
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
            datasets: [
            {
                label: 'Approval', // Name the series
                data: approvalDRChartData,
                backgroundColor: 'transparent',
                borderColor: 'green',
                
            },
            {
                label: 'Decline', // Name the series
                data: declinesDRChartData,
                backgroundColor: 'transparent',
                borderColor: 'red',
                
            }]
        },
        options: {
            layout: {
                padding: 10,
            },
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Response Time'
            },
            scales: {
                yAxes: [{
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
                }]
            }
        }
    });
}