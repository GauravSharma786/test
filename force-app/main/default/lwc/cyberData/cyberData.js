import { LightningElement } from 'lwc';

export default class CyberData extends LightningElement {
    hasRendered = false;

    connectedCallback() {
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = 'html { scroll-behavior: smooth; }';
        document.getElementsByTagName('head')[0].appendChild(style);

        document.addEventListener("DOMContentLoaded", () => {
            function counter(id, start, end, duration) {
                let obj = document.getElementById(id),
                    current = start,
                    range = end - start,
                    increment = end > start ? 1 : -1,
                    step = Math.abs(Math.floor(duration / range)),
                    timer = setInterval(() => {
                        current += increment;
                        obj.textContent = current;
                        if (current == end) {
                            clearInterval(timer);
                        }
                    }, step);
            }
            counter("count1", 0, 400, 3000);
            counter("count2", 100, 50, 2500);
            counter("count3", 0, 40, 3000);
        });


    }

    renderedCallback() {
        if (this.hasRendered) return false;
        this.hasRendere = !this.hasRendere;
        this.handleNavbarBurgerEvent();
    }

    handleNavbarBurgerEvent() {
        // Show Navbar Menu on Burger Click
        // Hide Navbar Menu on Overlay Click
        const navbarMenu = this.template.querySelector(".menu");
        const burgerMenu = this.template.querySelector(".burger");
        const bgOverlay = this.template.querySelector(".overlay");

        if (burgerMenu && bgOverlay) {
            burgerMenu.addEventListener("click", () => {
                navbarMenu.classList.add("is-active");
                bgOverlay.classList.toggle("is-active");
            });

            bgOverlay.addEventListener("click", () => {
                navbarMenu.classList.remove("is-active");
                bgOverlay.classList.toggle("is-active");
            });
        }

        // Hide Navbar Menu on Links Click
        this.template.querySelectorAll(".menu-link").forEach((link) => {
            link.addEventListener("click", () => {
                navbarMenu.classList.remove("is-active");
                bgOverlay.classList.remove("is-active");
            });
        });

        // Open and Hide Search Bar on Toggle Click
        const searchBlock = this.template.querySelector(".search-block");
        const searchToggle = this.template.querySelector(".search-toggle");
        const searchCancel = this.template.querySelector(".search-cancel");

        if (searchToggle && searchCancel) {
            searchToggle.addEventListener("click", () => {
                searchBlock.classList.add("is-active");
            });

            searchCancel.addEventListener("click", () => {
                searchBlock.classList.remove("is-active");
            });
        }
    }
}