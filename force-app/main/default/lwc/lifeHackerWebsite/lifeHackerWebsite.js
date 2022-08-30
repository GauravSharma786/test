import { LightningElement,track } from 'lwc';
import FontsforSocialMedia from '@salesforce/resourceUrl/Font_Awesome';
import { loadStyle } from 'lightning/platformResourceLoader';

export default class LifeHackerWebsite extends LightningElement {

    
    // renderedCallback() {
    //     Promise.all([
    //         loadStyle(this, FontsforSocialMedia,'/css/fontawesome.min.css')
    //     ]).catch(error => {
    //          console.log('ERROR: ', error);

    //     });
    // }
    
    // Get all sections that have an ID defined

    // Add an event listener listening for scroll
    /* connectedCallback(){
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = 'html { scroll-behavior: smooth; }';
        document.getElementsByTagName('head')[0].appendChild(style);

        
    } */


    hasRendered = false;
    renderedCallback(){
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

    @track myLogo = 'data:image/jpeg;base64,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';
}
