let mainColors = localStorage.getItem("color-option");

if (mainColors !== null) {
    document.documentElement.style.setProperty('--main-color', mainColors);

    // remove active class from all colors list item
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        // add active class to element that has data-color === localStorage
        if (element.dataset.color === mainColors) {
            element.classList.add("active")
        }
    });

}

// toggle cog and settings menu
let toggle = document.querySelector(".toggle-settings .fa-cog");

toggle.onclick = function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open");
};

// switch colors
const colorsLi = document.querySelectorAll(".colors-list li");
// loop on every li
colorsLi.forEach((li) => {

    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        // set color on local storage
        localStorage.setItem('color-option', e.target.dataset.color);

        handleActive(e);
    })
});

// switch backgrounds on or off
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// loop on every span
randomBackEl.forEach((span) => {

    span.addEventListener("click", (e) => {
        handleActive(e)

        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;

            randomizeImg();

            localStorage.setItem("background-option", true);
        } else {
            backgroundOption = false;

            clearInterval(backgroundInterval);

            localStorage.setItem("background-option", false);
        };
    });
});

// background random
let page = document.querySelector(".landing-page");

let imgsArray = ["wallpaper1.jpg", "wallpaper2.jpg", "wallpaper3.jpg", "wallpaper4.jpg", "wallpaper5.jpg"];

// let randomN = Math.floor(Math.random() * imgsArray.length);
// random background option
let backgroundOption = true;

// check if there's local storage random background item
let backgroundLocalItem = localStorage.getItem("background-option");

// check if random background local storage is not null
if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === "true") {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    };
    document.querySelectorAll(".random-backgrounds span").forEach((el) => {
        el.classList.remove("active");
    });

    if (backgroundLocalItem === "true") {
        document.querySelector(".yes").classList.add("active");
    } else (
        document.querySelector(".no").classList.add("active")
    )
};

// variable to control the interval
let backgroundInterval;

function randomizeImg() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            let randomN = Math.floor(Math.random() * imgsArray.length);

            page.style.backgroundImage = 'url("imgs/' + imgsArray[randomN] + '")';
        }, 1000);
    };

};

randomizeImg();

// select skills selector

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    // skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;

    // skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // window height
    let windowHeight = this.innerHeight;

    // window scrollTop
    let windowScrollTop = this.pageYOffset

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skills .progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    };
};

let gallery = document.querySelectorAll(".gallery img");

gallery.forEach(img => {

    img.addEventListener("click", (e) => {

        // create overlay element
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);
        popupBox = document.createElement("div");
        popupBox.className = "popup-box";


        if (img.alt !== null) {

            // creating heading
            let imgHeading = document.createElement("h3");
            // create text for heading
            let imgText = document.createTextNode(img.alt);
            // append the text to the heading
            imgHeading.appendChild(imgText);
            // append the heading to the popup
            popupBox.appendChild(imgHeading);

            // create close span button;
            let closeButton = document.createElement("span");
            closeButton.className = "close-button";
            closeButton.id = "close"
            let closeButtonText = document.createTextNode("X");
            closeButton.appendChild(closeButtonText);
            overlay.appendChild(closeButton);

            closeButton.addEventListener("click", () => {
                closeButton.remove();
                overlay.remove();
                popupBox.remove()
            });
        };

        // create image

        let popupImage = document.createElement("img");
        popupImage.src = img.src;
        popupBox.appendChild(popupImage);
        document.body.append(popupBox);

    });

});

let content = document.querySelectorAll(".timeline-content .content");

content.forEach(cont => {

    cont.addEventListener("click", (e) => {

        // create overlay element
        let contentOverlay = document.createElement("div");
        contentOverlay.className = "content-overlay";
        document.body.appendChild(contentOverlay);
        contentBox = document.createElement("div");
        contentBox.className = "content-box";


        if (cont.innerHTML !== "") {

            // creating heading
            let contHeading = document.createElement("h3");
            // create text for heading
            let contText = document.createTextNode(document.querySelector(".content h3").innerHTML);
            // append the text to the heading
            contHeading.appendChild(contText);
            // append the heading to the popup
            contentBox.appendChild(contHeading);

            // create close span button;
            let contCloseButton = document.createElement("span");
            contCloseButton.className = "content-close-button";
            let contentCloseButtonText = document.createTextNode("X");
            contCloseButton.appendChild(contentCloseButtonText);
            contentOverlay.appendChild(contCloseButton);

            contCloseButton.addEventListener("click", () => {
                contCloseButton.remove();
                contentOverlay.remove();
                contentBox.remove()
            });
        };

        // create div

        let contentDesc = document.createElement("p");
        contentDesc.innerHTML = document.querySelector(".content p").innerHTML;
        contentBox.appendChild(contentDesc);
        document.body.appendChild(contentBox);

    });

});

// select all bullets 
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

const allLinks = document.querySelectorAll(".links a");


function scrollToSomewhere(elements) {

    elements.forEach(ele => {

        ele.addEventListener("click", (e) => {
            e.preventDefault()
            document.querySelector(e.target.dataset.section).scrollIntoView({

                behavior: "smooth",

            });

        });

    });
};

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

function handleActive(ev) {
    // remove active class from all children
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active")
    });
    ev.target.classList.add("active");
}

let bulletSpan = document.querySelectorAll(".show-bullets span");

let bulletContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullet_option");

if (bulletLocalItem !== null) {
    bulletSpan.forEach(span => {
        span.classList.remove("active");
    });

    if (bulletLocalItem === "show") {
        bulletContainer.style.display = "block";
        document.querySelector(".show-bullets .yes").classList.add("active")
    } else {
        bulletContainer.style.display = "none";
        document.querySelector(".show-bullets .no").classList.add("active")
    }
};

bulletSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        handleActive(e)
        if (span.dataset.display == "show") {
            bulletContainer.style.display = "block";
            localStorage.setItem("bullet_option", e.target.dataset.display)
        } else {
            bulletContainer.style.display = "none";
            localStorage.setItem("bullet_option", e.target.dataset.display)
        };
    });
});

// reset button

document.querySelector(".settings-box .reset-options").onclick = function () {
    localStorage.clear();
    location.reload();
}

// toggle menu
let toggleBtn = document.querySelector(".toggle-menu i");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function () {
    tLinks.classList.toggle("open");
};

document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== tLinks) {
        if (tLinks.classList.contains("open")) {
            tLinks.classList.toggle("open")
        }
    };
});