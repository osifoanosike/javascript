function User(){

}

User.prototype = {
  name: 'tobi',
  age: '29',

  compare: function(other_user) {
    user_age = Number(this.age);
    other_age = Number(other_user.age);

    if(user_age > other_age) {
      return '' + this.name + ' is older than ' + other_user.name;
    } 
    else if(other_age > user_age) {
      return '' + other_user.name + ' is older than ' + this.name;
    }
  }

};


//creating user instances
var user1 = new User();
user1.name =  "Joshua", 
user1.age = "26";


var user2 = new User();
user2.name = "Eunice";
user2.age = "14";

//perform comparison
console.log(user1.compare(user2));
console.log(user2.compare(user1));