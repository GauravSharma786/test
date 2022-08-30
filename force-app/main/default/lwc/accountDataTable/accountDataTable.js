import { LightningElement, wire, track } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';
import getRecordData from '@salesforce/apex/AccountController.getRecordData';
import getAccountByCity from '@salesforce/apex/AccountController.getAccountByCity';
import PROFILE_PHOTO from '@salesforce/resourceUrl/MyProfilePhoto';
import { getRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Type', fieldName: 'Type' },
    { label: 'Phone', fieldName: 'Phone' },
];

export default class AccountDataTable extends LightningElement {

    photo = PROFILE_PHOTO;
    showParent = true;
    showChild = false;
    showModel = false;
    @track accountObj;
    selectedCityValue;
    @track accountList;
    @track coloums = columns;
    @track selectedRow;

    get options() {
        return [
            { label: '-None-', value: '' },
            { label: 'Ajmer', value: 'Ajmer' },
            { label: 'Jaipur', value: 'Jaipur' },
            { label: 'Jodhpur', value: 'Jodhpur' },
            { label: 'Bihar', value: 'Bihar' },
            { label: 'Delhi', value: 'Delhi' },
        ];
    }

    @wire(getAccountList)
    handleAccount(data, error) {
        if (data) {
            console.log('data  :-  ', data);
            this.accountList = data.data;
        } else if (error) {
            this.accountList = error;
        }
    }

    handleOnView(event) {
        showParent = false;
        showChild = true;
        console.log('Hello');
        let accountId = event.currentTarget.dataset.id;
        console.log('Id', accountId);
        getRecordData({ accountId }).then(result => {
            console.log('Result', result);
            this.accountObj = result;
            console.log('record', accountList);
        }).catch(error => {
            console.error('Error:', error);
        });
    }

    handleChange(event) {
        this.selectedCityValue = event.target.value;
        getAccountByCity({ city: this.selectedCityValue }).then(result => {
            console.log('result', result);
            this.accountList = result;
            console.log('result', this.accountList);
        }).catch(error => {
            console.log('error', error);
        });
    }

    handleOnViewModel() {
        this.showModel = true;
    }

    handlemodel() {
        this.showModel = false;
    }

    handleSelect(event) {
        let row = event.detail.selectedRows;
        console.log('row : ', row);
        if (row.length == 1) {
            this.selectedRow = row[0];
            console.log('this.selectedRow : ', this.selectedRow);
        }
    }

    handleClick(event) {
        const recordInput = event.detail.fields;
        getRecord(recordInput)
            .then(() => {
                this.showModal();
                refreshApex(this.accountList);
            })
            .catch(error => {
                console.log(error);
            });
    }

}