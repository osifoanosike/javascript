

function User(name_param, age_param) {
	this.name = name_param;
	this.age = age_param;
}

User.prototype.compare = function(other_user) {
	user_age = Number(this.age);
	other_age = Number(other_user.age);

	if(user_age > other_age) {
		return '' + this.name + ' is older than ' + other_user.name;
	} 
	else if(other_age > user_age) {
		return '' + other_user.name + ' is older than ' + this.name;
	}
}

var user1 = new User("Joshua", "13");
var user2 = new User("Helen", "17");