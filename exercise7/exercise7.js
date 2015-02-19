
document.addEventListener('DOMContentLoaded', function(){
	var fields = ['firstname', 'lastname'], i;
	var names = []

	for(i = 0; i < fields.length; i++){
		var currentInput = prompt('Enter your ' + fields[i]);
		
		//converts input to its boolean value (nulll and empty string == false)
		if (!currentInput.trim()){
			alert('The ' + fields[i] + ' entered is invalid');
			names = [];
		} else {
			names.push(currentInput);
		}
	}
	//if both array was populated wits both names
	if (names.length == 2) {
		alert('Hello ' + names.join(', ') );
		document.body.innerHTML = 'Hello ' + names.join(', ');
	}
});