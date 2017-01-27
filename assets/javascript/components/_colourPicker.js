/*******************************
CODE FOR COLOUR PICKER COMPONENT
********************************/
function colourPickerViewModel(attributes) {
    this.data = attributes;

    this.setColour = function (e, scope) {
        routeCreator.settings.route.colour.value = e.currentTarget.value;
    };
}

rivets.components['colourpicker'] = {
    template: function() {
        var template = '<div class="colourpicker">';
        for(var i = 0;i < routeCreator.settings.holdcolours.length;i++){
        	template += '<label class="colourpicker--colour colour--'+ routeCreator.settings.holdcolours[i].name +'"><input type="radio" name="colourpicker" tabindex="0" rv-on-change="setColour" value="'+ routeCreator.settings.holdcolours[i].name +'"/><div class="check"></div></label>';
        }
        template += '</div>'
        return template;
    },
    initialize: function(el, attributes) {
    	return new colourPickerViewModel();
    }
}; 


