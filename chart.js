var ctx = document.getElementById('myChart').getContext('2d');

const config = {
    type: 'line',
    data: [],
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart'
        }
      }
    },
  };
var chart = new Chart(ctx, {
	// The type of chart we want to create
	type: 'line', // also try bar or other graph types

	// The data for our dataset
	data: {
		labels: ["Jun 2016", "Jul 2016", "Aug 2016", "Sep 2016", "Oct 2016", "Nov 2016", "Dec 2016", "Jan 2017", "Feb 2017", "Mar 2017", "Apr 2017", "May 2017"],
		// Information about the dataset
    datasets: [{
			label: "Line 1",
			backgroundColor: 'transparent',
			borderColor: 'green',
			data: [26.4, 39.8, 66.8, 66.4, 40.6, 55.2, 77.4, 69.8, 57.8, 76, 110.8, 142.6],
		},{
			label: "Line 2",
			backgroundColor: 'transparent',
			borderColor: 'red',
			data: [29.4, 42.8, 69.8, 69.4, 43.6, 58.2, 80.4, 72.8, 60.8, 79, 113.8, 145.6],
		}]
	},

	// Configuration options
	options: {
    layout: {
      padding: 10,
    },
		legend: {
			position: 'bottom',
		},
		title: {
			display: true,
			text: 'Precipitation in Toronto'
		},
		scales: {
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'decision rate'
                },
                ticks: {
                    beginAtZero:true
                }
			}],
			xAxes: [{
				scaleLabel: {
					display: false,
					labelString: 'time'
				}
			}]
		}
	}
});
