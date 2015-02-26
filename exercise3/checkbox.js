function CheckboxOp(checkboxGroup, none_checkbox){
  this.checkboxGroup = checkboxGroup;
  this.noneAction = none_checkbox;
  this.selectedDays = [];
  that = this;
}


CheckboxOp.prototype = {
  constructor: CheckboxOp,

  selectCheckbox: function (e){

    currentCheckbox = e.target;
    
    //ensure the code runs only when checkboxes are the target
    if (currentCheckbox.tagName == "INPUT") {

      if(currentCheckbox.id != 'none') {
        if(that.selectedDays.length < 3 && currentCheckbox.checked == true){
            
          that.selectedDays.push(currentCheckbox.id.toString());

            //deselects the none chkbox
          that.noneAction.checked = false
          
        } else if (that.selectedDays.length >= 3 && currentCheckbox.checked == true) {
            
          //if array is full and user still tries to add
          currentCheckbox.checked = false;
          alert('Only 3 days can be selected.' + 
            '\nYou have already selected ' + that.selectedDays[0] + ', ' + that.selectedDays[1] + ' and ' + that.selectedDays[2]);
        
        } else if(currentCheckbox.checked == false){

          //if the user unchecks...even if array is full
          that.selectedDays.splice(that.selectedDays.indexOf(currentCheckbox.id), 1);
        }
      }
    }
  },


  unselectAll: function() {
    var checkBoxes = that.checkboxGroup.querySelectorAll('input[type=checkbox]'), checkbox;
    for( i = checkBoxes.length; i--; ) {
      checkbox = checkBoxes[i]
      checkbox.checked = false;  
    }

    this.checked = true;
    that.selectedDays = [];
  },


  addEventListeners: function() {
    that.noneAction.addEventListener('click', that.unselectAll);
    that.checkboxGroup.addEventListener('click', that.selectCheckbox);//delegating all checks to the enclosing section element
  }
}


document.addEventListener('DOMContentLoaded', function() {
  var checkboxGroup = document.getElementById('checkbox-group');
  var noneAction = document.getElementById('none');
  var chkboxOps = new CheckboxOp(checkboxGroup, noneAction);
  chkboxOps.addEventListeners();
});



