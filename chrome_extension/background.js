let currentTabId;
let version = "1.0";
let server = "";
const requests = new Map();

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (
      details.url.includes(
        "static/media/sbc_optimization_engine_bg.7f85533dcd722e0ed369.wasm",
      )
    ) {
      return {
        redirectUrl: chrome.runtime.getURL(
          "react_app/static/media/sbc_optimization_engine_bg.7f85533dcd722e0ed369.wasm",
        ),
      };
    }

    if (
      details.url.includes(
        "https://www.ea.com/static/js/solverWorker.e1ba2163.worker.js",
      )
    ) {
      return {
        redirectUrl: chrome.runtime.getURL(
          "react_app/static/js/solverWorker.e1ba2163.worker.js",
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
  if (!request.message_type || !request.data) {
    return;
  }

  const { message_type, data } = request;

  switch (message_type) {
    case "START_DEBUGING":
      attachDebugger();
      sendResponse({ status: 0 });
      break;
    case "FUT_WEB_APP_SOLVE":
      solve(data);
      break;
    default:
  }

  return true;
});

const solve = (request) => {
  const worker = new Worker(
    chrome.runtime.getURL(
      "react_app/static/js/solverWorker.e1ba2163.worker.js",
    ),
  );
  worker.addEventListener("message", (e) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        message_type: "FUT_WEB_APP_SOLVER_RESULT",
        data: e.data,
      });
    });
  });
  worker.postMessage(request);
};

const attachDebugger = () => {
  chrome.tabs.query(
    { active: true, currentWindow: true, title: "* Ultimate Team *" },
    function (tabs) {
      const newTabId = tabs[0].id;
      if (currentTabId != newTabId) {
        if (currentTabId) {
          chrome.debugger.detach({ tabId: currentTabId });
        }

        currentTabId = newTabId;

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
      }
    },
  );
};

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
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError.message);
        }

        if (response) {
          request.set("response_body", response);
          requests.set(params.requestId, request);
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
