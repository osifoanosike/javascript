function CheckboxOp(checkboxGroup, none_checkbox){
  this.checkboxGroup = checkboxGroup;
  this.noneAction = none_checkbox;
  this.selectedDays = [];

}


CheckboxOp.prototype = {
  addEventListeners: function() {
    var that = this;

    this.noneAction.addEventListener('click', function() {
      var checkBoxes = that.checkboxGroup.querySelectorAll('input[type=checkbox]'), checkbox;
      for( i = checkBoxes.length; i--; ) {
        checkbox = checkBoxes[i]
        checkbox.checked = false;  
      }

      this.checked = true;
      that.selectedDays = [];
    });

    //delegating all checks to the enclosing section element
    this.checkboxGroup.addEventListener('click', function (e){
      var currentCheckbox = e.target;

      if(currentCheckbox.id != 'none') {
        console.log(that.selectedDays);

          if(that.selectedDays.length < 3 && currentCheckbox.checked == true){         
            that.selectedDays.push(currentCheckbox.id.toString());
            
            //deselects the none chkbox
            that.noneAction.checked = false
          } else if (that.selectedDays.length >= 3 && currentCheckbox.checked == true) {
              
            //if array is full and user still tries to add
            currentCheckbox.checked = false;
            var lastSelected = that.selectedDays[that.selectedDays.length - 1];
            alert('Only 3 days can be selected.' + 
              '\nYou have already selected ' + that.selectedDays.slice(0, -1).join(', ') + ' and ' + lastSelected);
          
          } else if(currentCheckbox.checked == false){

            //if the user unchecks...even if array is full
            that.selectedDays.splice(that.selectedDays.indexOf(currentCheckbox.id), 1);
          }
        }
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var checkboxGroup = document.getElementById('checkbox-group');
  var noneAction = document.getElementById('none');
  var chkboxOps = new CheckboxOp(checkboxGroup, noneAction);
  chkboxOps.addEventListeners();
});




