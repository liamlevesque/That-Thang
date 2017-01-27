function routeItemViewModel(attributes) {
    this.data = attributes;
}

rivets.components['routeitem'] = {
	template: function() {
        var template = '<span rv-text="data.route.name"></span> (<span rv-text="data.route.votes.average | roundTwoDecimals"></span>)<div class="route--data h-float-right"><span rv-text="data.route.grade | gradeconversion data.route.type"></span><div class="route--colour"></div></div>';
        return template;
    },

    initialize: function(el, attributes) {
    	return new routeItemViewModel(attributes);
    }
}; 