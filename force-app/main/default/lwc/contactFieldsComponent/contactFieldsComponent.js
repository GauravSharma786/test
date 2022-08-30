import { LightningElement, track, api } from 'lwc';

const column = [
    { label: 'Label', fieldName: 'label' },
    { label: 'API Name', fieldName: 'fieldApiName' },
    { label: 'Datatype', fieldName: 'dataType' },
];

export default class ContactFieldsComponent extends LightningElement {
    @track columns = column;
    @api tableData;
    @api apiFields;

    get contactFeilds() {
        if (this.tableData) {
            console.log('OUTPUT : ', JSON.parse(JSON.stringify(JSON.parse(this.tableData))));
            return JSON.parse(JSON.stringify(JSON.parse(this.tableData)));
        }
        return null;
    }

    getSelectedName(event) {
        const selectedRows = event.detail.selectedRows;
        console.log('selectedRows : ', selectedRows);
        let apiFieldsArray = [];
        selectedRows.forEach(element => {
            apiFieldsArray.push(element.fieldApiName);
        });
        this.apiFields = apiFieldsArray.join(',');
    }


}