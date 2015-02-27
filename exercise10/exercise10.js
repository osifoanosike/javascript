function FormHandler(regForm, notifCheck){
  this.regForm = regForm;
  this.notifCheck = notifCheck;
}

FormHandler.prototype = {
  isFormValid: function(form_param){
    var i;
    var returnVal = true;
    for(i = 0; i < form_param.elements.length; i++ ) {
      var currentField = form_param.elements[i];

      // check for empty or null strings
      if(!currentField.value.trim()) {
        alert(currentField.name + ' can\'t be empty');
        returnVal = false;
      } 

      //do field specific checks
      if(currentField.id == "about_me" && (!currentField.value.trim() || currentField.value.length < 50) ){
        alert('Mininum characters allowed for \''+ currentField.name + '\' is 50');
        returnVal = false;
      
      } else if (currentField.id == "email") {
      	var emailRegex = /^([A-Za-z0-9_\-\.]){1,}\@([A-Za-z0-9_\-\.]){1,}\.([A-Za-z]{2,4})$/;
      	
      	if(!emailRegex.test(currentField.value)){
      		alert("Please enter a valid email address");
      		returnVal = false;
      	}

      } else if(currentField.id == "home_page"){
      	var homepageRegex = /^(http:\/\/|(www|ww\d)|http:\/\/(www|ww\d))?([A-Za-z0-9_\-\.]){1,}\.[A-Za-z]{2,3}\/?$/;
      	
      	if(!homepageRegex.test(currentField.value)){
      		alert("Please enter a valid homepage url");
      		returnVal = false;
      	}
      } 
    }
    return returnVal;
  },

  addEventHandlers: function(){
    var that = this;
    this.regForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if(that.isFormValid(that.regForm)){
        that.regForm.submit();
      }
    }); 

    this.notifCheck.addEventListener('click', function(){
      if(this.checked == true) {
        if(confirm("You sure you want to recieve notifications?")){
          this.checked = true;
        } else {
          this.checked = false;
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', function(){

  var form = document.getElementById('regForm');
  var notif_confirm = document.getElementById('notifCheck');
  var formHandler = new FormHandler(form, notif_confirm);

  formHandler.addEventHandlers();
});