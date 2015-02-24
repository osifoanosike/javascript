
function UrlLoader(){
  that = this;
}

UrlLoader.prototype = {
  isValidUrl: function(url){
    if(!url) {
      alert('Invalid input entered.');
      return false;
    }
    else{ return true; }
  },

  loadUrl: function(url){
    url = prompt("please enter a url");
    if(that.isValidUrl(url)){
      //trim url and open i new frame.
      if(url.indexOf('http://') == -1){
        url  = 'http://' + url;
      }

      window.open(encodeURI(url), "newframe",
       "height=450,width=400,menubar=no,toolbar=no,scrollbars=no,location=no,status=no,resizable=no");
    }
  }
}

document.addEventListener('DOMContentLoaded', function(){
  var urlLoader = new UrlLoader();
  urlLoader.loadUrl();
});

