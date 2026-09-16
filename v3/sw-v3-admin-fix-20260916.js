const NEW_ASSET='/v3/v3-admin-tools-20260916-9.js';
self.addEventListener('install',event=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
  const u=new URL(event.request.url);
  if(u.origin===self.location.origin && (u.pathname==='/v3/v3-admin-tools.js' || u.pathname==='/v3/v3-admin-tools.js/')){
    event.respondWith(fetch(NEW_ASSET,{cache:'no-store'}));
  }
});
