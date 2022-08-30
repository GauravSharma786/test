import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    
    personArr =['Gaurav' , 'Vishal' , 'Tipu' , 'Kartik'];
    person =['Gaurav' , 'Vishal' , 'Tipu' , 'Kartik'];
    handleClick(event) {
        console.log('On CLick Handle');
        const pElement = this.template.querySelector('p')
        console.log(pElement);
        pElement.style.color="blue";
        pElement.innerText="This is Changed Text";

        const divElement = this.template.querySelector('.inner');
        Array.from(divElement).array.forEach(element => {
            console.log(element);
            element.setAttribute('Title','Its changed By Js');
        });

        const mydivEle = this.template.querySelector('.mydiv')
        mydivEle.innerText = "<p>This is My </p>";
    }
}