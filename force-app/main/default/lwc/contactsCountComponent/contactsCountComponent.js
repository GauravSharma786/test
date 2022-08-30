import { LightningElement, wire, track } from 'lwc';
import getAccountList from '@salesforce/apex/ContactCountController.getAccountList';

export default class ContactsCountComponent extends LightningElement {
    allAccounts;
    @track isChecked;

    @wire(getAccountList)
    wiredProducts({error, data}){
    if(error){
        this.error = error;
    }else if(data){
        console.log(data);
        let accounts = [];
        for(let index=0; index<data.length;index++){
            let obj = {};
            obj = JSON.parse(JSON.stringify(data[index]));
            obj.contactCount = data[index].Contacts ?data[index].Contacts.length : 0;
            accounts.push(obj);
        }
        console.log('Accounts',accounts);
        this.allAccounts = JSON.parse(JSON.stringify(accounts));
        // this.listprice = this.products.Product_Price_Entries__r.List_Price__c;
    }
}

handleChange(event){
    this.isChecked = event.target.checked;
}

}