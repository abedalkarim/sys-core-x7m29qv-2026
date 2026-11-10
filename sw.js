var C='sweets-v5',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}));self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}));self.clients.claim()});
self.addEventListener('fetch',function(e){
 var r=e.request,u=r.url;
 if(r.method!=='GET')return;
 if(u.indexOf('googleapis.com')>-1||u.indexOf('firebaseapp.com')>-1)return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(function(hit){
  var net=fetch(r).then(function(res){if(res&&(res.ok||res.type==='opaque')){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)})}return res}).catch(function(){return hit||caches.match('index.html')});
  return hit||net}))});
