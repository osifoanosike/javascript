document.addEventListener('DOMContentLoaded', function() {

  var checkBoxes = document.body.querySelectorAll('input[type=checkbox]'), i;
  var len = checkBoxes.length;
  var selectedDays = [];

  var noneAction = document.getElementById('none');

  for( i = 0; i < len; i++ ) {
    checkBoxes[i].addEventListener("click", function(){
      if(this.id != 'none') {
        if(selectedDays.length < 3 && this.checked == true){
          
          selectedDays.push(this.id.toString());

          //deselects the none chkbox
          noneAction.checked = false
        
        } else if (selectedDays.length >= 3 && this.checked == true) {
          
          //if array is full and user still tries to add
          this.checked = false;
          alert('Only 3 days can be selected.' + 
            '\nYou have already selected ' + selectedDays[0] + ', ' + selectedDays[1] + ' and ' + selectedDays[2]);
        
        } else if(this.checked == false){

          //if the user unchecks...even if array is full
          selectedDays.splice(selectedDays.indexOf(this.id), 1);
        }
      }   
    });
  }

  noneAction.addEventListener('click', function() {
    for( i = 0; i < checkBoxes.length; i++ ) {
      checkBoxes[i].checked = false;  
    }
    
    this.checked = true;
    selectedDays = [];
  });
});



