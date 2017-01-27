function emailInputViewModel(attributes) {
    this.data = {
    	att: attributes,
    	invalid: false
    };

    this.manageinput = function(e,scope){
    	var re = /\S+@\S+\.\S+/;
		if (scope.data.att.val.value == '' || !re.test(scope.data.att.val.value)){
			scope.data.invalid = true;
		}else{
			scope.data.invalid = false;
		}
    }
}

rivets.components['emailinput'] = {
	static:['placeholder'],

    template: function() {
        var template = '<input class="field_text" type="email" rv-placeholder="data.att.placeholder" rv-class-s-error="data.invalid" rv-on-keyup="manageinput" rv-value="data.att.val.value"><div class="field--error" rv-show="data.invalid">Are you sure about that e-mail address?</div>';
        return template;
    },

    initialize: function(el, attributes) {
    	return new emailInputViewModel(attributes);
    }
}; 