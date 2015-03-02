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
      to_list.add(selected_options[i]);//adds
    }
  },


  addEventHandlers: function() {
    that = this;
    that.addButton.addEventListener('click', function(){
      var selectedList = that.countryListA;//list on which the selection happens
      that.moveCountries(selectedList, that.countryListB, that.getSelectedOptions(selectedList));
    });

    that.removeButton.addEventListener('click', function(){
      var selectedList = that.countryListB; //list on which the selection happens
      that.moveCountries(selectedList, that.countryListA, that.getSelectedOptions(selectedList));
    });
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