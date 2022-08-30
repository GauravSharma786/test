import { LightningElement , wire , track,api} from 'lwc';
import getFields from '@salesforce/apex/showSobjectRecordsControllerLWC.getObjectFields';
// import { registerListener, unregisterAllListeners, fireEvent } from 'c/pubSubComponent';
// import pubSub from 'c/pubsubComponent';
// import {subscribe,publish,APPLICATION_SCOPE,MessageContext} from 'lightning/messageService';
// import recordSelected from '@salesforce/messageChannel/Sample_Channel_File__c';
import { CurrentPageReference } from 'lightning/navigation'; 


export default class ShowFieldOfsObject extends LightningElement {
    @api sObjectName;
    // @wire(MessageContext)
    // messageContext;
    
    // @wire(CurrentPageReference) pageRef;
    // sObjectName;
    @track fieldList = [];
    @track _selected = [];
    // connectedCallback() {
    //     pubSub.subscribe("nameOfsObject", value => {
    //         console.log('nameOfsObject', value);
    //         this.checkBoookedSeats(value.movieId, value.date);
    //         this.fieldsOfsObject(value);
    //     })
    //     registerListener("nameOfsObject",this.fieldsOfsObject,this);
    // }
    connectedCallback() {
        console.log('this.objectName connectedCallback: ', this.sObjectName);
        this.fieldsOfsObject();
        // this.fieldsOfsObject(this.sObjectName);
    }

    // subscribeToMessageChannel() {
    //     if (!this.subscription) {
    //         this.subscription = subscribe(
    //             this.messageContext,
    //             recordSelected,
    //             (message) => this.fieldsOfsObject(message),
    //             { scope: APPLICATION_SCOPE }
    //         );
    //     }
    // }

    fieldsOfsObject() {
        // console.log('fieldsOfsObject coming ');
        // this.sObjectName = data;
        getFields({objectName : this.sObjectName}).then(result=>{
            this._selected = [];
            this.publishFields();
            this.fieldList = result;
            
        }).catch(error=>{
            console.log('Error=>',error);
        })
    }

    get fieldsOfObject() {
        
        
        let temp = [];
        for(let key in this.fieldList) {
            if (this.fieldList.hasOwnProperty(key)) { 
                let obj = {label : this.fieldList[key], value : key};
                temp.push(obj);
            }
        }
        return temp;
    }
    
    handleChange(event) {
        this._selected = event.detail.value;
        this.publishFields();
    }

    publishFields(){
        let temp = [];
        this._selected.forEach(element => {
        if (this.fieldList.hasOwnProperty(element)){ 
                    let obj = {label : this.fieldList[element], fieldName : element};
                    temp.push(obj);   
                }
        });

        let obj = {field : temp, object :  this.sObjectName};
        // fireEvent(this.pageRef,"fieldsOfObject",obj);
    }
    //, visible: !element.includes('Id')
}