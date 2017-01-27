var user = {

	settings : {
		data: {},
		sendlist: [],
		details: false,
		newPassword: "",
		passwordChanged: false,
		passwordError: {
			hasError: false,
			message: ""
		},
	},

	init:function(userdata){
		this.settings.data = userdata;
		this.fetchSends();
	},

	show:function(){
		overlays.loadOverlay("useroverlay");

		rivets.bind($('.js--activeuser'),{
			user: user.settings,
			usercontroller: user.controller
		});

		this.fetchSends();

		setTimeout(function(){
			$('.js--activeuser').addClass('s-visible');	
		}, 1);
	},

	destroy: function(){
		$('.js--activeuser').removeClass("s-visible");
		setTimeout(function(){
			$('.js--activeuser').remove();
		},500);
	},

	setUser: function(username){
		app.db.getUser(username)
			.then(function(response){
				app.loggedin.username = username;
				app.loggedin.isloggedin = true;
				signin.settings.visible = false;
				user.init(response);
			})
			.catch(function(err){
				console.log(err);
			})

	}, 

	fetchSends: function(){
		 
		app.db.getUser(app.loggedin.username)
			.then(function(response){
				var keys = [];
				for(var i = 0; i< response.sends.length; i++){
					keys.push(response.sends[i].route);
				};
				
				return app.db.allDocs({
					include_docs: true,
					keys: keys
				});
			})
			.then(function(response){
				var returnedSends = [];
				for(var i = 0; i< response.rows.length; i++){
					//CLEAR OUT DELETED ROUTES
					if(response.rows[i].doc != null) returnedSends.push(response.rows[i]);
				}
				user.settings.sendlist = returnedSends;
			})
			.catch(function(err){
				console.log(err);
			});
	},

	tickSend: function(routeID){
		//UPDATE THE USERS DATA FOR THAT ROUTE
		var newSend = {
			route: routeID,
			date: new Date().toJSON(),
		}
		user.settings.data.sends.push(newSend);
		app.db.putUser(user.settings.data.name,{
			metadata: {
				sends: user.settings.data.sends
			}
		})
		.then(function(response){
			console.log(response);
		})
		.catch(function(err){
			console.log(err);
		});
	},

	controller: {
		
		hideDetails: function(e,model){
			user.destroy();
		},

		signout: function(e,model){
			model.user.details = false;
			app.db.logout()
				.then(function(response){
					app.clearUser();
					window.location.href="/signin.html"
				})
				.catch(function(err){
					console.log(err);
				});
		},

		changePassword: function(e,model){
			app.userdb.changePassword(model.user.data.name, model.user.newPassword)
				.then(function(response){
					if(response.ok){ 
						model.user.passwordChanged = true;
						model.user.newPassword = "";
						setTimeout(function(){
							model.user.passwordChanged = false;
						},1000);
					}
				})
				.catch(function(err){
					model.user.passwordError.hasError = true;
					model.user.passwordError.message = err.message;
				});
		},
	},

}
