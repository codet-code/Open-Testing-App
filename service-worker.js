const CACHE_NAME = "open-testing-pwa-v1";

const FILES_TO_CACHE = [

    "./",
    "./index.html",
    "./style.css",
    "./games.js",
    "./tab-switching.js",
    "./snacks.js",
    "./snacks.html",
    "./minecraft.html",
    "./poly-track.html",
    "./flappybird.html",
    "./vscode.html",
    "./youtube.html",
    "./Spotify.html",
    "./cookie.html",
    "./we.html",
    "./pwa.js",
    "./manifest.json",
    "./icon.svg"

];

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches
                .open(CACHE_NAME)
                .then(cache =>
                    cache.addAll(FILES_TO_CACHE)
                )

        );

        self.skipWaiting();

    }
);

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches.keys().then(keys =>

                Promise.all(

                    keys
                        .filter(key =>
                            key !== CACHE_NAME
                        )
                        .map(key =>
                            caches.delete(key)
                        )

                )

            )

        );

        self.clients.claim();

    }
);

self.addEventListener(
    "fetch",
    event => {

        if (event.request.method !== "GET") {
            return;
        }

        event.respondWith(

            caches.match(event.request)
                .then(cached => {

                    if (cached) {
                        return cached;
                    }

                    return fetch(event.request);

                })

        );

    }
);