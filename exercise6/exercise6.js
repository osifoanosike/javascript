function FormHandler(form){
  this.form = form;
}

FormHandler.prototype = {

  validateFields: function(){
    var fields = this.form.elements, validity = true;
    
    if(!this.validateFieldInput(fields['Login ID'])){
      alert('Login ID can\'t be empty');
      validity = false;
    }
    else if(!this.validateFieldInput(fields['Email'])){
      alert('Email can\'t be empty');
      validity = false;
    }
    else if(!this.validateFieldInput(fields['Name'])){
      alert('Name can\'t be empty');
      validity = false;
    }
    else if(!this.validateFieldInput(fields['Home page'])){
      alert('Home page can\'t be empty');
      validity = false;
    }
    else if(!this.validateFieldInput(fields['About me'])){
      alert('About me can\'t be empty');
      validity = false;
    }
    else if(!this.validateFieldLength(fields['About me'])){
      alert('Mininum characters allowed for \' About me \' is 50');
      validity = false;
    }
    else if(!this.validateNotificationCheck(fields['Confirm notifications'])){
       alert('You\'ll need to accept notifications');
       validity = false;
    }
    return validity;
  },

  validateFieldInput: function(field) {
    if(!field.value.trim()) {
      return false;  
    } else { return true; }
  },

  validateFieldLength: function(field) {
    if(field.value.length < 50) {        
        return false;
    } else { return true; }
  },

  validateNotificationCheck: function(field){
    if(!field.checked) {  
      return false;
    } else { return true; }
  },

  addEventHandlers: function(){
    var that = this;

    that.form.addEventListener('submit', function(e) {
      e.preventDefault();
      if(that.validateFields()){
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