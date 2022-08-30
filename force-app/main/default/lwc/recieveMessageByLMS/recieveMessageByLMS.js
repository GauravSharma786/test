import { LightningElement,wire ,track} from 'lwc';
import {subscribe,publish,APPLICATION_SCOPE,MessageContext} from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/Sample_Channel_File__c';

export default class RecieveMessageByLMS extends LightningElement {
    @wire(MessageContext)
    messageContext;

    @track recieveData;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }
    // Encapsulate logic for Lightning message service subscribe and unsubsubscribe
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                recordSelected,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    handleMessage(message) {
        this.recieveData = message.messsageBody;
    }

    handleClick(event) {
        let value = this.template.querySelector('lightning-textarea[data-id=username]').value;
        const message = { messsageBody2:value};
        publish(this.messageContext, recordSelected, message);
    }
}