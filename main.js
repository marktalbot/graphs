var horizonalLinePlugin = {
	afterDraw: function(chartInstance) {
		var yScale = chartInstance.scales["y-axis-0"];
		var canvas = chartInstance.chart;
		var ctx = canvas.ctx;
		var index;
		var line;
		var style;

		if (chartInstance.options.horizontalLine) {
			for (index = 0; index < chartInstance.options.horizontalLine.length; index++) {
				line = chartInstance.options.horizontalLine[index];

				if (!line.style) {
					style = "rgba(169,169,169, 1)";
				} else {
					style = line.style;
				}

				if (line.y) {
					yValue = yScale.getPixelForValue(line.y);
				} else {
					yValue = 0;
				}

				ctx.lineWidth = 2;

				if (yValue) {
					ctx.beginPath();
					ctx.moveTo(40, yValue);
					ctx.lineTo(canvas.width, yValue);
					ctx.strokeStyle = style;
					ctx.stroke();
				}

				if (line.text) {
					ctx.fillStyle = style;
					ctx.fillText(line.text, 45, yValue + ctx.lineWidth);
				}
			}
			return;
		};
	}
};
Chart.pluginService.register(horizonalLinePlugin);

let ctx = document.getElementById("team1");
let buyin = [6,10,9,12,14,15,17,22,26,35,39,42,44,44,46];

let data = {
	labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
	yLabels: [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100],
	datasets: [{
		label: 'Team 1',
		data: buyin,
		backgroundColor: [
			'rgba(54, 162, 235, 0.2)'
		],
		borderColor: [
			'rgba(54, 162, 235, 1)'
		],
		borderWidth: 1
	}]
};

let options = {
	scales: {
		yAxes: [{
			ticks: {
				min: 0,
				max: 100,
				fixedStepSize: 10,
				beginAtZero:true
			}
		}]
	},
	horizontalLine: [{
		y: 60,
		style: "rgba(255, 0, 0, .4)",
		text: "Buy-in Goal"
	}]
};

let chart = new Chart(ctx, {
	type: 'line',
	data: data,
	options: options
});


let btnAddMove = document.getElementById('js-add-move');
btnAddMove.addEventListener('click', () => {
	buyin.push(buyin[buyin.length - 1] + 5)
	chart.update();
});

let btnRewind = document.getElementById('js-rewind');
btnRewind.addEventListener('click', () => {
	buyin.pop();
	chart.update();
});

let btnRewindAll = document.getElementById('js-rewind-all');
btnRewindAll.addEventListener('click', () => {
	buyin.pop();
	chart.update();
	
	let intervalId = setInterval(() => {
		if (buyin.length > 0) {
			buyin.pop();
			chart.update();
		} else {
			clearInterval(intervalId);
		};
	}, 1000);
});