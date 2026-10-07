let deferredPrompt = null;

const installButton =
    document.getElementById("install-btn");

window.addEventListener(
    "beforeinstallprompt",
    event => {

        event.preventDefault();

        deferredPrompt = event;

        if (installButton) {
            installButton.hidden = false;
        }

    }
);

if (installButton) {

    installButton.addEventListener(
        "click",
        async () => {

            if (!deferredPrompt) {
                return;
            }

            deferredPrompt.prompt();

            await deferredPrompt.userChoice;

            deferredPrompt = null;

            installButton.hidden = true;

        }
    );

}

window.addEventListener(
    "appinstalled",
    () => {

        if (installButton) {
            installButton.hidden = true;
        }

    }
);

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register("service-worker.js")
                .catch(error => {
                    console.error(
                        "Service worker error:",
                        error
                    );
                });

        }
    );

}