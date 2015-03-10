function Checkboxes(checkboxGroup, none_checkbox, checkLimit){
  this.checkboxGroup = checkboxGroup;
  this.none_checkbox = none_checkbox;
  this.selectedcheckboxes = [];
  this.checkCountLimit = checkLimit;
}


Checkboxes.prototype = {

  setup: function() {
    this.none_checkbox.checked = true;
  },

  uncheckItems: function() {
    var checkedItems = this.checkboxGroup.querySelectorAll(':checked');
    for( i = checkedItems.length; i--; ) {
      checkedItems[i].checked = false; 
    }
    this.selectedcheckboxes = [];
  },

  checkItem: function(currentCheckbox){
    this.none_checkbox.checked = false;
    if(currentCheckbox.checked){
      if(this.selectedcheckboxes.length < this.checkCountLimit){         
          this.selectedcheckboxes.push(currentCheckbox.id);
      } else if(this.selectedcheckboxes.length >= this.checkCountLimit) {          
        this.alertOverflow();
        currentCheckbox.checked = false;
      }
    }
    else {
      this.selectedcheckboxes.splice(this.selectedcheckboxes.indexOf(currentCheckbox.id), 1);
    }
  },

  alertOverflow: function(){
    var lastSelected = this.selectedcheckboxes[this.selectedcheckboxes.length - 1];
    alert('Only 3 days can be selected.' + 
      '\nYou have already selected ' + this.selectedcheckboxes.slice(0, -1).join(', ') + ' and ' + lastSelected);
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
  var checkboxes = new Checkboxes(checkboxGroup, none_checkbox, 3);
  checkboxes.addEventListeners();
  checkboxes.setup()
});




