var analytics = {
	settings:{
		visible: false,
		chartName: "Compare By Ratings",
	},

	init: function(){
		overlays.loadOverlay("analyticsoverlay");

		rivets.bind($('.js--analytics'),{
			analytics: analytics.settings,
			analyticscontroller: analytics.controller
		});

		analytics.ratingsChart();

		setTimeout(function(){
			$('.js--analytics').addClass('s-visible');	
		}, 1);	
		
	},

	destroy: function(){
		$('.js--analytics').removeClass("s-visible");
		setTimeout(function(){
			$('.js--analytics').remove();
		},500);
	},

	ratingsChart: function(){
		var routeNames = [],
			routeRatings = [],
			temproutes = routes.settings.routeList;

		for(var i = 0; i < temproutes.length; i++){
			routeNames.push(temproutes[i].name);
			routeRatings.push(temproutes[i].votes.average);
		}

		var data = {
			labels: routeNames,
			series: [
				routeRatings
			]
		};

		new Chartist.Bar('.js--routechart', data);
	},

	sendsChart: function(){
		var routeNames = [],
			routeSends = [],
			temproutes = routes.settings.routeList;

		for(var i = 0; i < temproutes.length; i++){
			routeNames.push(temproutes[i].name);
			routeSends.push(temproutes[i].sends.count);
		}

		var data = {
		  labels: routeNames,
		  series: [
		    routeSends
		  ]
		};

		var options = {
			axisY: {
				type: Chartist.AutoScaleAxis,
				onlyInteger: true
			}
		};

		new Chartist.Bar('.js--routechart', data, options);
	},

	

	//FUNCTIONS THAT CAN BE CALLED FROM THE UI
	controller: {
		hide: function(){
			analytics.destroy();
		},
		switchChart: function(e,model){
			var type= e.currentTarget.value;
			
			if(type === "sends"){
				analytics.settings.chartName = "Compare By Sends";
				analytics.sendsChart();
			}else{
				analytics.settings.chartName = "Compare By Ratings";
				analytics.ratingsChart();
			}

		}
	}
} 

