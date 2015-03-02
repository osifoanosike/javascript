function DomainMatcher(form){
  this.urlForm = form;
}

DomainMatcher.prototype = {
  extractValues: function(){
      event.preventDefault();
      var urlText = that.urlForm['urlText'].value;
      var regex = /(http:\/\/)?(www\.)?([A-Za-z0-9_\-]{1,}\.)?([A-Za-z0-9_\-]{3,}\.[A-Za-z]{2,3}(\.[A-Za-z]{2})?)/ig;
      var result = regex.exec(urlText);

      if(result[3] != undefined) {
        alert('Domain: ' +  result[4] + '\nSubdomain: ' +  result[3].slice(0, -1));//removes the trailing dot
      }
      else {
        alert('Domain: ' +  result[4]);
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