chrome.runtime.onStartup.addListener(async () => {
  var a = new Promise(function(resolve, reject){
        chrome.storage.sync.get({"enabled": true}, function(options){
            resolve(options.enabled);
      })
  });

  const enabled = await a;
  console.log(enabled);
  if (enabled) {
    await enable();
  } else {
    await disable();
  }
});

chrome.runtime.onInstalled.addListener(async (details) => {
  switch (details.reason) {
    case chrome.runtime.OnInstalledReason.INSTALL:
      return chrome.storage.sync.set({
        installDate: Date.now(),
        installVersion: chrome.runtime.getManifest().version,
      });
    case chrome.runtime.OnInstalledReason.UPDATE:
      return chrome.storage.sync.set({
        updateDate: Date.now(),
      });
  }
});

chrome.storage.onChanged.addListener(async (changes, namespace) => {
  if (namespace !== "sync") return;

  if (changes.enabled) {
    if (changes.enabled.newValue) {
      await enable();
    } else {
      await disable();
    }
  }
});
async function enable() {
  await chrome.action.setIcon({
    path: {
      32: "data/icons/icon-32.png",
      38: "data/icons/icon-38.png",
      128: "data/icons/icon-128.png",
    },
  });
  await reloadAffectedTab();
}

async function disable() {
  await chrome.action.setIcon({
    path: {
      32: "data/icons/icon-disabled-32.png",
      38: "data/icons/icon-disabled-38.png",
      128: "data/icons/icon-disabled-128.png",
    },
  });
  await reloadAffectedTab();
}

async function reloadAffectedTab() {
  const [currentTab] = await chrome.tabs.query({
    active: true,
    url: "*://*/*",
  });
  const isTabAffected = Boolean(currentTab?.url);
  if (isTabAffected) {
    return chrome.tabs.reload();
  }
}
