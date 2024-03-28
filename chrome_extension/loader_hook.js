'use strict';

const isFirefox = !chrome.app;

if (!isFirefox){
   var browser = chrome
}

const delay = ms => new Promise(res => setTimeout(res, ms));

function triggerMouseEvent (node, eventType) {
   var clickEvent = document.createEvent ('MouseEvents');
   clickEvent.initEvent (eventType, true, true);
   node.dispatchEvent (clickEvent);
}

function clickOnElement(slot_element) {
   triggerMouseEvent (slot_element, "mouseover");
   triggerMouseEvent (slot_element, "mousedown");
   triggerMouseEvent (slot_element, "mouseup");
   triggerMouseEvent (slot_element, "click");
}

function getSingleElementByXpath(xpath){
   return document.evaluate(
      xpath,
      document, 
      null, 
      XPathResult.FIRST_ORDERED_NODE_TYPE, 
      null
      ).singleNodeValue;
}

async function setPlayer(slot_element, player_card) {
   console.log(slot_element)
   console.log(player_card)

   clickOnElement(slot_element)

   const add_player_button = getSingleElementByXpath(
      "//span[contains(text(),'Add Player')]"
   )
   await delay(100);
   clickOnElement(add_player_button);
   
   const player_name_input = getSingleElementByXpath(
      "//input[@placeholder='Type Player Name']"
   )
   player_name_input.value = player_card["name"];
   player_name_input.dispatchEvent(new Event('input'));
   await delay(500);

   const player_search_item = getSingleElementByXpath(
      "//span[contains(text(),'" + player_card["name"] + "')]"
   )
   clickOnElement(player_search_item);
   await delay(200);

   const player_search_position_filter = getSingleElementByXpath(
      "(//button[@class='flat ut-search-filter-control--row-button'])[4]"
   )
   clickOnElement(player_search_position_filter);
   await delay(100);
   
   const player_search_button_search = getSingleElementByXpath(
      "//button[contains(text(),'Search')]"
   )
   clickOnElement(player_search_button_search);
   await delay(400);

   const button_add_player = getSingleElementByXpath(
      "//button[@class='ut-image-button-control btnAction add']"
   )

   if (button_add_player){
      clickOnElement(button_add_player);
   }

   await delay(100);
}

async function solve(solution_squad) {
   const player_cards = solution_squad['player_cards'];

   var index = 0;
   const player_slots_elements = document.getElementsByClassName("ut-squad-slot-view");

   for (var slot_index = 0; slot_index < player_slots_elements.length; slot_index++) {
      var player_slot_element = player_slots_elements[slot_index];
      console.log(player_slot_element["className"])

      if (!player_slot_element["className"].includes("locked") && (index < player_cards.length)){
         await delay(100);
         await setPlayer(player_slot_element, player_cards[index])
         index += 1;
      }
    }
}

 (function () {
   console.log("FUT SBCSolver Extension connected");

   window.addEventListener("message", (event) => {
      browser.runtime.sendMessage(chrome.runtime.id, event.data);
    }, false);

   browser.runtime.onMessage.addListener(
      function (request, sender, sendResponse) {
         if (request.message_type == 'SOLVE_WITH_SOLUTION'){
            solve(JSON.parse(request.data))
         } 
      }
   );
})();


(function () {
   var s = document.createElement('script');

   s.src = chrome.extension.getURL('hook.js');

   s.onload = function () { this.remove() };

   (document.head || document.documentElement).appendChild(s);
   console.log("FUT SBCSolver Extension connected");
})();