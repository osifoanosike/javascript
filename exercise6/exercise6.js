function FormHandler(form){
  this.form = form;
}

FormHandler.prototype = {
  validateForm: function(form_param){
    var returnVal = true, i = 0;
    
    var simple_validation_fields = form_param.querySelectorAll('.input-field');

    for(i = 0; i < simple_validation_fields.length; ) {
      
      // check for empty or null strings and only change returnVal if result if false
      var result = this.validateFieldInput(simple_validation_fields[i]);
      returnVal = (result == false) ? result : returnVal;

      if(returnVal)
        { i++;}
      else{ break; } 
    }

    if(returnVal) {
      result = this.validateAboutMe();
      returnVal = (result == false) ? result : returnVal;
    }
    
    if(returnVal) {
      result = this.validateNotificationCheck(form_param.elements['Confirm notifications']);
      returnVal = (result == false) ? result : returnVal;
    }
    
    return returnVal;
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