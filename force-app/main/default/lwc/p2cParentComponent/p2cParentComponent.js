import { LightningElement } from 'lwc';

export default class P2cParentComponent extends LightningElement {
    value;
    isShow=false;
    get options() {
        return [
            { label: 'India', value: 'india' },
            { label: 'America', value: 'america' },
            { label: 'Japan', value: 'japan' },
        ];
    }
    slectedValue(event){
        this.value = event.target.value;
    }
    newButtonHandler(event){
        this.isShow=true;
    }
}