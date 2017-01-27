var signin = {
	settings: {
		username: {
			value: ""
		},
		password: {
			value: ""
		},
		showpassword: true,
		loginerror:{
			haserror: false,
			messge: "",
		},
	},

	init: function(){

	},

	signMeIn: function(username, password){
		db.login(username, password)
			.then(function(response){
				return db.getUser(username);
			}).then(function(response){
				console.log(response);
				window.location.href = "/" + response.usertype + ".html";
			})
			.catch(function(err){
				signin.settings.loginerror.haserror = true;
				signin.settings.loginerror.message = err.message;
			});
	},

	controller: {
		signin: function(e,model){
			signin.signMeIn(model.signin.username.value, model.signin.password.value);
		},

		showSignin: function(){
			signin.visible = true;
		},

		errorClear: function(e,model){
			model.signin.loginerror.haserror = false;
		},

	}
}

rivets.bind($('.js--signin'),{
	signin: signin.settings,
	signincontroller: signin.controller
});