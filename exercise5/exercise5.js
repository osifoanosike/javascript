function Table(addRowButton){
  this.rowCount = 0;
  this.addRowButton = addRowButton;
  this.saveBtns = document.querySelectorAll('input.save');;//initialize the save buttons 
  this.table = document.getElementById('tableX');
  this.newRowbtn = document.querySelector('button#new_row_btn');
  
  this.tbody = document.createElement('tbody');
  this.table.appendChild(this.tbody);
  that = this;
}

Table.prototype = {

  constructor: Table,

  createNameField: function(count) {
    var nameField = document.createElement('input');
    nameField.setAttribute('type', 'text');
    nameField.setAttribute('placeholder', 'Enter name');
    nameField.setAttribute('class', 'name row_' + count);

    return nameField;
  },

  createEmailField: function(count) {
    var emailField = document.createElement('input');
    emailField.setAttribute('type', 'email');
    emailField.setAttribute('pattern', 'email');
    emailField.setAttribute('placeholder', 'Enter email');
    emailField.setAttribute('class', 'email row_' + count );
    return emailField;
  },

  createEmailLabel: function(row_id, content) {
    var emailLabel = document.createElement('label');
    emailLabel.setAttribute('class', 'email row_' + row_id );
    emailLabel.appendChild(document.createTextNode(content));
    return emailLabel;
  },

  createNameLabel: function(row_id, content) {
    var nameLabel = document.createElement('label');
    nameLabel.setAttribute('class', 'name row_' + row_id );
    nameLabel.appendChild(document.createTextNode(content));
    return nameLabel;
  },

  createSaveButton: function(count) {
    var saveField = document.createElement('input');
    saveField.setAttribute('type', 'submit');
    saveField.setAttribute('value', 'Save');
    saveField.setAttribute('class', 'save row_' + count );

    saveField.addEventListener('click', that.performSave);

    return saveField;
  },

  createEditLink: function(count){
    var editLink = document.createElement('a');
    editLink.setAttribute('href', '#');
    editLink.setAttribute('class', 'edit row_' + count );
    editLink.appendChild(document.createTextNode('Edit'));
    editLink.addEventListener('click', that.performEdit);
    
    return editLink
  },

  createDeleteLink: function(count) {
    var deleteLink = document.createElement('a');
    deleteLink.setAttribute('href', '#');

    /**count -1 because the count ws incremented after row was 
    initialiiy created, since the delete/edit are created after, 
    i need to -1 to get to the actual index*/
    deleteLink.setAttribute('class', 'delete row_' + count );
    deleteLink.appendChild(document.createTextNode('Delete'));
    deleteLink.addEventListener('click', that.performDelete);

    return deleteLink;
  },

  createRow: function(){
    
    var activeRow = that.tbody.insertRow(0);//this adds a new row
    activeRow.setAttribute('id', 'row_' + that.rowCount);
    activeRow.insertCell(0);
    activeRow.cells[0].appendChild(that.createNameField(that.rowCount));

    activeRow.insertCell(1);
    activeRow.cells[1].appendChild(that.createEmailField(that.rowCount));

    activeRow.insertCell(2);
    activeRow.cells[2].appendChild(that.createSaveButton(that.rowCount));

    console.log(activeRow);
    that.tbody.appendChild(activeRow); 
    that.rowCount++;
  },

  performSave: function() {

    var rowID = this.classList[1];
    var currentRowCount = rowID.split('_')[1];

    //get the tr to be manipulated
    var currentRow = document.body.querySelector('tr#' + rowID);

    //the values in the input fields into a label for a later use.
    var nameField = currentRow.querySelector('td input.name.' + rowID);
    var emailField = currentRow.querySelector('td input.email.' + rowID);
    
    
    if (that.isValidInput(nameField.value, emailField.value)) {

      //create a label and set the stored values as the text prop
      nameField.parentNode.replaceChild(that.createNameLabel(currentRowCount, nameField.value), nameField);
      emailField.parentNode.replaceChild(that.createEmailLabel(currentRowCount, emailField.value), emailField);
      
      //create a fregment to hold edit and delete links...before insertion to DOM
      var actionsFragment = document.createDocumentFragment();
      actionsFragment.appendChild(that.createEditLink(currentRowCount));
      actionsFragment.appendChild(document.createTextNode(' | '));
      actionsFragment.appendChild(that.createDeleteLink(currentRowCount));
      this.parentNode.replaceChild(actionsFragment, this);

    } else {
      alert("Please ensure both fields have valid input");
    } 
  },

  performEdit: function(){

    //use the current rowCount id to maintain target during row manipulation
    var rowID = this.classList[1];
    var currentRowCount = rowID.split('_')[1];
   
    var currentRow = document.body.querySelector('tr#' + rowID);

    // store the values in the labels, for editinh purpose
    var nameValue = currentRow.querySelector('td label.name.' + rowID).innerHTML;
    var emailValue = currentRow.querySelector('td label.email.' + rowID).innerHTML;
    
    //create input fields and set their values to the stored labels values
    var nameField = that.createNameField(currentRowCount);
    var emailField = that.createEmailField(currentRowCount);
    nameField.setAttribute('value', nameValue);
    emailField.setAttribute('value', emailValue);

    //replace labels with input fields
    currentRow.cells[0].replaceChild(nameField, currentRow.cells[0].firstChild);
    currentRow.cells[1].replaceChild(emailField, currentRow.cells[1].firstChild);

    //remove all the children elements and replace with save button
    while (currentRow.cells[2].firstChild) {
      currentRow.cells[2].removeChild(currentRow.cells[2].firstChild);
    }
    currentRow.cells[2].appendChild(that.createSaveButton(currentRowCount));
  },

  performDelete: function() {
    currentRow = document.querySelector('tr#'+ this.classList[1]);
    currentRow.remove();
  },

  addEventHandlers: function() {
    this.addRowButton.addEventListener('click', that.createRow);
  },

  isValidInput: function(name, email) {
    if(!email || !name) {
      return false;
    }
    return true;
  }
}

document.addEventListener('DOMContentLoaded', function(){
  var newRowbtn = document.getElementById('new_row_btn');
  var tableObj = new Table(newRowbtn);
  tableObj.addEventHandlers();
});