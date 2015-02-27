function CheckboxHandler(checkboxes, checkbox_all, checkbox_none){
  this.checkboxes = checkboxes;
  this.checkbox_all = checkbox_all;
  this.checkbox_none = checkbox_none;
}

CheckboxHandler.prototype = {
  selectAllItems: function(){
    this.setCheckedState(true);
  },

  unselectAllItems: function() {
    this.setCheckedState(false);
  },

  setCheckedState: function(state) {
    //decrementing loop for optimization
    for(var i = this.checkboxes.length; i--;) {
      this.checkboxes[i].checked = state;
    }
  },

  addEventHandlers: function() {
    var that = this;
    this.checkbox_all.addEventListener('click', function() {
      //decrementing loop for optimization
      that.setCheckedState(true);
    });

    this.checkbox_none.addEventListener('click', function() {
      that.setCheckedState(false);
    });
  }
}


//this ensures the DOM has loaded before trigegering any events
document.addEventListener('DOMContentLoaded', function() {
  var checkbox_all = document.getElementById('select_all');
  var checkbox_none = document.getElementById('select_none');
  var checkboxes = document.querySelectorAll('input[type=checkbox]');
  var chkbox = new CheckboxHandler(checkboxes, checkbox_all, checkbox_none);
  chkbox.addEventHandlers(); 
});

