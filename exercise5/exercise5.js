function Table(doc){
  this.rowCount = 0;
  this.doc = doc
  
  this.saveBtns = this.doc.querySelectorAll('input.save');
  this.table = this.doc.getElementById('tableX');
  this.newRowbtn = this.doc.querySelector('button#new_row_btn');
}


Table.prototype = {

  constructor: Table,

  createNameField: function(count) {
    var nameField = this.doc.createElement('input');
    nameField.setAttribute('type', 'text');
    nameField.setAttribute('placeholder', 'Enter name');
    nameField.setAttribute('id', 'name_' + count );

    return nameField;
  },

  createEmailField: function(count) {
    var emailField = this.doc.createElement('input');
    emailField.setAttribute('type', 'email');
    emailField.setAttribute('placeholder', 'Enter email');
    emailField.setAttribute('id', 'email_' + count );
    return emailField;
  },

  createActionButton: function(count) {
    var saveField = this.doc.createElement('input');
    saveField.setAttribute('type', 'submit');
    saveField.setAttribute('value', 'Save');
    saveField.setAttribute('class', 'save_' + count );
    return saveField;
  },

  createRow: function(){
    console.log(this);
    tbody = this.doc.createElement('tbody');
    tbody.insertRow(0);//this adds a new row
    tbody.rows[0].setAttribute('id', 'row ' + this.rowCount);
    tbody.rows[0].insertCell(0);
    tbody.rows[0].cells[0].appendChild(this.createNameField(this.rowCount));

    tbody.rows[0].insertCell(1);
    tbody.rows[0].cells[1].appendChild(this.createEmailField(this.rowCount));

    tbody.rows[0].insertCell(2);
    tbody.rows[0].cells[2].appendChild(this.createAction(this.rowCount));

    console.log(rowHolder.outerHTML);
    this.table.appendChild(rowHolder);
    rowCount++;
  },

  setup: function(){

    var newRowbtn = this.doc.getElementById('new_row_btn');
    
    // for(i = 0; i < count; i++) {
    //   this.saveBtns[i].addEventListener('click', function(){
    //     alert(this.id);
    //   });
    // }
  },

  test: function(){
    alert("this is just a test");
  }

}


document.addEventListener('DOMContentLoaded', function(){
  // alert("window loaded " + event.eventPhase);
  this = document
  var tableObj = new Table(document);

  tableObj.newRowbtn.onclick = tableObj.createRow;
  // alert(tableObj);
  console.log(tableObj.newRowbtn);
  // tableObj.test;

});


