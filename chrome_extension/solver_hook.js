const isFirefox = !chrome.app;

if (!isFirefox){
   var browser = chrome
}

function hashCode(s) {
   for (var h = 0, i = 0; i < s.length; h &= h)
     h = 31 * h + s.charCodeAt(i++);
   return h;
 }

 window.addEventListener("message", (event) => {
   console.log(event)
   browser.runtime.sendMessage('okfamjgfjoglnngnckjddmemjkgnedlf', event.data);
 }, false);
 
(function () {
   console.log("FUT SBCSolver Extension connected");
   browser.runtime.onMessage.addListener(
      function (request, sender, sendResponse) {
         if (request.message_type == 'CHALLENGE_SQUAD'){
            sessionStorage.setItem('CHALLENGE_SQUAD', request.data);
         } 

         if (request.message_type == 'CLUB_PLAYERS'){
            data_to_save = {
               'club_players': JSON.parse(request.data),
               'timestamp': Date.now(),
               'id': hashCode(request.data) + ""
            }
            sessionStorage.setItem('CLUB_PLAYERS', JSON.stringify(data_to_save));
         }
      }
   );
})();
