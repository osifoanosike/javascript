function FormHandler(form){
  this.form = form;
}

FormHandler.prototype = {
  validateForm: function(form_param){
    var returnVal = true, i = 0;
    
    for(i = 0; i < form_param.elements.length; ) {
      var currentField = form_param.elements[i], result;
      if(currentField.matches('.input-field')) {
       // check for empty or null strings and only change returnVal if result if false
       result = this.validateFields(currentField);
       returnVal = (result == false) ? result : returnVal;
      }

      if(returnVal) { 
        i++ ;
      } else {
        break;
      } 
    }
    return returnVal;
  },

  validateFields: function(field){
    var result = null;    
    result = this.validateFieldInput(field)

    if(field.id == "about_me") {
      result = this.validateFieldLength(field);
    }

    if (field.id == "notifCheck"){
      result = this.validateNotificationCheck(field);
    }

    return result;
  },

  validateFieldInput: function(field) {
    if(!field.value.trim()) {
      alert(field.name + ' can\'t be empty');
      return false;  
    }
  },

  validateFieldLength: function(field) {
    if(field.value.length < 50) {
        alert('Mininum characters allowed for \''+ field.name + '\' is 50');
        return false;
    }
  },

  validateNotificationCheck: function(field){
    if(!field.checked) {
      alert('You\'ll need to accept notifications');
      return false;
    }
  },

  addEventHandlers: function(){
    var that = this;

    that.form.addEventListener('submit', function(e) {
      e.preventDefault();
      if(that.validateForm(this)){
        this.submit();
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', function(){
  var form = document.getElementById('regForm');
  var formHandler = new FormHandler(form);

  formHandler.addEventHandlers();
});