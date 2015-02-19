var count = 0;

document.addEventListener('DOMContentLoaded', function(){

  var table = document.getElementById('tableX');
  var fragment = document.createDocumentFragment();
  var newRowbtn = document.getElementById('new_row_btn');
  

  var rowHolder= null
  tbody  = document.createElement('tbody');

  newRowbtn.addEventListener('click', function(){
    rowHolder = tbody.insertRow(0);//this adds a new row
    tbody.rows[0].setAttribute('id', 'row ' + count);
    tbody.rows[0].insertCell(0);
    tbody.rows[0].cells[0].appendChild(createNameField(count));

    tbody.rows[0].insertCell(1);
    tbody.rows[0].cells[1].appendChild(createEmailField(count));

    tbody.rows[0].insertCell(2);
    tbody.rows[0].cells[2].appendChild(createAction(count));

    console.log(rowHolder.outerHTML);
    table.appendChild(rowHolder);
    count++;
  });

  var i;
  var saveBtns = document.querySelectorAll('input.save');
  // alert(saveBtns.count);
  
  for(i = 0; i < count; i++) {
    saveBtns[i].addEventListener('click', function(){
      alert(this.id);
    })
  }
});

function createNameField(count) {
  var nameField = document.createElement('input');
  nameField.setAttribute('type', 'text');
  nameField.setAttribute('placeholder', 'Enter name');
  nameField.setAttribute('id', 'name_' + count );

  return nameField;
}


function createEmailField(count) {
  var emailField = document.createElement('input');
  emailField.setAttribute('type', 'email');
  emailField.setAttribute('placeholder', 'Enter email');
  emailField.setAttribute('id', 'email_' + count );
  return emailField;
}

function createAction(count) {
  var saveField = document.createElement('input');
  saveField.setAttribute('type', 'submit');
  saveField.setAttribute('value', 'Save');
  saveField.setAttribute('class', 'save_' + count );

  return saveField;
}


function saveContent() {
  
}
