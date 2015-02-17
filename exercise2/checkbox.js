//this ensures the DOM has loaded before trigegering any events
document.addEventListener("DOMContentLoaded", function(e){

  var select_all = document.getElementById("select_all");
  var select_none = document.getElementById("select_none");
  var checkboxes = document.getElementsByClassName("chkbox")

  select_all.onclick = function() {
    selectAll();
  };

  select_none.onclick = function() {
    unselectAll();
  };

  function selectAllItems(){
    for(var i = 0; i < checkboxes.length; i++) {
      if (!checkboxes[i].checked) {
        checkboxes[i].checked = true;
      }
    }
  };

  function unselectAllItems() {
    for(var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
  };
});

