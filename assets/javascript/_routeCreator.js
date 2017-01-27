var routeCreator = {
	settings:{
		visible: false,
		saving: false,
		route : {
			name: {
				value: ""
			},
			grade: 5,
			description: "",
			colour: {
				value: ""
			},
			type: "",
			topo: "",
		},
		error: {
			haserror: false,
			message: ""
		}, 
		types: [
			{
				type: "boulder",
				name: "Boulder"
			},
			{
				type: "toprope",
				name: "Top Rope"
			},
			{
				type: "lead",
				name: "Lead Climb"
			},
		],
		topologies: [
			{
				topo: 'overhang',
				name: 'Overhanging'
			},
			{
				topo: 'vertical',
				name: 'Vertical'
			},
			{
				topo: 'slab',
				name: 'Slabby'
			},
			{
				topo: 'roof',
				name: 'Roof'
			},
		],
		holdcolours:[
			{
				name: "Red",
			},
			{
				name: "Green",
			},
			{
				name: "Blue",
			},
			{
				name: "Orange",
			},
			{
				name: "Yellow",
			},
			{
				name: "Purple",
			},
			{
				name: "Black",
			},
		],
	},

	init:function(){
		overlays.loadOverlay("routecreatortemplate");

		rivets.bind($('.js--routeCreator'),{
			routeCreator: routeCreator.settings,
			routeController: routeCreator.controller
		});

		setTimeout(function(){
			$('.js--routeCreator').addClass('s-visible');	
		}, 1);

	},

	destroy: function(){
		$('.js--routeCreator').removeClass("s-visible");
		setTimeout(function(){
			$('.js--routeCreator').remove();
		},500);
		this.settings.saving = false;
		this.settings.route = {
			name: {
				value: ""
			},
			grade: 5,
			description: "",
			colour: {
				value: ""
			},
			type: "",
			topo: "",
		};
	},

	controller : {
		createRoute: function(e,model){
			model.routeCreator.saving = true;

			var doc = new Route({
				name: model.routeCreator.route.name.value, 
				grade: model.routeCreator.route.grade, 
				description: model.routeCreator.route.description, 
				colour: model.routeCreator.route.colour.value, 
				type: model.routeCreator.route.type, 
				topo: model.routeCreator.route.topo
			});
			
			app.db.put(doc)
			.then(function(){
				routeCreator.destroy();
				app.confirmSuccessToast(model.routeCreator.route.name.value + ' created successfully');
			})
			.catch(function(err){
				model.routeCreator.saving = false;
				model.routeCreator.error.haserror = true;
				model.routeCreator.error.message = err.message;
				console.log(err);
			});
		},

		errorClear: function(e,model){
			model.routeCreator.error.haserror = false;
		},

		cancelCreate: function(e,model){
			routeCreator.destroy();
		},

		setType: function(e,model){
			model.routeCreator.route.type = e.currentTarget.value;
		},

		setTopo: function(e,model){
			model.routeCreator.route.topo = e.currentTarget.value;
		}
	},
	
};





