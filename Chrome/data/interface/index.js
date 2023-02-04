domReady(() => {
  linkButton()
  hoverButton()
  credityear()
})

function domReady (callback) {
  if (document.readyState === 'complete') {
    callback()
  } else {
    window.addEventListener('load', callback, false);
  }
}

function credityear() {
  document.querySelector("#year").innerText =  new Date().getFullYear();
}

function linkButton() {
  document.querySelector('.teaser').href = `https://chrome.google.com/webstore/detail/${chrome.runtime.id}/reviews`;
  document.querySelector('.youtube').href = `https://youtube.com/c/HemantaGayen`;
  document.querySelector('.facebook').href = `https://www.facebook.com/codehemu/`;
  document.querySelector('.website').href = `https://www.downloadhub.cloud/`;
}

function hoverButton(){
  document.querySelector(".div_myadblock").addEventListener("mouseover" , mouseOver);
  document.querySelector(".div_myadblock").addEventListener("mouseout" , mouseOut);
  document.querySelector(".cta-description").addEventListener("click", linkopen);
  document.querySelector(".cta-close").addEventListener("click", messageclose);
  document.querySelector("#header-icons").addEventListener("click", headericons);
  document.querySelector(".devoloperid").addEventListener("click", devoloperid);
  if (localStorage.block=="block") {
    document.querySelector(".div_myadblock").style.display="none";
  }

}  
function mouseOver() {
  if (localStorage.message=="nyancat") {
    document.querySelector(".cta-message").innerText="YouTube Nyan Cat";
    document.querySelector(".div_myadblock").style.background="#a900ff";
  }else{
    document.querySelector(".cta-message").innerText="Mytube for YouTube™";
    document.querySelector(".div_myadblock").style.background="#0047ff";
  }
    
    document.querySelector(".cta-close").style.display="block";
} 

function mouseOut() {
    document.querySelector(".cta-message").innerText="Looking for Good addons";
    document.querySelector(".cta-close").style.display="none";
    document.querySelector(".div_myadblock").style.background="#fff";
}

function devoloperid(){
    window.open("https://www.codehemu.com/2022",'_blank');
}
function linkopen(){
  if (localStorage.message=="nyancat") {
    window.open("https://www.codehemu.com/2022/04/nyancat.html",'_blank');
  }else{
    window.open("https://www.codehemu.com/p/mytubeforyoutube.html",'_blank');
  }

}
function messageclose(){
  if (localStorage.message=="nyancat") {
    localStorage.setItem("block", "block");
  }
  document.querySelector(".div_myadblock").style.display="none";
  localStorage.setItem("message", "nyancat");
}
function headericons(){
    window.open("https://www.downloadhub.cloud/2023/01/loop.html#CSS2",'_blank');
}

var time = "";
window.onload = function(){ 
    chrome.runtime.sendMessage({
      getTime: ""
    }, function () {
      console.log('success of get Time');
    });
    document.querySelector(".ctrl__button--decrement").addEventListener("click", function()  {
      time = document.querySelector('#time').value;
      if(time > 0){
        document.querySelector('#time').value = time - 1;
        document.querySelector("#show").innerText = time - 1;
        thistime = time - 1;
        chrome.runtime.sendMessage({
          clearTime: thistime
        }, function () {
          console.log('msg sent');
        });
      }

    })
    document.querySelector(".ctrl__button--increment").addEventListener("click", function()  {
      time = document.querySelector('#time').value;
      if(time < 1001){
        document.querySelector('#time').value = time + 1;
        document.querySelector("#show").innerText = time + 1;
        thistime = time + 1;
        chrome.runtime.sendMessage({
          clearTime: thistime
        }, function () {
          console.log('msg sent');
        });
      }

    })
    document.querySelector("#time").addEventListener("change", function()  {
      time = document.querySelector('#time').value;
      if (time < 1001 && time > 0) {
          console.log(time);
          chrome.runtime.sendMessage({
            clearTime: time
          }, function () {
            console.log('msg sent');
          });
      }
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.clearTime !== null && request.clearTime !== undefined) {
    console.log('message received :' + request.clearTime);
    time = request.clearTime;
    document.querySelector("#time").value = time;
    document.querySelector("#show").innerText = time;
  }
});


