import { LightningElement,track } from 'lwc';
import pubSub from 'c/pubsubComponent';

export default class SendingInformationComponent extends LightningElement {

    @track sendingInfo;
    @track catchingInfo;

    connectedCallback(){
        pubSub.subscribe("sendMessageByRecieve", value=> {
            console.log('city',value);
            this.catchingInfo = value;
            //console.log('result', this.city);
           this.getAccounts();
        });
    }
    
    handleChange(event){
    let inputValue = event.target.value;
    this.sendingInfo = inputValue
    
    }

    handleClick(){
        pubSub.publish("sendMessage", this.sendingInfo);
    }
}