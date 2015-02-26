function FormHandler(regForm, notifCheck){
  this.regForm = regForm;
  this.notifCheck = notifCheck;
  that = this;
}

FormHandler.prototype = {
  isFormValid: function(form_param){
    var i, returnVal;
    for(i = 0; i < form_param.elements.length; i++ ) {
      var currentField = form_param.elements[i];

      // check for empty or null strings
      if(!currentField.value.trim()) {
        alert(currentField.name + ' can\'t be empty');
        returnVal = false;

      } else if(currentField.id == "about_me" && (!currentField.value.trim() || currentField.value.length < 50) ){
        alert('Mininum characters allowed for \''+ currentField.name + '\' is 50');
        returnVal = false;
      } else {
        returnVal = true
      }
    }
    return returnVal;
  },

  validateForm: function(e) {
    e.preventDefault();

    if(that.isFormValid(that.regForm)){
      that.regForm.submit();
    }
  },

  confirmNotif: function(){
    if(this.checked == true) {
      if(confirm("You sure you want to recieve notifications?")){
        this.checked = true;
      } else {
        this.checked = false;
      }
    }
  },

  addEventHandlers: function(){
    that.regForm.addEventListener('submit', that.validateForm); 
    that.notifCheck.addEventListener('click', that.confirmNotif);
  }
}

document.addEventListener('DOMContentLoaded', function(){

  var form = document.getElementById('regForm');
  var notif_confirm = document.getElementById('notifCheck');
  var formHandler = new FormHandler(form, notif_confirm);

  formHandler.addEventHandlers();
});