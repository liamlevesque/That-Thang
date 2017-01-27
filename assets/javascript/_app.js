$(function() {

	app.getLoggedIn(app.db)
		.then(function(response){
			user.setUser(response);
		}).catch(function(err){
			app.clearUser();
			//console.log(err)
			window.location.href="/signin.html";
		});

	routes.init(); 
	
	$('.js--createRoute').click(function(){
		routeCreator.init();
	});

	$('.js--compareRoutes').click(function(){
		analytics.init();
	});

});

window.addEventListener('popstate', function(e) {
	if(e.state === null) overlays.killOverlays();
	else console.log(e.state);
});

var app = {
		db : new PouchDB('http://localhost:5984/routes', {skipSetup: true}),
		userdb: new PouchDB('http://localhost:5984/_users'),
		online : true,
		cancelActionTimeout:false,
		undoMessage: '',
		confirmMessage: '',
		loggedin : {
			isloggedin: false,
			username: "",
		},

		getLoggedIn:function(db){
			return new Promise(function(fulfill, reject){
				app.db.getSession()
					.then(function(response){
						if(!response.userCtx.name){
							reject("Not signed in");
						}
						else{
							fulfill(response.userCtx.name);
						}
					})
					.catch(function(err){
						reject("Error getting your session");
					});
			});
		},

		clearUser: function(){
			this.loggedin.username = "";
			this.loggedin.isloggedin = false;
			//app.loggedin.userData = {};
		},

		rootURL: function(){
			history.pushState(null,null,"/customer.html");
		},

		deleteRoute: function(id,message){
			app.undoMessage = message;

			setTimeout(function(){
				if(app.cancelActionTimeout){
					app.cancelActionTimeout = false;
					return;	
				}
				
				app.cancelActionTimeout = false;
				app.db.get(id).then(function(doc) {
					app.undoMessage = '';
					return app.db.remove(doc);
				}).catch(function (err) {
					console.log(err);
				});
			},3000);
			
		},

		confirmUndoToast: function(id,message){
			app.undoMessage = message;
			return new Promise(function (resolve, reject) { 
        		setTimeout(function () { 
        			
        			if(app.cancelActionTimeout){
						app.cancelActionTimeout = false;
						reject('action cancelled');	
					}

					else{
						app.cancelActionTimeout = false;
						app.undoMessage = '';
						resolve(true);
					}

        		},3000);
        	});
		},

		confirmSuccessToast: function(message){
			app.confirmMessage = message;

			setTimeout(function(){
				app.confirmMessage = '';
			},3000);
		},

	},
	appcontroller = {
		
		showDetails: function(e,model){
			user.show();
		},		

		undoAction: function(e,model){
			app.cancelActionTimeout = true;
			app.undoMessage = '';
			routes.sort();
		},

		hideConfirmation: function(e,model){
			app.confirmMessage = '';
		}

		
	};


rivets.bind($('.js--app'),{
	app: app,
	appcontroller: appcontroller
});




