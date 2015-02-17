//this ensures the DOM has loaded before trigegering any events
document.addEventListener("DOMContentLoaded", function(){

  var select_all = document.getElementById("select_all");
  var select_none = document.getElementById("select_none");
  var checkboxes = document.querySelectorAll('input[type=checkbox]');

  select_all.onclick = function(e) {
    e.preventDefault();
    selectAllItems();
  };

  select_none.onclick = function(e) {
    e.preventDefault();
    unselectAllItems();
  };

  function selectAllItems(){
    for(var i = 0; i < checkboxes.length; i++) {
      if (!checkboxes[i].checked) {
        checkboxes[i].checked = true;
      }
    }
  }

  function unselectAllItems() {
    for(var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
  }
});

