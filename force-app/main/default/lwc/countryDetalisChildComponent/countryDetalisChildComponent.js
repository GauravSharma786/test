import { LightningElement,track } from 'lwc';

export default class CountriesDetail extends LightningElement {
    @track countriesDetail=[
        {
            imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png',
            header:"India",
            descrpition: "Country Description Here",
            isVisible : false
        },
        {
            imageUrl: 'https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg',
            header :"America",
            descrpition: "Country Description Here",
        }
    ]
    
    handleClick() {
        let selectedCountry=' ';
        for(country in this.countriesDetail){
            if(this.countriesDetail[country].isVisible){
                selectedCountry += this.countriesDetail[country].header;
            }
        }
        console.log('Selected Country : ' + selectedCountry);
    }
}