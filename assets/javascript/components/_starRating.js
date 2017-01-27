/*******************************
CODE FOR STAR RATING COMPONENT
********************************/
function starRatingViewModel(attributes) {
    this.setRating = function (e, scope) {
        routedetails.setVote(e.currentTarget.value);
    };
}

rivets.components['starrating'] = {
    template: function() {
        var template = '<div class="stars">';
        for(var i = 1;i < 6;i++){
        	template += '<input type="radio" id="star' + i + '" name="starrating" rv-on-change="setRating" value="'+ i +'"/>';
        }
        for(var i = 1;i < 6;i++){
            template +='<label class="starrating" for="star' + i + '"></label>';
        }
        template += '</div>';
        return template;
    },
    initialize: function(el, attributes) {
    	return new starRatingViewModel();
    }
}; 


