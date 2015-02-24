function CountryChooser(countryListA, countryListB, addButton, removeButton){
  this.countryListA = countryListA;
  this.countryListB = countryListB;
  this.addButton = addButton;
  this.removeButton = removeButton
  that = this;

}

CountryChooser.prototype = {
  getSelectedOptions: function(selectedBox) {
    var result = [];
    var options = null;

    for (i = 0; i < selectedBox.options.length; i++) {
      option = selectedBox.options[i];
      if(option.selected){
        result.push(option);
      }
    }

    return result;
  },

  moveCountries: function(from_list, to_list, selected_options) {
    for(i = 0; i < selected_options.length; i++) {
      from_list.remove(selected_options[i].index);//removes
      to_list.add(selected_options[i], undefined);//adds
    }
  },

  remove: function(){
    var primaryList = that.countryListB; //list on which the selection happens
    that.moveCountries(primaryList, that.countryListA, that.getSelectedOptions(primaryList));
  },

  add: function(){
    var primaryList = that.countryListA;//list on which the selection happens
    that.moveCountries(primaryList, that.countryListB, that.getSelectedOptions(primaryList));
  },

  addEventHandlers: function() {
    that.addButton.addEventListener('click', that.add);
    that.removeButton.addEventListener('click', that.remove);
  }
}

document.addEventListener('DOMContentLoaded', function(){
  var countryListA = document.getElementById('countries_A');
  var countryListB = document.getElementById('countries_B');

  var addButton = document.getElementById('addBtn');
  var removeButton = document.getElementById('removeBtn');

  var countryChooser = new CountryChooser(countryListA, countryListB, addButton, removeButton);
  countryChooser.addEventHandlers();
});