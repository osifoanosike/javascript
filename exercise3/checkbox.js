function CheckboxOp(checkBoxes, none_checkbox){
  this.checkBoxes = checkBoxes;
  this.noneAction = none_checkbox;
  this.len = this.checkBoxes.length;
  this.selectedDays = [];
  that = this;
}


CheckboxOp.prototype = {
  constructor: CheckboxOp,

  selectCheckbox: function (){
    currentCheckbox = this;

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
  },


  unselectAll: function() {
    for( i = 0; i < that.checkBoxes.length; i++ ) {
      that.checkBoxes[i].checked = false;  
    }

    this.checked = true;
    that.selectedDays = [];
  },


  addEventListeners: function() {
    _this = this;
    that.noneAction.addEventListener('click', _this.unselectAll);

    for( i = 0; i < this.len; i++ ) {
      // console.log(this.checkBoxes[i]);

      that.checkBoxes[i].addEventListener('click', _this.selectCheckbox);
    }
  }
}


document.addEventListener('DOMContentLoaded', function() {

  var checkBoxes = document.body.querySelectorAll('input[type=checkbox]');
  var noneAction = document.getElementById('none');

  var chkboxOps = new CheckboxOp(checkBoxes, noneAction);
  chkboxOps.addEventListeners();

});



