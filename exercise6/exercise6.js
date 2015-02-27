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
        result = this.validateFieldContent(currentField);
        returnVal = (result == false) ? result : returnVal;
      }
      
    }
    return returnVal;
  },

  validateFieldContent: function(field){
    var result = null;
    if(!field.value.trim()) {
      alert(field.name + ' can\'t be empty');
      result = false;  
    } else if(field.id == "about_me") {
      result = this.validateFieldLength(field);
    } else if (field.id == "notifCheck"){
      result = this.validateNotificationCheck(field);
    } 
    return result;
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