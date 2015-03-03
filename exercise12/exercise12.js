function DomainMatcher(form){
  this.urlForm = form;
}

DomainMatcher.prototype = {
  extractValues: function(){
      event.preventDefault();
      var urlText = that.urlForm['urlText'].value;

      var regex = /((ft|htt)p:\/\/)?(www\.)?((([a-z\d]+[_\-]?)+\.)*)(([a-z\d]+[_\-]?)+(\.[a-z]{2,3}){1,2})/;
         var result = regex.exec(urlText);
      if(regex.test(urlText)) {
        if(result[4] != undefined) {
          alert('Domain: ' +  result[8] + '\nSubdomain: ' +  result[4].slice(0,-1));//removes the trailing dot
        }
        else {
          alert('Domain: ' +  result[8]);
        }
      }
      else{
        alert('The URL you entered is invalid');
      }
  },

  addEventHandlers: function(){
    that = this;
    that.urlForm.addEventListener('submit', function(){
      event.preventDefault();
      that.extractValues();
    });
  }
}

document.addEventListener('DOMContentLoaded', function(){
  var form = document.getElementById('urlForm');
  var matcher = new DomainMatcher(form);
  matcher.addEventHandlers();

});