function convertToSlug(Text)
{
    return Text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;
}

function Route(route){
	
	this.grade = parseInt(route.grade);
	this.description = route.description;
	this.name = route.name;
	this._id = new Date().toJSON();
	this.date = new Date().toJSON();
	this.colour = route.colour;
	this.type = route.type;
	this.topology = route.topo;
	this.sends = {
		count: 0,
		users: [],
		sends: []
	};
	this.comments = [];
	this.likes = 0;
	this.votes = {
		count: 0,
		average: 0,
		ratings: []
	}

}