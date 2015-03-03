function CheckBoxOperation(checkboxWrapper){
  this.checkboxWrapper = checkboxWrapper;
  this.childList = { color: ['red', 'yellow', 'green', 'blue'], drinks: ['coke', 'pepsi', 'dew'], 
    bikes: ['V-rod', 'pulsar', 'cbz'], movies: ['Dar', 'Sir'] }
}

CheckBoxOperation.prototype = {

  createInnerCheckbox: function (parent_item, current_item){
    var li = document.createElement("li");
    var inner_div = document.createElement('div');

    //create checkbox
    var inner_chkbox = document.createElement('input');
    inner_chkbox.setAttribute('type', 'checkbox');
    inner_chkbox.setAttribute('id', parent_item + '_' + current_item);

    //create labels for checkbox
    var inner_label = document.createElement('label');
    inner_label.setAttribute('for', parent_item + '_' + current_item);
    inner_label.appendChild(document.createTextNode(current_item))

    inner_div.appendChild(inner_chkbox);  
    inner_div.appendChild(inner_label); 
    li.appendChild(inner_div);

    return li;
  },

  createChildList: function (active_item, item_array){

    var fragment = document.createDocumentFragment();
    var ul = document.createElement('ul');
    var active_list = document.body.querySelector('li#' + active_item);    

    for(var i = item_array.length; i--;) {
      fragment.appendChild(this.createInnerCheckbox(active_item, item_array[i]));
    }
    ul.appendChild(fragment); 
    active_list.appendChild(ul);
  },

  hideChildList: function (inactive_item){
    var child_list = inactive_item.querySelector('li#' + inactive_item.id + '>ul');
    this.clearState(child_list);
    child_list.setAttribute('hidden', 'true');
    this.unselectChldItems(child_list);
  },

  showChildList: function (active_item){
    //checks so i dont have to create a new sublist everytime
    if(this.hasChild(active_item)) {
      this.showExistinghildList(active_item);
    } else {
      this.showNewChildList(active_item);
    }        
    active_item.lastElementChild.scrollIntoView(true);//srolls into view...just incase
  },

  hasChild: function(active_item){ 
    return (active_item.childElementCount > 1);
  },

  unselectChldItems: function(childList) {
    var childItems = childList.querySelectorAll('input[type=checkbox]')
    for(i = childItems.length; i--;) {
      childItems[i].checked = false;
    }
  },

  clearState: function(childList) {
    var childItems = childList.querySelectorAll('input[type=checkbox]')
    for(var i = childItems.length; i--;) {
      childItems[i].removeAttribute('checked');
    }
  },

  showNewChildList: function(active_item) {
    this.createChildList(active_item.id, this.childList[active_item.id]);
  },

  showExistinghildList: function(active_item){
    var child_list = active_item.querySelector('li#' + active_item.id + '>ul');
    child_list.removeAttribute('hidden');//makes the list visible;
  },

  addEventHandler: function() {
    var that = this;
    this.checkboxWrapper.addEventListener('click', function(e) {
      var currentCheckbox = e.target;

      if(currentCheckbox.matches('.parentCheckbox')){
        var active_list = document.body.querySelector('li#' + currentCheckbox.id);
        if (currentCheckbox.checked == true) {
          that.showChildList(active_list);
        } else {
          that.hideChildList(active_list);
        }       
      }
    });//optimization by event delegation
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var checkboxWrapper = document.getElementById('wrapper');
  var checkboxOps = new CheckBoxOperation(checkboxWrapper);
  checkboxOps.addEventHandler();  
});