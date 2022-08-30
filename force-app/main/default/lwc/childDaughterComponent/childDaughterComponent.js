import { LightningElement } from 'lwc';
import pubSub from 'c/pubsubComponent';

export default class ChildDaughterComponent extends LightningElement {
    handleClick(){
        console.log('hello');
        const value = 'Miss you Bhai...';
        pubSub.publish("show", value);
    }
}