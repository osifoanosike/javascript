function FormHandler(form){
  this.form = form;
}

FormHandler.prototype = {
  addEventHandlers: function(){
    var that = this;
    this.form.addEventListener('submit', function() {
      event.preventDefault();
      var input = that.form['number'].value;

      if(/^\d+$/.test(input.trim())){
        that.form['result'].value = "true";
        that.form.submit();
      }
      else{
        that.form['result'].value = "false";
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', function(){
  var form = document.getElementById('myForm');
  var formHandler = new FormHandler(form);
  formHandler.addEventHandlers();
});