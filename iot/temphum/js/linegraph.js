$(document).ready(function(){
	$.ajax({
		url : "http://52.4.22.143/iot/jsondata.php?r=temp",
		type : "GET",
		success : function(data){
		
			console.log(data);
			
			parsedData = JSON.parse(data);

			var dt = [];
			var tempdata = [];
			

			for(var i in parsedData) {
				dt.push(parsedData[i].dataupdate);
				tempdata.push(parsedData[i].temp);
				
				
			}
			
			var chartdata = {
				labels: dt,
				datasets: [
					{
						label: "Temperature in degrees",
						fill: false,
						lineTension: 0.1,
						backgroundColor: "rgba(59, 89, 152, 0.75)",
						borderColor: "rgba(59, 89, 152, 1)",
						pointHoverBackgroundColor: "rgba(59, 89, 152, 1)",
						pointHoverBorderColor: "rgba(59, 89, 152, 1)",
						data: tempdata
					},
					
				]
			};

			var ctx = $("#mycanvas");

			var LineGraph = new Chart(ctx, {
			    type: 'bar',
			    data: chartdata,
			    options: {
			        title: {
			            display: true,
			            fontSize:20,
			            text: 'Temperature Graph'
			        }
			    }
			});
		},
		error : function(data) {

		}
	});
	$.ajax({
		url : "http://52.4.22.143/iot/jsondata.php?r=hum",
		type : "GET",
		success : function(data){
		
			console.log(data);
			
			parsedData = JSON.parse(data);

			var dt = [];
			var datahum = [];
			

			for(var i in parsedData) {
				dt.push(parsedData[i].dataupdate);
				datahum.push(parsedData[i].hum);
				
				
			}

			var chartdata = {
				labels: dt,

				datasets: [
					{
						label: "Humidity in percentage",
						fill: false,
						lineTension: 0.1,
						backgroundColor: "rgba(211, 72, 54, 0.75)",
						borderColor: "rgba(211, 72, 54, 1)",
						pointHoverBackgroundColor: "rgba(211, 72, 54, 1)",
						pointHoverBorderColor: "rgba(211, 72, 54, 1)",
						data: datahum
					},
					
				]
			};

			var ctx = $("#mycanvas1");

			/*var LineGraph = new Chart(ctx, {
				type: 'line',
				data: chartdata
				 options: {
        				title: {
            			display: true,
            			text: 'Custom Chart Title'
        					}
    					}
			});*/
			var LineGraph = new Chart(ctx, {
			    type: 'bar',
			    data: chartdata,
			    options: {
			        title: {
			            display: true,
			            fontSize:20,
			            text: 'Humidity Graph'
			        }
			    }
			});
		},
		error : function(data) {

		}
	});
});