rivets.binders.divtextarea = {
    publishes: true,
    routine: function(el,value){
    	if(typeof value == 'undefined') el.innerText = "";
        else el.innerText = value;
    },
    getValue: function(el){
    	return el.innerText;
    },
    bind: function (el) {
        el.setAttribute("contenteditable", true);
        el.addEventListener('input', this.publish);
    },
    unbind: function (el) {
        el.removeEventListener('input', this.publish);
    }
};