function FormHandler(form, notificationCheck){
  this.form = form;
  this.notificationCheck = notificationCheck;
  that = this;
}

FormHandler.prototype = {
  validateForm: function(form_param){
    var i;
    var returnVal = true;
    for(i = 0; i < form_param.elements.length; i++ ) {
      var currentField = form_param.elements[i];

      // check for empty or null strings
      if(!currentField.value.trim()) {
        alert(currentField.name + ' can\'t be empty');
        returnVal = false;

      } else if(currentField.id == "about_me") {
        returnVal = validateFieldLength(currentField);
      }
    }
    return returnVal;
  },

  validateFieldLength: function(field) {
    if(field.value.length < 50) {
        alert('Mininum characters allowed for \''+ field.name + '\' is 50');
        returnVal = false;
    }
  },

  validate: function(e) {
    e.preventDefault();

    if(that.validateForm(that.form)){
      that.form.submit();
    }
  },

  confirmNotification: function(){
    if(this.checked == true) {
      if(confirm("You sure you want to recieve notifications?")){
        this.checked = true;
      } else {
        this.checked = false;
      }
    }
  },

  addEventHandlers: function(){
    that.form.addEventListener('submit', that.validate); 
    that.notificationCheck.addEventListener('click', that.confirmNotification);
  }
}

document.addEventListener('DOMContentLoaded', function(){
  var form = document.getElementById('regForm');
  var notifCheckbox = document.getElementById('notifCheck');
  var formHandler = new FormHandler(form, notifCheckbox);

  formHandler.addEventHandlers();
});