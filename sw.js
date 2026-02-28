const cacheName = "cache-v1";
const precachedResources = ["index.html", "slope.png", "TemplateData/progressEmpty.Dark.png", "TemplateData/progressFull.Dark.png", "TemplateData/progressLogo.Dark.png", "TemplateData/style.css", "TemplateData/unityloader41.js", "TemplateData/UnityProgress.js", "Build/slope_data.unityweb", "Build/slope_framework.unityweb", "Build/slope_memory.unityweb", "Build/slope_wasmcode.unityweb", "Build/slope_wasmframework.unityweb", "Build/slope.json"];

async function precache() {
  const cache = await caches.open(cacheName);
  return cache.addAll(precachedResources);
}

self.addEventListener("install", (event) => {
  event.waitUntil(precache());
});

async function cacheFirstWithRefresh(request) {
  const fetchResponsePromise = fetch(request).then(async (networkResponse) => {
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });

  return (await caches.match(request)) || (await fetchResponsePromise);
}

self.addEventListener("fetch", (event) => {  
  event.respondWith(cacheFirstWithRefresh(event.request));
});