import { LightningElement, track, wire, api } from 'lwc';
import getPriceMatrixData from '@salesforce/apex/PriceMatrixDataController.getPriceMatrixData';
import insertMatrixData from '@salesforce/apex/PriceMatrixDataController.insertMatrixData';
import getAccountData from '@salesforce/apex/PriceMatrixDataController.getAccountData';
import createJson from '@salesforce/apex/PriceMatrixDataController.createJson';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';

const columns = [
    { label: 'ATTRIBUTE NAME', fieldName: 'attributeName', editable: true },
    { label: 'ATTRIBUTE VALUE', fieldName: 'attributeValue', editable: true },
    { label: 'PRODUCT NAME', fieldName: 'productName', editable: true },
    { label: 'PRODUCT CODE', fieldName: 'productCode', editable: true },
    { label: 'MRP', fieldName: 'mrp', editable: true },
    { label: 'GST', fieldName: 'gst', editable: true },
    { label: 'TARGET PRODUCT NAME', fieldName: 'targetProductName', editable: true },
    { label: 'TARGET PRODUCT CODE', fieldName: 'targetProductCode', editable: true },
];

export default class PriceMatrixData extends LightningElement {
    @api childObjectApiName = 'Matrix_Data__c'; //Contact is the default value  
    @api targetFieldApiName = 'Price_Matrix__c'; //AccountId is the default value
    @api fieldLabel = 'Your field label here';
    @api disabled = false;
    @api value;
    @api required = false;


    @track columns = columns;
    @track priceMatrixData;
    @track data = [];
    @track data2 = [];
    showModel = false;
    @track productName = '';
    @track productPrice = '';
    @track draftValues = [];
    @track testId = [];
    @track bankInfoData;

    @track page = 1;
    @track startingRecord = 1;
    @track endingRecord = 0;
    @track pageSize = 1;
    @track totalRecountCount = 0;
    @track totalPage = 0;
    @track mainData = [];
    @track isShowModel = false;

    @wire(getAccountData)
    getAccountData({data, error}){
        if(data){
            this.bankInfoData = data;
            console.log('DATA : ',data);
        }
        else if (error) {
            console.log('error : ',error);
        }
    }

    handleClickExtraCancel() {
        this.isShowModel = false;
    }

    @wire(getPriceMatrixData)
    getPriceMatrixRecords({ data, error }) {
        if (data) {
            console.log('OUTPUT : ', data);
            let result = JSON.parse(JSON.stringify(data));
            let temp = [];
            result.forEach(element => {
                element.Matrix_Data__r.forEach(matrixObj => {
                    console.log('matrixObj.Id : ', matrixObj.Id);
                    console.log('matrixObj : ', matrixObj);
                    let id = matrixObj.Id;
                    console.log('id : ', id);
                    //  this.testId.push(matrixObj);
                    console.log('this.testId : ', this.testId);
                    let obj = {
                        id: matrixObj.Id,
                        attributeName: JSON.parse(matrixObj.Input_Data__c).AttributeName,
                        attributeValue: JSON.parse(matrixObj.Input_Data__c).AttributeValue,
                        productName: JSON.parse(matrixObj.Input_Data__c).ProductName,
                        productCode: JSON.parse(matrixObj.Input_Data__c).ProductCode,
                        mrp: JSON.parse(matrixObj.Output_Data__c).MRP,
                        gst: JSON.parse(matrixObj.Output_Data__c).GST,
                        targetProductName: JSON.parse(matrixObj.Output_Data__c).TargetProductName,
                        targetProductCode: JSON.parse(matrixObj.Output_Data__c).TargetProductCode
                    }
                    console.log('obj : ', obj);
                    temp.push(obj);
                });
            })
            this.data = temp;
            this.data2 = temp;
            // this.testId = temp;

            this.totalRecountCount = this.data2.length;
            this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize);

            this.mainData = this.data2.slice(0, this.pageSize);
            this.endingRecord = this.pageSize;

        } else if (error) {
            console.log('error', error);
        }
    }

    //this method displays records page by page
    displayRecordPerPage(page) {

        this.startingRecord = ((page - 1) * this.pageSize);
        this.endingRecord = (this.pageSize * page);

        this.endingRecord = (this.endingRecord > this.totalRecountCount)
            ? this.totalRecountCount : this.endingRecord;

        this.mainData = this.data2.slice(this.startingRecord, this.endingRecord);

        this.startingRecord = this.startingRecord + 1;
    }

    async handleSave1(event) {
        let product = [];
        let updatedFields = event.detail.draftValues;
        console.log('updatedFields2 : ', updatedFields);
        let arr = [];
        updatedFields.forEach(element => {
            this.data2.forEach(obj => {
                if (element.id == obj.id) {
                    arr.push(obj);
                }
            });
        });
        console.log('arr : ', arr);
        console.log('updatedFields : ', updatedFields);
        createJson({ data: updatedFields, data2: arr }).then(result => {
            console.log('result : ', JSON.parse(result));

        }).catch(error => {
            console.log('error : ', error);

        });
    }

    searchByName(event) {
        console.log('name : ', event.target.name);
        if ('pName' == event.target.name)
            this.productName = event.target.value;
        if ('pPrice' == event.target.name)
            this.productPrice = event.target.value;
        console.log('this.productName : ', this.productName);
        let temp = [];
        if (this.productName.length > 0 || this.productPrice.length > 0) {
            this.data.forEach(element => {
                if ((this.productName.length > 0 ? this.productName == element.productName : false) ||
                    (this.productPrice.length > 0 ? this.productPrice == element.mrp : false)
                ) {
                    let obj = {
                        attributeName: element.attributeName,
                        attributeValue: element.attributeValue,
                        productName: element.productName,
                        productCode: element.productCode,
                        mrp: element.mrp,
                        gst: element.gst,
                        targetProductName: element.targetProductName,
                        targetProductCode: element.targetProductCode
                    }
                    temp.push(obj);
                    console.log('temp : ', temp);
                }
            });
            this.data2 = temp;

            //this.displayRecordPerPage(this.page);
        } else {
            this.data2 = this.data;
        }
        console.log('this.data2 : ', this.data2);
        this.page = 1;
        this.startingRecord = 1;
        this.totalRecountCount = this.data2.length;
        this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize);

        this.mainData = this.data2.slice(0, this.pageSize);
        this.endingRecord = this.pageSize;
        console.log('this.mainData : ', this.mainData);
    }

    handleChange(event) {
        console.log('Id', event.target.value);
        // Creates the event
        const selectedEvent = new CustomEvent('valueselected', {
            detail: event.detail.value
        });
        //dispatching the custom event
        this.dispatchEvent(selectedEvent);
    }

    @api isValid() {
        if (this.required) {
            this.template.querySelector('lightning-input-field').reportValidity();
        }
    }

    save(event) {
        let attributeName;
        let attributeValue;
        let productName;
        let productCode;
        let mrp;
        let gst;
        let targetProductName;
        let targetProductCode;
        let inp = this.template.querySelectorAll("lightning-input");
        let parentId = this.template.querySelector("lightning-input-field").value;
        console.log('parentId : ', parentId);
        inp.forEach(element => {
            if (element.name == "attributeName")
                attributeName = element.value;
            else if (element.name == "attributeValue")
                attributeValue = element.value;
            else if (element.name == "productName")
                productName = element.value;
            else if (element.name == "productCode")
                productCode = element.value;
            else if (element.name == "mrp")
                mrp = element.value;
            else if (element.name == "gst")
                gst = element.value;
            else if (element.name == "targetProductName")
                targetProductName = element.value;
            else
                targetProductCode = element.value;
        });

        let input = '{\"AttributeName\":' + JSON.stringify(attributeName) + ',\"AttributeValue\":' + JSON.stringify(attributeValue) + ',\"ProductName\":' + JSON.stringify(productName) + ',\"ProductCode\":' + JSON.stringify(productCode) + '}';
        let output = '{\"MRP\":' + JSON.stringify(mrp) + ',\"GST\":' + JSON.stringify(gst) + ',\"TargetProductName\":' + JSON.stringify(targetProductName) + ',\"TargetProductCode\":' + JSON.stringify(targetProductCode) + '}';
        console.log('input : ', input);
        let obj = {
            Input_Data__c: input,
            Output_Data__c: output,
            Price_Matrix__c: parentId
        }
        console.log('obj : ', obj);
        insertMatrixData({ matrixDataObj:JSON.stringify(data) }).then(result => {
            console.log('result', result);
            if (result = 'SUCCEEDED') {
                this.showToast('Success', 'Your record is sucessfullly insert', 'success', 'dismissable');
            } else {
                this.showToast('Error', '', 'error', 'dismissable');
            }
        }).catch(error => {
            console.log('error', error);
        });

    }

    //clicking on previous button this method will be called
    previousHandler() {
        if (this.page > 1) {
            this.page = this.page - 1; //decrease page by 1
            this.displayRecordPerPage(this.page);
        }
    }

    //clicking on next button this method will be called
    nextHandler() {
        if ((this.page < this.totalPage) && this.page !== this.totalPage) {
            this.page = this.page + 1; //increase page by 1
            this.displayRecordPerPage(this.page);
        }
    }

    handleOnViewModel() {
        this.showModel = true;
    }
    handlemodel() {
        this.showModel = false;
    }

    showToast(title, message, varient, mode) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: varient,
            mode: mode
        });
        this.dispatchEvent(evt);
    }

    handleClickExtra() {
        this.isShowModel = true;
        console.log('this.bankInfoData : ', this.bankInfoData);
        let arr = [];
        let obj = this.bankInfoData[0];
        console.log('Array : ',obj);
        
        Object.entries(obj).forEach(([key, value]) => {
            console.log(key, value); // key ,value
            let label = key.replace('__c', '').replaceAll('_',' ');
            // label =label.substring(0,label.length-1)
            console.log('label : ', label);
            arr.push({ label, value });
        });

        if (arr.length) {
            this.bankInfoData = arr.reverse();
                // this.isOpneOrderPaymentStatusModal = true;
            }
    }
}