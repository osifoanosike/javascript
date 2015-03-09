function CheckboxOp(checkboxGroup, none_checkbox, checkLimit){
  this.checkboxGroup = checkboxGroup;
  this.noneAction = none_checkbox;
  this.selectedDays = [];
  this.checkCountLimit = checkLimit;
}


CheckboxOp.prototype = {

  setup: function() {
    this.noneAction.checked = true;
  },

  uncheckItems: function() {
    var checkedItems = this.checkboxGroup.querySelectorAll('.selected');
    for( i = checkedItems.length; i--; ) {
      checkedItems[i].checked = false; 
      checkedItems[i].removeAttribute('class'); 
    }
    this.selectedDays = [];
  },

  checkItem: function(currentCheckbox){
    this.noneAction.checked = false;

    if(this.selectedDays.length < this.checkCountLimit && currentCheckbox.checked){         
        this.selectedDays.push(currentCheckbox.id);
        currentCheckbox.setAttribute('class', 'selected');
    } else if(currentCheckbox.checked  && (this.selectedDays.length >= this.checkCountLimit)) {          
      this.promptLimitReached();
      currentCheckbox.checked = false;
    } else if(!currentCheckbox.checked){
      currentCheckbox.removeAttribute('class');
      this.selectedDays.splice(this.selectedDays.indexOf(currentCheckbox.id), 1);
    }
  },

  promptLimitReached: function(){
    var lastSelected = this.selectedDays[this.selectedDays.length - 1];
    alert('Only 3 days can be selected.' + 
      '\nYou have already selected ' + this.selectedDays.slice(0, -1).join(', ') + ' and ' + lastSelected);
  },

  addEventListeners: function() {
    var that = this;

    this.noneAction.addEventListener('click', function() {
      if (this.checked) {
        that.uncheckItems();
        this.checked = true;  
      }   
    });

    //delegating all checks to the enclosing section element
    this.checkboxGroup.addEventListener('click', function (e){
      if (e.target.tagName == "INPUT") {
        that.checkItem(e.target);
      }      
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var checkboxGroup = document.getElementById('checkbox-group');
  var noneAction = document.getElementById('none');
  var chkboxOps = new CheckboxOp(checkboxGroup, noneAction, 3);
  chkboxOps.addEventListeners();
  chkboxOps.setup()
});




