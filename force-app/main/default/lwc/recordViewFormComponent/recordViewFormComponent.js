import { LightningElement, track } from 'lwc';

export default class RecordViewFormComponent extends LightningElement {
    recordId = '0015g0000047eCiAAI';

    @track obj = [
        { Label: 'Account Name', value: 'Name' },
        { Label: 'Account Address', value: 'Address__c' },
        { Label: 'Account Gender', value: 'Gender__c' },
        { Label: 'Account Phone', value: 'Phone' },
        { Label: 'Account Salary', value: 'salary__c' },
        { Label: 'Account Roll No#', value: 'Roll__c' }
    ]
}