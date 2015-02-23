function FormOperation(form){
	this.currform = form;
	that = this;
}

FormOperation.prototype = {
	doSubmit: function() {
		event.preventDefault();
		var input = that.currform['number'].value;
		var truePattern = /^\d+$/;

		if(truePattern.test(input.trim())){
			that.currform['result'].value = "true";
			that.currform.submit();
		}
		else{
			that.currform['result'].value = "false";
		}
	},

	addEventHandlers: function(){
		that.currform.addEventListener('submit', that.doSubmit);
	}
}


document.addEventListener('DOMContentLoaded', function(){
	var form = document.getElementById('myForm');

	var formOps = new FormOperation(form);
	formOps.addEventHandlers();
});