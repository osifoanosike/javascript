function CheckboxHandler(checkboxGroup, none_checkbox, checkLimit){
  this.checkboxGroup = checkboxGroup;
  this.none_checkbox = none_checkbox;
  this.selectedDays = [];
  this.checkCountLimit = checkLimit;
}


CheckboxHandler.prototype = {

  setup: function() {
    this.none_checkbox.checked = true;
  },

  uncheckItems: function() {
    var checkedItems = this.checkboxGroup.querySelectorAll(':checked');
    for( i = checkedItems.length; i--; ) {
      checkedItems[i].checked = false; 
    }
    this.selectedDays = [];
  },

  checkItem: function(currentCheckbox){
    this.none_checkbox.checked = false;
    if(currentCheckbox.checked){
      if(this.selectedDays.length < this.checkCountLimit){         
          this.selectedDays.push(currentCheckbox.id);
      } else if(this.selectedDays.length >= this.checkCountLimit) {          
        this.promptLimitReached();
        currentCheckbox.checked = false;
      }
    }
    else {
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

    this.none_checkbox.addEventListener('click', function() {
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
  var none_checkbox = document.getElementById('none');
  var checkboxHandler = new CheckboxHandler(checkboxGroup, none_checkbox, 3);
  checkboxHandler.addEventListeners();
  checkboxHandler.setup()
});




