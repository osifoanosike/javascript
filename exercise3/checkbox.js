function CheckboxOp(checkboxGroup, checkBoxes, none_checkbox){
  this.checkboxGroup = checkboxGroup;
  this.checkBoxes = checkBoxes
  this.noneAction = none_checkbox;
  this.selectedDays = [];

}


CheckboxOp.prototype = {

  intialize: function() {
    this.noneAction.checked = true;
  },

  uncheckAll: function(checkBoxes) {
     for( i = checkBoxes.length; i--; ) {
        checkbox = checkBoxes[i]
        checkbox.checked = false;  
      }
      this.selectedDays = [];
  },

  checkItem: function(currentCheckbox){
    if(currentCheckbox.id != 'none') {

      if(this.selectedDays.length < 3 && currentCheckbox.checked == true){         
        this.selectedDays.push(currentCheckbox.id.toString());
        this.noneAction.checked = false
      } else if(currentCheckbox.checked == true && this.limitReached(this.selectedDays)) {          
    
        //if array is full and user still tries to add
        currentCheckbox.checked = false;

      } else if(currentCheckbox.checked == false){
        //if the user unchecks...even if array is full
        this.selectedDays.splice(this.selectedDays.indexOf(currentCheckbox.id), 1);

      }
    }
  },

  limitReached: function(selectedDays){
    if (selectedDays.length >= 3) {
      //currentCheckbox.checked = false;
      var lastSelected = this.selectedDays[this.selectedDays.length - 1];
      alert('Only 3 days can be selected.' + 
        '\nYou have already selected ' + this.selectedDays.slice(0, -1).join(', ') + ' and ' + lastSelected);
      return true;
    }
    else{
      return false;
    }        
  },

  addEventListeners: function() {
    var that = this;

    this.noneAction.addEventListener('click', function() {
      if (this.checked == true) {
        var checkBoxes = that.checkBoxes
        that.uncheckAll(checkBoxes);
        this.checked = true;  
      }   
    });

    //delegating all checks to the enclosing section element
    this.checkboxGroup.addEventListener('click', function (e){
      var currentCheckbox = e.target;
      that.checkItem(currentCheckbox);  
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var checkboxGroup = document.getElementById('checkbox-group');
  var noneAction = document.getElementById('none');
  var checkBoxes = document.getElementsByName('checkbox');
  var chkboxOps = new CheckboxOp(checkboxGroup,checkBoxes, noneAction);
  chkboxOps.addEventListeners();
  chkboxOps.intialize()
});




