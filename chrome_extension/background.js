const isFirefox = !chrome.app;

if (!isFirefox) {
   var browser = chrome
}

browser.webRequest.onBeforeRequest.addListener(function (details) {
   if (details.url.includes('https://www.ea.com/static/media/sbc_optimization_engine_bg')) {
      return { redirectUrl: chrome.runtime.getURL('react_app/static/media/sbc_optimization_engine_bg.ac0f27d744893a0b22fb.wasm') };
   }

   if (details.url == chrome.runtime.getURL('static/media/sbc_optimization_engine_bg.ac0f27d744893a0b22fb.wasm')) {
      return { redirectUrl: chrome.runtime.getURL('react_app/static/media/sbc_optimization_engine_bg.ac0f27d744893a0b22fb.wasm') };
   }
}, {
   urls: [], // or <all_urls>
}, [
   'blocking'
]);

browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
   console.log(request);

   if (request.message_type === undefined){
      const worker = new Worker(chrome.runtime.getURL('react_app/static/js/solver_worker.e85cee74.worker.js'));
      worker.addEventListener("message", (e) => {
      console.log(e.data);
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
         browser.tabs.sendMessage(tabs[0].id, e.data);
       });
       });
      worker.postMessage(request);
   }else{
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
         browser.tabs.sendMessage(tabs[0].id, request);
      });
   }

   return true;
   // const worker = new Worker('chrome-extension://omlekhjglofjckemaepjmfepfeeknjld/react_app/static/js/solver_worker.cc1341f4.worker.js');
   // worker.addEventListener("message", (e) => {
   //    const { solverResult } = e.data
   //    this.setAlertOpen('success', true)
   //    this.props.dispatch(solverSlice.actions.setSolverResult(solverResult));
   //  });

   //  worker.postMessage({
   //    challenge: challenge,
   //    clubPlayerCards: clubPlayers?.club_players_cards.filter(
   //      player_card => !ignoredClubPlayerCardsIds.includes(player_card.asset_id
   //      )),
   //    solverConfig: solverConfig
   //  });
});
