import { LightningElement } from 'lwc';

export default class countryDetailParent extends LightningElement {
    selectedCountries;
    handleEvent(event){
        this.selectedCountries= event.detail;
    }
}