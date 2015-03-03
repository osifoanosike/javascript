function CheckboxOp(checkboxGroup, none_checkbox){
  this.checkboxGroup = checkboxGroup;
  this.noneAction = none_checkbox;
  this.selectedDays = [];

}


CheckboxOp.prototype = {

  uncheckAll: function(checkBoxes) {
     for( i = checkBoxes.length; i--; ) {
        checkbox = checkBoxes[i]
        checkbox.checked = false;  
      }
      that.selectedDays = [];
  },

  checkItem: function(currentCheckbox){
    if(currentCheckbox.id != 'none') {

      if(this.selectedDays.length < 3 && currentCheckbox.checked == true){         
        this.selectedDays.push(currentCheckbox.id.toString());
        this.noneAction.checked = false
      } else if (this.selectedDays.length >= 3 && currentCheckbox.checked == true) {
              
        //if array is full and user still tries to add
        currentCheckbox.checked = false;
        var lastSelected = this.selectedDays[this.selectedDays.length - 1];
        alert('Only 3 days can be selected.' + 
          '\nYou have already selected ' + this.selectedDays.slice(0, -1).join(', ') + ' and ' + lastSelected);
          
      } else if(currentCheckbox.checked == false){

        //if the user unchecks...even if array is full
        this.selectedDays.splice(this.selectedDays.indexOf(currentCheckbox.id), 1);
      }
    }
  },


  addEventListeners: function() {
    var that = this;

    this.noneAction.addEventListener('click', function() {
      var checkBoxes = that.checkboxGroup.querySelectorAll('input[type=checkbox]');
      that.uncheckAll(checkBoxes);
      this.checked = true;  
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
  var chkboxOps = new CheckboxOp(checkboxGroup, noneAction);
  chkboxOps.addEventListeners();
});




