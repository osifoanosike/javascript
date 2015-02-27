function DomainMatcher(form){
  this.urlForm = form;
}

DomainMatcher.prototype = {
  extractValues: function(){
      event.preventDefault();
      var urlText = that.urlForm['urlText'].value;
      var regex = /([A-Za-z0-9_\-]{1,}\.)?([A-Za-z0-9_\-]{1,}\.[A-Za-z]{2,3})/ig;
      result = regex.exec(urlText);

      alert('Domain: ' +  result[2]);
      if(result[1] != undefined) {
        alert('Subdomain: ' +  result[1].slice(0, -1));//removes the trailing dot
      }
  },

  addEventHandlers: function(){
    that = this;
    that.urlForm.addEventListener('submit', function(){
      event.preventDefault();
      var urlText = that.urlForm['urlText'].value;
      var regex = /([A-Za-z0-9_\-]{1,}\.)?([A-Za-z0-9_\-]{1,}\.[A-Za-z]{2,3})/ig;
      result = regex.exec(urlText);
      
      alert('Domain: ' +  result[2]);
      if(result[1] != undefined) {
        alert('Subdomain: ' +  result[1].slice(0, -1));//removes the trailing dot
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', function(){
  var form = document.getElementById('urlForm');
  var matcher = new DomainMatcher(form);
  matcher.addEventHandlers();

});