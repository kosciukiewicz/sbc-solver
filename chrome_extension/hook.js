'use strict';

function hashCode(s) {
   for (var h = 0, i = 0; i < s.length; h &= h)
     h = 31 * h + s.charCodeAt(i++);
   return h;
 }

(function () {
   var old_Open = window.XMLHttpRequest.prototype.open;
   sessionStorage.removeItem('club_players');
   sessionStorage.removeItem('club_players_count');
   var challenges = []

   window.XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {
      this.addEventListener('readystatechange', function () {
         if (this.readyState === 4) {
            if (this.responseURL.includes('fut.ea.com/ut/game/fc24/club') && !this.responseURL.includes('consumables')) {
               var temp_data = JSON.parse(this.responseText);

               if (this.responseURL.includes('stats')) {
                  let expected_club_players_count = temp_data.stat.filter(d => d.type == 'players')[0].typeValue
                  sessionStorage.setItem('expected_club_players_count', expected_club_players_count);
               } else {
                  var var_data = sessionStorage.getItem('club_players')

                  if (var_data) {
                     var_data = JSON.parse(var_data);
                     var_data = var_data.concat(temp_data["itemData"]);
                  } else {
                     var_data = temp_data["itemData"]
                  }

                  sessionStorage.setItem('club_players', JSON.stringify(var_data));
                  sessionStorage.setItem('club_players_count', var_data.length);

                  if (var_data.length == sessionStorage.getItem('expected_club_players_count')) {
                     console.log('CLUB_PLAYERS')
                  
                     const data_to_save = {
                        'club_players': var_data,
                        'timestamp': Date.now(),
                        'id': hashCode(JSON.stringify(var_data)) + ""
                     }
                     sessionStorage.setItem('CLUB_PLAYERS', JSON.stringify(data_to_save));
                     window.postMessage({
                        message_type: 'CLUB_PLAYERS',
                        data: JSON.stringify(var_data)
                     }, "*")
                  }
               }
            } else if (this.responseURL.includes('fut.ea.com/ut/game/fc24/sbs/')
               && this.responseURL.includes("challenges")) {
               var temp_data = JSON.parse(this.responseText);
               challenges = temp_data['challenges']
               sessionStorage.setItem('challenges', JSON.stringify(challenges));
            }
            else if (this.responseURL.includes('fut.ea.com/ut/game/fc24/sbs/challenge')) {
               var temp_data = JSON.parse(this.responseText);
               if (temp_data['challengeId']) {
                  var challenge = challenges.filter(c => c['challengeId'] == temp_data['challengeId'])[0]
                  challenge['challengeSquad'] = temp_data
                  sessionStorage.setItem('squad', JSON.stringify(temp_data));
                  console.log('CHALLENGE_SQUAD')
                  sessionStorage.setItem('CHALLENGE_SQUAD', JSON.stringify({
                     challenge: challenge,
                     squad: temp_data
                  }));
                  window.postMessage({
                     message_type: 'CHALLENGE_SQUAD',
                     data: JSON.stringify({
                        challenge: challenge,
                        squad: temp_data
                     })
                  }, "*")
               }
            }
         }
      }, false);

      old_Open.call(this, method, url, async, user, pass);
   };
}());

