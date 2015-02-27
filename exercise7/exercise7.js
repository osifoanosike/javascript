function User() {
  this.firstname = "";
  this.lastname = "";
}

User.prototype = {
  create: function(fields) {

    for(i = 0; i < fields.length; i++){
      var input = prompt('Enter your ' + fields[i]);

      if(this.inputIsValid(fields[i], input)){
        this[fields[i]] = input;
      }
    }
    //if both array was populated wits both names
    if (this.firstname && this.lastname) {
      alert('Hello ' + this.firstname +', ' + this.lastname );
      document.body.innerHTML = 'Hello ' + this.firstname +', ' + this.lastname;
    }
  },

  inputIsValid: function(field, input){
    if (!input.trim()){
      alert('The ' + field + ' entered is invalid');
    } else {
      return true;
    }
  }
}

document.addEventListener('DOMContentLoaded', function(){
  var user = new User();
  fields = ["firstname", "lastname"];
  user.create(fields);
});
