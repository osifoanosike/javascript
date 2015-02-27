function CheckBoxOperation(checkboxWrapper){
  this.checkboxWrapper = checkboxWrapper;
  this.colorChildList  = ['red', 'yellow', 'green', 'blue'];
  this.drinksChildList = ['coke', 'pepsi', 'dew'];
  this.bikesChildList = ['V-rod', 'pulsar', 'cbz'];
  this.moviesChildList = ['Dar', 'Sir'];
}

CheckBoxOperation.prototype = {

  createInnerCheckbox: function (parent_item, current_item){
    var li = document.createElement("li");
    var inner_div = document.createElement('div');

    //create checkbox
    var inner_chkbox = document.createElement('input');
    inner_chkbox.setAttribute('type', 'checkbox');
    inner_chkbox.setAttribute('id', parent_item + '_' + current_item);
    inner_chkbox.setAttribute('checked','true');

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

  hideChildList: function (active_item){
    var child_list = active_item.querySelector('li#' + active_item.id + '>ul');
    this.clearState(child_list);
    child_list.setAttribute('hidden', 'true');
  },

  showChildList: function (active_item){
    var child_list = active_item.querySelector('li#' + active_item.id + '>ul');
    this.reselectChldItems(child_list);
    child_list.removeAttribute('hidden');//makes the list visible;
  },

  hasChild: function(active_item){ 
    return (active_item.childElementCount > 1);
  },

  reselectChldItems: function(childList) {
    var childItems = childList.querySelectorAll('input[type=checkbox]')
    for(i = childItems.length; i--;) {
      childItems[i].checked = true;
    }
  },

  clearState: function(childList) {
    var childItems = childList.querySelectorAll('input[type=checkbox]')
    for(var i = childItems.length; i--;) {
      childItems[i].removeAttribute('checked');
    }
  },

  new_childList: function(active_item) {
    switch(active_item.id) {
      case 'color':
        this.createChildList(active_item.id, this.colorChildList);
        break;
      case 'drinks':
        this.createChildList(active_item.id, this.drinksChildList);
        break;
      case 'movies':
        this.createChildList(active_item.id, this.moviesChildList);
        break;
      case 'bikes':
        this.createChildList(active_item.id, this.bikesChildList);
        break;
    }

    new_childList = this.displayChildList(active_item);
  },

  displayChildList: function(active_item){
    console.log(active_item);
    var child_list = active_item.querySelector('li#' + active_item.id + '>ul');
    this.reselectChldItems(child_list);
    child_list.removeAttribute('hidden');//makes the list visible;
  },

  addEventHandler: function() {
    var that = this;
    this.checkboxWrapper.addEventListener('click', function(e) {
      var currentCheckbox = e.target;

      if(currentCheckbox.matches('.parentCheckbox')){
        var active_list = document.body.querySelector('li#' + currentCheckbox.id);
        if (currentCheckbox.checked == true) {
          //checks so i dont have to create a new sublist everytime
          that.new_childList(active_list);
          active_list.lastElementChild.scrollIntoView(true);//srolls into view...just incase
            
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