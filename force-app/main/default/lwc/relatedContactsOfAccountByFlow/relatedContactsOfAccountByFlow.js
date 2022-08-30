import { LightningElement, track, api } from 'lwc';

const columns = [
    { label: 'Contact FirstName', fieldName: 'FirstName' },
    { label: 'Contact LastName', fieldName: 'LastName' },
    { label: 'Contact Email', fieldName: 'Email' },
];
export default class RelatedContactsOfAccountByFlow extends LightningElement {
    @track columns = columns;
    @api tableData;

}