function DomainMatcher(form){
  this.urlForm = form;
}

DomainMatcher.prototype = {
  extractValues: function(){
      event.preventDefault();
      var urlText = that.urlForm['urlText'].value;
      var regex = /(http:\/\/)?(www\.)?([A-Za-z0-9_\-]{1,}\.)?([A-Za-z0-9_\-]{3,}\.[A-Za-z]{2,3}(\.[A-Za-z]{2})?)/ig;
      var result = regex.exec(urlText);
      console.log(1 + ': ' + result[1]);
      console.log(2 + ': ' + result[2]);
      console.log(3 + ': ' + result[3]);
      console.log(4 + ': ' + result[4]);
      console.log(5 + ': ' + result[5])
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