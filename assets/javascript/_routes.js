var routes = {
	settings :{
		routeList: [],
		sortOrder: "nameascending", 
		loading: true,
		searching: false,
		searchResults: []
	},

	init: function(){
		routes.settings.loading = true;
		var s = this.settings;
		var c = this.controller;
		var self = this;
		
		routes.sort();
		
		//START OBSERVING CHANGES TO DATABASE
		var changes = app.db.changes({
		  since: 'now',
		  live: true,
		}).on('change', function(change) {
		  routes.sort();
		}).on('complete', function(info) {
		  console.log('changes complete');
		}).on('error', function (err) {
		  console.log(err);
		});
	},

	sort: function(){
		var field = "",
			direction = ""
			selector = {},
			sort = [],
			sortobject = {};

		switch(routes.settings.sortOrder){
			case 'gradeascending':
				field = 'grade'
				direction = 'asc';
				break;
			case 'gradedescending':
				field = 'grade'
				direction = 'desc';
				break;
			case 'nameascending':
				field = 'name'
				direction = 'asc';
				break;
			case 'namedescending':
				field = 'name'
				direction = 'desc';
				break;
			case 'datedescending':
				field = 'date'
				direction = 'desc';
				break;
			case 'dateascending':
				field = 'date'
				direction = 'asc';
				break;
			case 'ratingdescending':
				field = 'votes.average'
				direction = 'desc';
				break;
			case 'ratingascending':
				field = 'votes.average'
				direction = 'asc';
				break;
		}

		selector[field] = {$gt: null};
		sortobject[field] = direction;
		sort.push(sortobject);

		routes.settings.loading = true;
		
		app.db.find({
		    selector,
		    sort
		}).then(function(result){
			routes.settings.routeList = '';
			routes.settings.routeList = result.docs;
			routes.settings.loading = false;
		}).catch(function(err){
			console.log(err);
		});
	},

	hideRoute: function(id){
		for(var i = 0; i < routes.settings.routeList.length; i++){
			if(routes.settings.routeList[i]._id === id) routes.settings.routeList.splice(i, 1);
		}
	},

	controller:{
		loadDetails: function(e,model){
			app.db.get(model.route._id).then(function(doc) {
				routedetails.init(doc);
			});
		},

		deleteRoute: function(e,model){
			app.db.get(model.route._id).then(function(doc) {
			  return model.routes.db.remove(doc);
			}).catch(function (err) {
			  console.log(err);
			});
		},

		filterRoutes:function(e,model){
			var options = {
			  threshold: 0.0, //require perfect match
			  keys: [
			    "name"
				]
			};
			var fuse = new Fuse(routes.settings.routeList, options); // "list" is the item array
			routes.settings.searchResults = "";
			routes.settings.searchResults = fuse.search(e.currentTarget.value);
			
			if(e.currentTarget.value.length > 0) routes.settings.searching = true;
			else routes.settings.searching = false;
		},

		setSortOrder: function(e,model){
			routes.settings.sortOrder = e.currentTarget.value;
			routes.sort();
		},
	}
}

rivets.binders.routeclasses = function(el, value){
	$(el).addClass('colour--'+value);
}

rivets.bind($('.js--routes'),{
	routes: routes.settings,
	routesController: routes.controller
});