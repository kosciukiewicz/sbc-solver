let currentTabId;
let version = "1.0";
let server = "";
const requests = new Map();

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (
      details.url.includes(
        "static/media/sbc_optimization_engine_bg.e79f51afea49d8b6a363.wasm",
      )
    ) {
      return {
        redirectUrl: chrome.runtime.getURL(
          "react_app/static/media/sbc_optimization_engine_bg.e79f51afea49d8b6a363.wasm",
        ),
      };
    }

    if (
      details.url ==
      chrome.runtime.getURL(
        "static/media/sbc_optimization_engine_bg.e79f51afea49d8b6a363.wasm",
      )
    ) {
      return {
        redirectUrl: chrome.runtime.getURL(
          "react_app/static/media/sbc_optimization_engine_bg.e79f51afea49d8b6a363.wasm",
        ),
      };
    }
  },
  {
    urls: [], // or <all_urls>
  },
  ["blocking"],
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message_type != "START_DEBUGING") {
    return;
  }

  if (currentTabId) {
    chrome.debugger.detach({ tabId: currentTabId });
  }
  chrome.tabs.query({ active: true }, function (tabs) {
    currentTabId = tabs[0].id;
    if (currentTabId < 0) {
      return;
    }
    chrome.debugger.attach(
      {
        tabId: currentTabId,
      },
      version,
      onAttach.bind(null, currentTabId),
    );
    chrome.debugger.onDetach.addListener(debuggerDetachHandler);
    console.log("attach " + currentTabId);
    sendResponse({ status: 0 });
  });
});

function debuggerDetachHandler() {
  console.log("detach");
  requests.clear();
}
function onAttach(tabId) {
  chrome.debugger.sendCommand(
    {
      //first enable the Network
      tabId: tabId,
    },
    "Network.enable",
  );

  chrome.debugger.onEvent.addListener(handleEvent);
}

function handleEvent(debuggeeId, message, params) {
  if (message == "Network.requestWillBeSent") {
    if (params.request && filter(params.request.url)) {
      const detail = new Map();
      detail.set("request", params.request);
      requests.set(params.requestId, detail);
    }
  }

  if (message == "Network.responseReceived") {
    if (params.response && filter(params.response.url)) {
      const request = requests.get(params.requestId);
      if (request === undefined) {
        return;
      }
      request.set("response", params.response);
      requests.set(params.requestId, request);
    }
  }

  if (message == "Network.loadingFinished") {
    const request = requests.get(params.requestId);
    if (request === undefined) {
      return;
    }

    chrome.debugger.sendCommand(
      {
        tabId: debuggeeId.tabId,
      },
      "Network.getResponseBody",
      {
        requestId: params.requestId,
      },
      function (response) {
        if (response) {
          request.set("response_body", response);
          requests.set(params.requestId, request);
          console.log(request);
          chrome.tabs.sendMessage(
            currentTabId,
            {
              message_type: "FUT_WEB_APP_RESPONSE_BODY",
              data: {
                url: request.get("request").url,
                response_body: response.body,
              },
            },
            function (response) {},
          );
          requests.delete(params.requestId);
        }
      },
    );
  }
}

function filter(url) {
  return (
    url.endsWith("ut/game/fc24/club/stats/club") ||
    url.endsWith("ut/game/fc24/club") ||
    url.endsWith("challenges") ||
    url.includes("game/fc24/sbs/challenge/")
  );
}
