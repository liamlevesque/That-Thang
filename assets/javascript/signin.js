$(function(){
	$('.js--showCreateAccount').click(function(){
		createUser.init();
	});
});   

var db = new PouchDB('http://localhost:5984/_users');