var overlays = {
	killOverlays: function(){
		routedetails.destroy();
	},

	loadOverlay: function(id){
		var el = document.getElementById(id);
		var clone = document.importNode(el.content, true);
		document.body.appendChild(clone);		
	}
}