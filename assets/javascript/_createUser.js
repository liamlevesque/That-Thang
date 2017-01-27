var createUser = {
	settings: {
		visible: false,
		username:{
			value:""
		},
		password:{
			value:""
		},
		email:{
			value:""
		},
		userTypes:[
			"Customer",
			"Employee"
		],
		userType: "Customer",
		saving: false,
		error: {
			haserror: false,
			message: ""
		},
		qrcode: '',
	},

	init: function(){
		overlays.loadOverlay("createuseroverlay");

		rivets.bind($('.js--createUser'),{
			createuser: createUser.settings,
			createusercontroller: createUser.controller
		});

		setTimeout(function(){
			$('.js--createUser').addClass('s-visible');	
		}, 1);
	},

	destroy: function(){
		$('.js--createUser').removeClass("s-visible");
		setTimeout(function(){
			$('.js--createUser').remove();
		},500);
		createUser.settings.saving = false;
		
	},

	generateQRCode: function(id){
		var qr = new QRious({
		  value: id,
		  size: 1000,
		})

		return qr.toDataURL().split(",")[1];
	},

	controller: {
		showCreateModal: function(e,model){
			model.createuser.visible = true;
		},
		
		createUser: function(e,model){
			model.createuser.saving = true;
			var qr = createUser.generateQRCode(model.createuser.username.value);

			db.signup(model.createuser.username.value, model.createuser.password.value,{
				metadata: {
					email : model.createuser.email.value,	
					sends : [],
					qrcode : qr,
					usertype: model.createuser.userType
				}

			}).then(function(response){
				return db.login(model.createuser.username.value, model.createuser.password.value);
			}).then(function(response){
				signin.signMeIn(model.createuser.username.value, model.createuser.password.value);
			}).catch(function(err){
				model.createuser.saving = false;
				model.createuser.error.haserror = true;
				model.createuser.error.message = err.message;
				console.log(err);
			});
		},

		cancelCreateUser: function(e,model){
			createUser.destroy();
		}, 

		makeQRCode: function(e,model){
			createUser.generateQRCode(model.createuser.username.value);
		},

		setUserType: function(e,model){
			createUser.settings.userType = e.currentTarget.value;
		}
	}
}
