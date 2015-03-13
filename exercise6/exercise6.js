function FormHandler(form){
  this.form = form;
}

FormHandler.prototype = {

  isFormValid: function() {
    var isValid = true;
    var simple_validation_fields = this.form.querySelectorAll('.input-field');

    for(var i = 0; i < simple_validation_fields.length; ) {
      var isValid = this.validateFieldInput(simple_validation_fields[i]);

      if(isValid)
        { i++;}
      else{ break; } 
    }

    if(isValid) {
      isValid = this.validateAboutMe();
    }
    
    if(isValid) {
      isValid = this.validateNotificationCheck();
    }
    
    return isValid;
  },

  validateFieldInput: function(field) {
    if(!field.value.trim()) {
      alert(field.name + ' can\'t be empty');
      return false;  
    }
  },

  validateAboutMe: function() {
    var about_me_field = this.form.elements['About me'], returnVal = true;
    
    result = this.validateFieldInput(about_me_field)
    returnVal = (result == false) ? result : returnVal;

    if (returnVal) {
      result = this.validateFieldLength(about_me_field);
      returnVal = (result == false) ? result : returnVal;
    }
    return returnVal;
  },

  validateFieldLength: function(field) {
    if(field.value.length < 50) {
      alert('Mininum characters allowed for \''+ field.name + '\' is 50');
      return false;
    }
  },

  validateNotificationCheck: function(){
    if(!this.form.elements['Confirm notifications'].checked) {
      alert('You\'ll need to accept notifications');
      return false;
    }
  },

  addEventHandlers: function(){
    var that = this;

    that.form.addEventListener('submit', function(e) {
      e.preventDefault();
      if(that.isFormValid()){
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