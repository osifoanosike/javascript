function Table(addRowButton){
  this.rowCount = 0;
  this.addRowButton = addRowButton;
  this.saveBtns = document.querySelectorAll('input.save');;//initialize the save buttons 
  this.table = document.getElementById('tableX');
  this.newRowbtn = document.querySelector('button#new_row_btn'); 
  this.tbody = document.createElement('tbody');
  this.table.appendChild(this.tbody);
}

Table.prototype = {
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

  performSave: function(rowID, saveButton){
    var currentRowCount = rowID.split('_')[1];

    //get the tr to be manipulated
    var currentRow = document.body.querySelector('tr#' + rowID);

    //the values in the input fields into a label for a later use.
    var nameField = currentRow.querySelector('td input.name.' + rowID);
    var emailField = currentRow.querySelector('td input.email.' + rowID);  
    
    if (this.isValidInput(nameField.value, emailField.value)) {

      //create a label and set the stored values as the text prop
      nameField.parentNode.replaceChild(this.createNameLabel(currentRowCount, nameField.value), nameField);
      emailField.parentNode.replaceChild(this.createEmailLabel(currentRowCount, emailField.value), emailField);
        
      //create a fregment to hold edit and delete links...before insertion to DOM
      var actionsFragment = document.createDocumentFragment();
      actionsFragment.appendChild(this.createEditLink(currentRowCount));
      actionsFragment.appendChild(document.createTextNode(' | '));
      actionsFragment.appendChild(this.createDeleteLink(currentRowCount));
      saveButton.parentNode.replaceChild(actionsFragment, saveButton);
    } else {
       alert("Please ensure both fields have valid input");
    } 
  },

  createSaveButton: function(count) {
    var saveField = document.createElement('input'),that = this;
    saveField.setAttribute('type', 'submit');
    saveField.setAttribute('value', 'Save');
    saveField.setAttribute('class', 'save row_' + count );

    saveField.addEventListener('click', function() {
      var rowID = this.classList[1];
      that.performSave(rowID, this)
    });

    return saveField;
  },

  performEdit: function(rowID) {
    var currentRowCount = rowID.split('_')[1];    
    var currentRow = document.body.querySelector('tr#' + rowID);

    // store the label values, for editing purpose
    var nameValue = currentRow.querySelector('td label.name.' + rowID).innerHTML;
    var emailValue = currentRow.querySelector('td label.email.' + rowID).innerHTML;
      
    //create input fields and set their values to the stored labels values
    var nameField = this.createNameField(currentRowCount);
    var emailField = this.createEmailField(currentRowCount);
    nameField.setAttribute('value', nameValue);
    emailField.setAttribute('value', emailValue);

    //replace labels with input fields
    currentRow.cells[0].replaceChild(nameField, currentRow.cells[0].firstChild);
    currentRow.cells[1].replaceChild(emailField, currentRow.cells[1].firstChild);

    //remove all the children elements and replace with save button
    while (currentRow.cells[2].firstChild) {
      currentRow.cells[2].removeChild(currentRow.cells[2].firstChild);
    }
    currentRow.cells[2].appendChild(this.createSaveButton(currentRowCount));
  },

  createEditLink: function(count){
    var editLink = document.createElement('a'), that = this;
    editLink.setAttribute('href', '#');
    editLink.setAttribute('class', 'edit row_' + count );
    editLink.appendChild(document.createTextNode('Edit'));


    editLink.addEventListener('click', function(){
      
      //use the current rowCount id to maintain target during row manipulation
      var rowID = this.classList[1];
      that.performEdit(rowID);
    });
    
    return editLink
  },

  createDeleteLink: function(count) {
    var deleteLink = document.createElement('a'), that = this;
    deleteLink.setAttribute('href', '#');
    deleteLink.setAttribute('class', 'delete row_' + count );
    deleteLink.appendChild(document.createTextNode('Delete'));

    deleteLink.addEventListener('click', function() {
      currentRow = document.querySelector('tr#'+ this.classList[1]);
      currentRow.remove();
    });

    return deleteLink;
  },

  performDelete: function() {
    currentRow = document.querySelector('tr#'+ this.classList[1]);
    currentRow.remove();
  },  

  isValidInput: function(name, email) {
    if(!email || !name) {
      return false;
    }
    return true;
  },

  createRow: function() {
    var activeRow = this.tbody.insertRow(0);//this adds a new row
    activeRow.setAttribute('id', 'row_' + this.rowCount);
    activeRow.insertCell(0);
    activeRow.cells[0].appendChild(this.createNameField(this.rowCount));

    activeRow.insertCell(1);
    activeRow.cells[1].appendChild(this.createEmailField(this.rowCount));

    activeRow.insertCell(2);
    activeRow.cells[2].appendChild(this.createSaveButton(this.rowCount));

    this.tbody.appendChild(activeRow); 
    this.rowCount++;
  },

  addEventHandlers: function() {
    var that = this;
    this.addRowButton.addEventListener('click', function() {
      that.createRow();
    });
  }
}

document.addEventListener('DOMContentLoaded', function(){
  var newRowbtn = document.getElementById('new_row_btn');
  var tableObj = new Table(newRowbtn);
  tableObj.addEventHandlers();
});