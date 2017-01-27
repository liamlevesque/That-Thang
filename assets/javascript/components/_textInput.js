function textInputViewModel(attributes) {
    this.data = attributes;

    this.manageinput = function(e,scope){
        if(typeof  scope.data.val.value == "undefined" || scope.data.val.value == "") $(e.currentTarget).addClass('s-error');
    	else $(e.currentTarget).removeClass('s-error');
    }
}

rivets.components['textinput'] = {
	static:['placeholder'],

    template: function() {
        var template = '<input class="field_text" type="text" rv-on-keyup="manageinput" rv-placeholder="data.placeholder" rv-value="data.val.value"><br/>';
        return template;
    },

    initialize: function(el, attributes) {
    	return new textInputViewModel(attributes);
    }
}; 
 