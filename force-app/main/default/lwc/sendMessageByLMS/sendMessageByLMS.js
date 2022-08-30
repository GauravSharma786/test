import { LightningElement,wire ,track} from 'lwc';
import {subscribe,publish,APPLICATION_SCOPE,MessageContext} from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/Sample_Channel_File__c';

export default class SendMessageByLMS extends LightningElement {
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
        this.recieveData = message.messsageBody2;
    }

    // Respond to UI event by publishing message
    handleClick(event) {
        const message = { messsageBody:'This is sample Mode'};

        publish(this.messageContext, recordSelected, message);
    }
}