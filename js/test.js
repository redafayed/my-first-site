document.addEventListener("DOMContentLoaded", function () {

/* ================= NAVIGATION ================= */

const navLinks = document.querySelectorAll(".nav-link");
const navbar = document.querySelector("#navbarNav");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        this.classList.add("active");

        if (navbar.classList.contains("show")) {

            const collapse =
                bootstrap.Collapse.getOrCreateInstance(navbar);

            collapse.hide();
        }

    });

});


/* ================= SMOOTH SCROLL ================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                targetId === "#" ||
                !document.querySelector(targetId)
            ) {
                return;
            }

            event.preventDefault();

            const target =
                document.querySelector(targetId);

            target.scrollIntoView({
                behavior: "smooth"
            });

        });

    });


/* ================= ACTIVE SECTION ================= */

const sections =
    document.querySelectorAll("main section[id]");

const sectionObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) {
                    return;
                }

                navLinks.forEach(function (link) {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") ===
                        "#" + entry.target.id
                    );

                });

            });

        },

        {
            rootMargin: "-35% 0px -55% 0px"
        }

    );


sections.forEach(function (section) {
    sectionObserver.observe(section);
});


/* ================= LAMP ================= */

const lampString =
    document.getElementById("lampString");

const lampHandle =
    document.getElementById("lampHandle");

let dragging = false;

let startX = 0;
let startY = 0;

let lampIsOn = false;


if (!lampHandle || !lampString) {
    return;
}


/* ================= START DRAG ================= */

lampHandle.addEventListener(
    "pointerdown",
    function (event) {

        event.preventDefault();

        dragging = true;

        startX = event.clientX;
        startY = event.clientY;

        lampString.classList.add("dragging");

        lampHandle.setPointerCapture(
            event.pointerId
        );

    }
);


/* ================= MOVE ================= */

lampHandle.addEventListener(
    "pointermove",
    function (event) {

        if (!dragging) {
            return;
        }

        let x =
            event.clientX - startX;

        let y =
            event.clientY - startY;

        let distance =
            Math.sqrt(
                x * x + y * y
            );

        const maxDistance = 120;


        if (distance > maxDistance) {

            x =
                (x / distance) *
                maxDistance;

            y =
                (y / distance) *
                maxDistance;

            distance = maxDistance;
        }


        lampHandle.style.transform =
            `translate(${x}px, ${y}px)`;


        const angle =
            Math.atan2(y, x) *
            (180 / Math.PI);


        lampString.style.height =
            (40 + distance) + "px";


        lampString.style.transform =
            `rotate(${angle + 90}deg)`;

    }
);


/* ================= RELEASE ================= */

lampHandle.addEventListener(
    "pointerup",
    function (event) {

        if (!dragging) {
            return;
        }

        dragging = false;

        lampString.classList.remove("dragging");


        const x =
            event.clientX - startX;

        const y =
            event.clientY - startY;


        const distance =
            Math.sqrt(
                x * x + y * y
            );


        if (distance >= 30) {
            toggleScreen();
        }


        resetLamp();

    }
);


/* ================= CANCEL ================= */

lampHandle.addEventListener(
    "pointercancel",
    function () {

        dragging = false;

        lampString.classList.remove("dragging");

        resetLamp();

    }
);


/* ================= RESET LAMP ================= */

function resetLamp() {

    lampHandle.style.transform =
        "translate(0, 0)";

    lampString.style.height =
        "40px";

    lampString.style.transform =
        "rotate(0deg)";
}


/* ================= TOGGLE SCREEN ================= */

function toggleScreen() {

    lampIsOn = !lampIsOn;

    if (lampIsOn) {

        document.body.classList.add(
            "light-screen"
        );

    } else {

        document.body.classList.remove(
            "light-screen"
        );

    }

}


});