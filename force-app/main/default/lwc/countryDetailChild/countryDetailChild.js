import { LightningElement,track } from 'lwc';

export default class countryDetailChild extends LightningElement {
    selectedCountryDetail = [];
    @track countryinformation=[
        {
            imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png',
            header:"India",
            descrpition: "Country Description Here"
        },
        {
            imageUrl: 'https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg',
            header :"America",
            descrpition: "Country Description Here"
        }
    ]
    handleChange(event){
        let selectedValue = event.target.value;
        let indexValue = this.selectedCountryDetail.indexOf(selectedValue);
        if(indexValue == -1){
            this.selectedCountryDetail.push(selectedValue);
        }else{ 
            this.selectedCountryDetail.splice(indexValue,1);
        }
    }
    
    handleClick() {
        this.dispatchEvent(new CustomEvent('countries', {detail: this.selectedCountryDetail}))
    }
}