import { LightningElement } from 'lwc';
import pubSub from 'c/pubsubComponent';

export default class ParentFatherComponent extends LightningElement {
    connectedCallback(){
        pubSub.subscribe("show", value=> {
            pubSub.publish("send", value);
        });
        
    }
}