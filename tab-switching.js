const links = document.querySelectorAll(".nav-link");
const contents = document.querySelectorAll(".tab-content");

function showTab(id) {

    const target = document.querySelector(id);

    if (!target) {
        return;
    }

    links.forEach(link => {

        link.classList.toggle(
            "active",
            link.getAttribute("href") === id
        );

    });

    contents.forEach(content => {

        content.classList.toggle(
            "active-content",
            content === target
        );

    });

    history.replaceState(null, "", id);
}

links.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        showTab(
            link.getAttribute("href")
        );

    });

});

const startingTab =
    location.hash &&
    document.querySelector(location.hash)
        ? location.hash
        : "#home";

showTab(startingTab);