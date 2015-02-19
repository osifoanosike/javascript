document.addEventListener('DOMContentLoaded', function() {
  
  var parentChkboxes = document.body.querySelectorAll('input[type=checkbox]');
  var len = parentChkboxes.length, i;
  var active_list = null; 

  for (i = 0; i < len; i++) {
    

    parentChkboxes[i].onclick = function(){
      active_list = document.body.querySelector('li#' + this.id);
      if (this.checked == true){

        //checks so i dont have to create a new sublist everytime
        if (hasChild(active_list)){
          showChildList(active_list);
        }else {

          //only create new sublist for elements that never had
          switch(this.id) {
            case 'color':
              createChildList(this.id, ['red', 'yellow', 'green', 'blue']);
              break;
            case 'drinks':
              createChildList(this.id, ['coke', 'pepsi', 'dew']);
              break;
            case 'movies':
              createChildList(this.id, ['Dar', 'Sir']);
              break;
            case 'bikes':
              createChildList(this.id, ['V-rod', 'pulsar', 'cbz']);
              break;
          }
        }
        active_list.lastElementChild.scrollIntoView(true);//srolls into view...just incase
        
      } else {
        hideChildList(active_list);
      }       
    }
  }
});



function createChildList(active_item, item_array){
  //alert(active_item.id);
  var fragment = document.createDocumentFragment();
  var ul = document.createElement('ul');
  var active_list = document.body.querySelector('li#' + active_item);
  var li_with_content = null;
  

  for(var i = 0; i < item_array.length; i++) {
    li_with_content = createInnerCheckbox(active_item, item_array[i])
    fragment.appendChild(li_with_content);
  }

  ul.appendChild(fragment);
  
  active_list.appendChild(ul);
}

function createInnerCheckbox(parent_item, current_item){
  
  var inner_div = null;
  var inner_chkbox = null;
  var inner_label = null;
  var li = null;

  li = document.createElement("li");
    inner_div = document.createElement('div');

    //create checkbox
    inner_chkbox = document.createElement('input');
    inner_chkbox.setAttribute('type', 'checkbox');
    inner_chkbox.setAttribute('id', parent_item + '_' + current_item);

    //create labels for checkbox
    inner_label = document.createElement('label');
    inner_label.setAttribute('for', parent_item + '_' + current_item);
    inner_label.appendChild(document.createTextNode(current_item))

    inner_div.appendChild(inner_chkbox);  
    inner_div.appendChild(inner_label); 
    li.appendChild(inner_div);

    return li;
}

function hideChildList(active_item){
  var child_list = active_item.querySelector('li#' + active_item.id + '>ul');
  child_list.setAttribute('hidden', 'true');
}

function showChildList(active_item){
  var child_list = active_item.querySelector('li#' + active_item.id + '>ul');
  child_list.removeAttribute('hidden');//makes the list visible;
}

function hasChild(active_item){
  return (active_item.childElementCount > 1);
}



