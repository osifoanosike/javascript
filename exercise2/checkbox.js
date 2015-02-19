function Checkbox(checkboxes_param, select_all, select_none){
  // var that = this;
  this.checkboxes = checkboxes_param;
  this.select_all = select_all;
  this.select_none = select_none;
  that = this;
}

Checkbox.prototype = {
  constructor: Checkbox,
  // console.log(this.checkboxes);
  selectAllItems: function(){
    console.log(that.checkboxes);
    for(var i = 0; i < that.checkboxes.length; i++) {
      if (!that.checkboxes[i].checked) {
        that.checkboxes[i].checked = true;
      }
    }
  },

  unselectAllItems: function() {
    for(var i = 0; i < that.checkboxes.length; i++) {
      that.checkboxes[i].checked = false;
    }
  },

  addEventListeners: function() {
    var _this = this;

    // console.log(this.select_all);
    this.select_all.addEventListener('click', _this.selectAllItems);

    this.select_none.addEventListener('click', _this.unselectAllItems);
  }
}


//this ensures the DOM has loaded before trigegering any events
document.addEventListener('DOMContentLoaded', function() {

  var select_all = document.getElementById('select_all');
  var select_none = document.getElementById('select_none');
  var checkboxes = document.querySelectorAll('input[type=checkbox]');

  // console.log(checkboxes);

  var chkbox = new Checkbox(checkboxes, select_all, select_none);
  chkbox.addEventListeners();
  
});

