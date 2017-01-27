function passwordViewModel(attributes) {
    this.data = {
        passhidden: false,
        att: attributes,
    }

    this.hidepassword = function (e, scope) {
        scope.data.passhidden = !scope.data.passhidden;
    };
    
}

rivets.components['password'] = {
    static:['placeholder'],

    template: function() {
        var template = '<input type="password" class="field_text" rv-value="data.att.val.value" rv-show="data.passhidden" placeholder="Password"/><input type="text" rv-value="data.att.val.value" rv-hide="data.passhidden" class="field_text" placeholder="Password"/><button class="password-toggle-vis button--icon_small button--transparent_grey" rv-on-click="hidepassword"><i class="icon-eye" rv-show="data.passhidden"></i><i class="icon-eye_closed" rv-hide="data.passhidden"></i></button>';
        return template;
    },

    initialize: function(el, attributes) {
        return new passwordViewModel(attributes);
    }
}; 