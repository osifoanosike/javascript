function CheckboxHandler(checkboxes, checkbox_all, checkbox_none){
  this.checkboxes = checkboxes;
  this.checkbox_all = checkbox_all;
  this.checkbox_none = checkbox_none;
  that = this;
}

CheckboxHandler.prototype = {
  selectAllItems: function(){
    that.setCheckedState(true);
  },

  unselectAllItems: function() {
    that.setCheckedState(false);
  },

  setCheckedState: function(state) {
    for(var i = 0; i < that.checkboxes.length; i++) {
      that.checkboxes[i].checked = state;
    }
  },

  addEventHandlers: function() {
    var _this = this;
    this.checkbox_all.addEventListener('click', _this.setCheckedState);
    this.checkbox_none.addEventListener('click', _this.unselectAllItems);
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

