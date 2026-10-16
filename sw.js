/* Unit Atlas - scoped app shell for the GitHub Pages deployment.
 * Network-first navigation with an offline fallback; only the shell is cached. */
'use strict';
const PREFIX='atlas-v';
const CACHE=PREFIX+'1';
const ASSETS=['./','./index.html'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url),scope=new URL(self.registration.scope);
 if(request.method!=='GET'||url.origin!==scope.origin||!url.href.startsWith(scope.href))return;
 if(request.mode==='navigate'&&(url.pathname===scope.pathname||url.pathname===scope.pathname+'index.html')){
  event.respondWith((async()=>{
   const cache=await caches.open(CACHE);
   try{const response=await fetch(request);if(response.ok)try{await cache.put(new URL('./index.html',scope).href,response.clone());}catch(_){}return response;}
   catch(_){return (await cache.match(new URL('./index.html',scope).href))||Response.error();}
  })());return;
 }
 const allowed=ASSETS.map(asset=>new URL(asset,scope).href);
 if(!allowed.includes(url.href))return;
 event.respondWith(caches.open(CACHE).then(async cache=>(await cache.match(request))||fetch(request)));
});
