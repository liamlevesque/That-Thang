var users = {
	settings : {
		list : {},
		visible: false,
	},

	init : function(){
		var s = this.settings;
		var c = this.controller;

		c.updateUsers(s);

		//START OBSERVING CHANGES TO DATABASE
		var changes = app.userdb.changes({
		  since: 'now',
		  live: true,
		}).on('change', function(change) {
		  c.updateUsers(s);
		}).on('complete', function(info) {
		  console.log('changes complete');
		}).on('error', function (err) {
		  console.log(err);
		});
	},

	controller : {
		
		updateUsers: function(s){
			app.userdb.allDocs({
			  include_docs: true,
			  attachments: true
			}).then(function(result){
				s.list = result.rows;
			})
			.catch(function(err){
				console.log(err)
			}); 
		},

		loadDetails: function(e, model){
			model.users.userdb.get(model.user.id).then(function(doc) {
				// userdetails.settings.userData = doc;
				// userdetails.settings.visible = true;
			});
		}
	}
}

rivets.bind($('.js--users'),{
	users: users.settings,
	userscontroller: users.controller
});