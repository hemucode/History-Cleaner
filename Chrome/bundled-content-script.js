async function init() {

   var a = new Promise(function(resolve, reject){
        chrome.storage.sync.get({"enabled": true}, function(options){
            resolve(options.enabled);
        })
    });

  const enabled = await a;

  if (!enabled) return;
  let timer = 500;
  for (var i = 0; i <2 ; i++) {
    setTimeout(()=>{
        (function () {
        'use strict';

        window.__extension_included = true;

        var css = document.createElement("style");
        var head = document.head;
        head.appendChild(css);

        css.type = 'text/css';

        css.innerText = '* {' +
            '-webkit-user-select: text !important;' +
            '-moz-user-select: text !important;' +
            '-ms-user-select: text !important;' +
            'user-select: text !important;' +
            '}';

        [].forEach.call(['contextmenu', 'copy', 'cut', 'paste', 'mouseup', 'mousedown', 'keyup', 'keydown', 'drag', 'dragstart', 'select', 'selectstart'], function (event) {
            document.addEventListener(event, function (e) {
                e.stopPropagation();
            }, true);
        });
      })();
    },timer)
    timer +=500;
  }
}


init();







   
          






   
          

   
          
