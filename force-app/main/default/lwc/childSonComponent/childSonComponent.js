import { LightningElement } from 'lwc';
import pubSub from 'c/pubsubComponent';

export default class ChildSonComponent extends LightningElement {
    message;
    show = false;
    connectedCallback(){
        pubSub.subscribe("send", value=> {
            this.show = true;
            console.log('result',value);
            this.message = value;
            console.log('message',this.message );
        });
        
    }
}