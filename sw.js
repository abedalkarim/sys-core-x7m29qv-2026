// kill-switch: removes older cached versions and unregisters itself
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil((async function(){
 var k=await caches.keys();await Promise.all(k.map(function(x){return caches.delete(x)}));
 await self.registration.unregister();
 var cs=await self.clients.matchAll({type:'window'});cs.forEach(function(c){try{c.navigate(c.url)}catch(e){}});
})())});
