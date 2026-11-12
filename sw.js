var C='sweets-v8';
var CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
var CDN=['https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js','https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js'];
self.addEventListener('install',function(e){
 e.waitUntil(caches.open(C).then(function(c){
  return c.addAll(CORE).then(function(){
   return Promise.all(CDN.map(function(u){return fetch(u,{mode:'cors'}).then(function(r){if(r.ok)return c.put(u,r)}).catch(function(){})}))})}));
 self.skipWaiting()});
self.addEventListener('activate',function(e){
 e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
async function netFirst(r){
 var cache=await caches.open(C);
 try{
  var n=await Promise.race([fetch(r),new Promise(function(_,rej){setTimeout(rej,4000)})]);
  if(n&&n.ok)cache.put(r,n.clone());
  return n;
 }catch(err){
  var h=await cache.match(r,{ignoreSearch:true});
  return h||fetch(r);
 }}
self.addEventListener('fetch',function(e){
 var r=e.request;if(r.method!=='GET')return;
 var u=new URL(r.url);
 if(u.origin===self.location.origin){e.respondWith(netFirst(r));return}
 if(CDN.indexOf(r.url)>-1){e.respondWith(caches.match(r.url).then(function(h){return h||fetch(r)}))}
});
