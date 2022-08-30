import { LightningElement,track } from 'lwc';
import pubSub from 'c/pubsubComponent';

export default class ReceiveInformationComponent extends LightningElement {
    @track information;

    connectedCallback(){
        pubSub.subscribe("sendMessage", value=> {
            console.log('city',value);
            this.information = value;
            //console.log('result', this.city);
           this.getAccounts();
        });
    }

    @track sendingInfo;
    
    handleChange(event){
    let inputValue = event.target.value;
    this.sendingInfo = inputValue;
    }

    handleClick(){
        pubSub.publish("sendMessageByRecieve", this.sendingInfo);
    }
    
}