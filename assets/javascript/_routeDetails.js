var routedetails = {
	settings : {
		routeData : {},
		visible: false,
		tempComment: "",
		confirmDelte: false,
		starrating: 0,
	},
	binding: {},

	init : function(doc){
		overlays.loadOverlay("routedetailstemplate");

		rivets.bind($('.js--routedetails'),{
			routedetails: routedetails.settings,
			routedetailscontroller: routedetails.controller
		});
		
		this.settings.routeData = doc;

		setTimeout(function(){
			$('.js--routedetails').addClass('s-visible');	
		}, 1);
		
		
		// var url = doc.name + ".html";
		// var state = {
		// 	type: 'route',
		// 	data: doc._id,
		// }
		// history.pushState(state,null,url);
	},
 
	destroy: function(){
		$('.js--routedetails').removeClass('s-visible');
		setTimeout(function(){
			$('.js--routedetails').remove();	
		}, 500);
		
		this.settings.routeData = {};
		this.settings.confirmDelte = false;

		//app.rootURL();
		
	},

	calculateAverages:function(ratings){
		var sum = 0;
		for(var i = 0; i < ratings.length; i++){
			sum += parseInt(ratings[i].rating);
		}
		return sum/ratings.length;
	},

	updateData: function(model){
		app.db.get(model.routedetails.routeData._id).then(function(doc){
			model.routedetails.routeData = doc;
		});
	},

	pushData: function(id, data){
		app.db.get(id)
		.then(function(doc){
			var tempdoc = routedetails.settings.routeData;
			//UPDATE THE REVISION NUMBER
			tempdoc._rev = doc._rev;

			return app.db.put(tempdoc)
			  .then(function(response){
			  	console.log(response);
			  })
			  .catch(function(err){
			  	console.log(err);
			  });
		})
		.catch(function(err){
			console.log(err);
		});
	},

	setVote:function(rating){
		var rating = {
			user: user.settings.data._id,
			rating: rating
		}
		console.log(rating);

		routedetails.settings.routeData.votes.ratings.push(rating);
		routedetails.settings.routeData.votes.count = routedetails.settings.routeData.votes.ratings.length;
		routedetails.settings.routeData.votes.average = routedetails.calculateAverages(routedetails.settings.routeData.votes.ratings);

		routedetails.pushData(routedetails.settings.routeData._id, routedetails.settings.routeData);
	},

	controller : {
		like: function(e, model){
			app.db.get(model.routedetails.routeData._id).then(function(doc) {
			  doc.likes ++;

			  return app.db.put(doc).then(function(response){
			  	routedetails.updateData(model);
			  })
			  .catch(function(err){
			  	console.log(err);
			  });
			});
		},

		sent: function(e, model){
			app.db.get(model.routedetails.routeData._id).then(function(doc) {
			    doc.sends.count ++;
			    doc.sends.users.push(user.settings.data._id);

			    var send = {
			    	user: user.settings.data._id,
			    	date: new Date().toJSON()
			    }

			    doc.sends.sends.push(send);
			    
			    return app.db.put(doc)
				  .then(function(response){
				  	routedetails.updateData(model);
				  	user.tickSend(doc._id);
				  })
				  .catch(function(err){
					console.log(err);
				  });
			});

		},

		postComment: function(e, model){
			var comment = {
				user: user.settings.data._id,
				message: routedetails.settings.tempComment,
				time: new Date().toJSON()
			}

			routedetails.settings.tempComment = "";

			model.routedetails.routeData.comments.push(comment);

			routedetails.pushData(model.routedetails.routeData._id, model.routedetails.routeData);
			
		},

		delete: function(e, model){
			routedetails.settings.confirmDelte = true;
		},

		cancelConfirm: function(e,model){
			routedetails.settings.confirmDelte = false;
		},

		confirmDelete: function(e,model){
			app.deleteRoute(routedetails.settings.routeData._id,routedetails.settings.routeData.name + " was deleted");
			routes.hideRoute(routedetails.settings.routeData._id);
			routedetails.destroy();
		},

		hide: function(e,model){
			routedetails.destroy();
		},

		

		
	}
}

rivets.binders.routecolour = function(el,value){
	if(typeof value == 'undefined')return false;
	$(el).addClass('colour--' + value);
};

rivets.formatters.userMatch = function(value){
	if(typeof value == 'undefined' || value.indexOf(user.settings.data._id) === -1) return false;
	else return true;
};

rivets.formatters.cleanDate = function(value){
	if(typeof value == 'undefined') return '';
	else return moment(new Date(value)).fromNow();
}

rivets.formatters.roundTwoDecimals = function(value){
	return +(Math.round(value + "e+2")  + "e-2");
}

