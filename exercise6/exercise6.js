function FormHandler(form){
  this.form = form;
}

FormHandler.prototype = {
  isFormValid: function() {
    var simple_validation_fields = this.form.querySelectorAll('.input-field');

    for(var i = 0; i < simple_validation_fields.length; ) {
      var isValid = this.validateFieldInput(simple_validation_fields[i]);
      console.log(isValid)
      if(isValid)
        { i++;}
      else{ break; } 
    }

    if(isValid) { isValid = this.validateAboutMe(); }
    if(isValid) { isValid = this.validateNotificationCheck();  }
    
    return isValid;
  },
 
  validateFieldInput: function(field) {
    if(!field.value.trim()) {
      alert(field.name + ' can\'t be empty');
      return false;  
    }else { return true; }
  },

  validateAboutMe: function() {
    var about_me_field = this.form.elements['About me'], result = false;
    
    if (this.validateFieldInput(about_me_field)) {
      result = this.validateFieldLength(about_me_field);
    }
    return result;
  },

  validateFieldLength: function(field) {
    if(field.value.length < 50) {
      alert('Mininum characters allowed for \''+ field.name + '\' is 50');
      return false;
    } else { return true; }
  },

  validateNotificationCheck: function(){
    if(!this.form.elements['Confirm notifications'].checked) {
      alert('You\'ll need to accept notifications');
      return false;
    } else { return true; }
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