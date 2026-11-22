"use strict";

document.addEventListener("DOMContentLoaded", () => {

/*
========================================
MOBILE NAVBAR
========================================
*/

const nav = document.querySelector("#mainNav");

const navLinks =
    document.querySelectorAll(
        "#mainNav .nav-link, #mainNav .btn"
    );


navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (nav.classList.contains("show")) {

            const collapse =
                bootstrap.Collapse
                .getOrCreateInstance(nav);

            collapse.hide();

        }

    });

});



/*
========================================
ACTIVE NAVIGATION
========================================
*/

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const links =
    document.querySelectorAll(
        '#mainNav a[href^="#"]'
    );


const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                links.forEach((link) => {

                    link.classList.toggle(

                        "active",

                        link.getAttribute("href")
                        === `#${entry.target.id}`

                    );

                });

            });

        },

        {
            rootMargin:
                "-35% 0px -55% 0px",

            threshold: 0
        }

    );


sections.forEach((section) => {

    observer.observe(section);

});


});