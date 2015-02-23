


function User() {
  this.firstname = "";
  this.lastname = "";
  that = this;
}

User.prototype = {
  constructor: User,

  create: function(fields) {

    for(i = 0; i < fields.length; i++){
      var input = prompt('Enter your ' + fields[i]);

      if(that.inputIsValid(fields[i], input)){
        this[fields[i]] = input;
      }
    }
    //if both array was populated wits both names
    if (that.firstname.trim() && that.lastname.trim()) {
      alert('Hello ' + that.firstname +', ' + that.lastname );
      document.body.innerHTML = 'Hello ' + that.firstname +', ' + that.lastname;
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
