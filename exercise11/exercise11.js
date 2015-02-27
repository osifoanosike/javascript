function FormOperation(form){
  this.currform = form;
  that = this;
}

FormOperation.prototype = {
  addEventHandlers: function(){
    var that = this;
    this.currform.addEventListener('submit', function() {
      event.preventDefault();
      var input = that.currform['number'].value;

      if(/^\d+$/.test(input.trim())){
        that.currform['result'].value = "true";
        that.currform.submit();
      }
      else{
        that.currform['result'].value = "false";
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', function(){
  var form = document.getElementById('myForm');
  var formOps = new FormOperation(form);
  formOps.addEventHandlers();
});