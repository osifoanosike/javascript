function FormHandler(form, notificationCheck){
  this.form = form;
}

FormHandler.prototype = {
  validateForm: function(form_param){
    var returnVal = true, i;
    for(i = 0; i < form_param.elements.length; i++ ) {
      var currentField = form_param.elements[i], result;

      if(currentField.matches('.input-field')) {
        // check for empty or null strings and only change returnVal if result if false
        result = this.validateFields(currentField);
        returnVal = (result == false) ? result : returnVal;
      }
    }
    return returnVal;
  },

  validateFields: function(currentField){
    var result = null;  
    result = this.validateFieldInput(currentField)
    
    switch(currentField.id){
      case "notifCheck":
        result = this.validateNotificationCheck(currentField);
        break; 
      case "about_me":
        result = this.validateFieldLength(currentField);
        break;      
      case "email": 
        result = this.validateEmail(currentField);
        break;
      case "home_page": 
        result = this.validateHomepageUrl(currentField);
        break;
    }
    return result;
  },

  validateFieldInput: function(currentField){
     if(!currentField.value.trim()) {
      alert(currentField.name + ' can\'t be empty');
      return false;  
    }
  },

  validateFieldLength: function(field) {
    if(field.value.length < 50) {
        alert('Mininum characters allowed for \''+ field.name + '\' is 50');
        return false;
    }
  },

  validateEmail: function(field) {
    var emailRegex = /^([a-z][a-z0-9_\-\.])*\@([a-z0-9_\-\.]){1,}\.([a-z]{2,4})$/i;
        
    if(!emailRegex.test(field.value)){
      alert("Please enter a valid email address");
      return false;
    }
  },

  validateHomepageUrl: function(field) {
    var homepageRegex = /^(http:\/\/|(www|ww\d)|http:\/\/(www|ww\d))?([A-Za-z0-9_\-\.]){1,}\.[A-Za-z]{2,3}\/?$/;     
    if(!homepageRegex.test(field.value)){
      alert("Please enter a valid homepage url");
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

    this.form.addEventListener('submit', function(e) {
      e.preventDefault();
      var result = that.validateForm(this);
      if(result){
        this.submit();
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', function(){
  var form = document.getElementById('regForm');
  var notifCheckbox = document.getElementById('notifCheck');
  var formHandler = new FormHandler(form, notifCheckbox);

  formHandler.addEventHandlers();
});