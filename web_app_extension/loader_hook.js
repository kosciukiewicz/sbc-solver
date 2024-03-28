'use strict';

const isFirefox = !chrome.app;

if (!isFirefox){
   var browser = chrome
}

window.addEventListener("message", (event) => {
   console.log(event)
   browser.runtime.sendMessage('ojllodkjofepcnfdlhcdajklpaalfgpp', event.data);
 }, false);


(function () {
   var s = document.createElement('script');

   s.src = chrome.extension.getURL('hook.js');

   s.onload = function () { this.remove() };

   (document.head || document.documentElement).appendChild(s);
   console.log("FUT SBCSolver Extension connected");
})();