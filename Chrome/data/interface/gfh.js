var time = "";
window.onload = function(){ 
  try{ 
    chrome.runtime.sendMessage({
      getTime: ""
    }, function () {
      console.log('success of get Time');
    });
    document.querySelector("#time").addEventListener("change", function()  {
      time = document.querySelector('#time').value;
      console.log(time);
      if (time === 'notset')
        time = 0;
      chrome.runtime.sendMessage({
        clearTime: time
      }, function () {
        console.log('msg sent');
      });
    });
    document.querySelector("#okBtn").addEventListener("click", function () {
      window.close();
    });
  }catch (error) {
    console.log(`Error: ${error.message}`);
  }
}
try{ 
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      if (request.clearTime !== null && request.clearTime !== undefined) {
        console.log('bg.js message received :' + request.clearTime);
        time = request.clearTime;
        if (time === 0)
          time = 'notset';
        document.querySelector("#time").value=time;
      }
    });
}
catch (error) {
    console.log(`Error: ${error.message}`);
}

