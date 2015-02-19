function User(name, age) {
  this.name = name;
  this.age = age;
}

User.prototype = {
  constructor: User,

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
var user1 = new User("Joshua", "26");

var user2 = new User("Eunice","14");

//perform comparison
console.log(user1.compare(user2));
console.log(user2.compare(user1));