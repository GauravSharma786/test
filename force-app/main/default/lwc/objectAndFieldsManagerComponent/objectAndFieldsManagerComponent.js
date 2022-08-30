import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getObjectAndFieldsData from '@salesforce/apex/MetadataServiceUtility.getObjectAndFieldsData';
// boubleCompost true  =  access of grand parent component in Lwc in parent child relationship

const source = {
    fieldLabel:'',
    fieldName: '',
    fieldDataType: '',
    helpText: '',
    description:'',
    length: '',
    decimalPlaces: '',
    displayFormat:'',
    startingNumber:1,
    isRequired: '',
    visibleLines: '',
    isUnique: '',
    isLengthColoumShow: false,
    isDecemalPlacesShow: false,
    isRequiredCheckBoxShow: false,
    isDisplayFormatShow: false,
    isStartingNumberShow: false,
    isVisibleLinesShow: false,
    isUniqueCheckBoxShow:false,
}

const object = {
    objectName:'',
    objectPluralName: '',
    objectApiName: '',
    startWithVowelSound:false,
    description: '',
    context_Sensitive_Help_Setting: '',
    recordName: '',
    dataType:'',
    displayFormat: '',
    startingNumber:'',
    allowReports: false,
    alloeActivity: false,
    trackFieldHistory: false,
    allowInChatterGroups: false,
    allowSharing: false,
    allowBulkAPIAccess: false,
    allowStreamingAPIAccess: false,
    deploymentStatus: '',
    fieldsArray: [],
}

export default class ObjectAndFieldsManagerComponent extends LightningElement {
    @track fieldInformations;
    @track objectInformations = object;

    @track isFormatRequeried = false;
    @track showObjectInfo = false;

    // @track isLengthColoumShow = false;
    // @track isDecemalPlacesShow = false;
    // @track isRequiredCheckBoxShow = false;
    // @track isDisplayFormatShow = false;
    // @track isStartingNumberShow = false;
    // @track isVisibleLinesShow = false;
    // @track isUniqueCheckBoxShow = false;


    fieldInformations = [{ ...Object.assign({}, source), uniqueKey: Math.floor(Math.random() * 1000000) }];
    // objectInformations = [{ ...Object.assign({}, object), uniqueKey: Math.floor(Math.random() * 1000000) }];

    handleAddRow() {
        let data = [...this.fieldInformations];
        data.push({ ...Object.assign({}, source), uniqueKey: Math.floor(Math.random() * 1000000) });
        this.fieldInformations = [...data];

        setTimeout((self) => {
            let elem = self.template.querySelector('.main-table');
            elem.scrollTop = elem.scrollHeight;
        }, 50, this);
    }

    handleRemoveRow(event) {
        let data = JSON.parse(JSON.stringify(this.fieldInformations));
        data.splice(event.currentTarget.dataset.index, 1);
        this.fieldInformations = JSON.parse(JSON.stringify(data));
    }

    // Filed Values Control Panal
    handleFieldInputValueChange(event) {
        try {
            
            console.log('event.target.name : ',event.target.name);
            console.log('event.target.value : ',event.target.value);
            let name = event.target.name;
            let index = event.currentTarget.dataset.index;
            let fieldData = JSON.parse(JSON.stringify(this.fieldInformations));
            fieldData[index][name] = event.target.value;
            this.fieldInformations = fieldData;
            console.log('this.fieldInformations handleFieldInputValueChange: ', this.fieldInformations);
         } catch (error) {
            console.log('error : ', error);
    }
}

    handleDataTypeOfFieldInputValueChange(event) {
        let name = event.target.name;
        let index = event.currentTarget.dataset.index;
        let fieldData = JSON.parse(JSON.stringify(this.fieldInformations));
        console.log('unique : ',event.target.dataset.unique);
        try {
            fieldData[index].isLengthColoumShow	= false;
            fieldData[index].isDecemalPlacesShow= false;
            fieldData[index].isRequiredCheckBoxShow= false;
            fieldData[index].isDisplayFormatShow= false;
            fieldData[index].isStartingNumberShow= false;
            fieldData[index].isVisibleLinesShow= false;
            fieldData[index].isUniqueCheckBoxShow = false;
            
            if (event.target.value == 'AutoNumber') {
                fieldData[index].isDisplayFormatShow= true;
            fieldData[index].isStartingNumberShow= true;
            } else if (event.target.value == 'Currency') {
                fieldData[index].isLengthColoumShow = true;
                fieldData[index].isDecemalPlacesShow = true;
            } else if (event.target.value == 'Email') {
                fieldData[index].isRequiredCheckBoxShow = true;
                fieldData[index].isUniqueCheckBoxShow = true;
            } else if (event.target.value == 'Number') {
                fieldData[index].isLengthColoumShow = true;
                fieldData[index].isDecemalPlacesShow = true;
                fieldData[index].isRequiredCheckBoxShow = true;
                fieldData[index].isUniqueCheckBoxShow = true;
            } else if (event.target.value == 'Percent') {
                fieldData[index].isLengthColoumShow = true;
                fieldData[index].isDecemalPlacesShow = true;
                fieldData[index].isRequiredCheckBoxShow = true;
            } else if (event.target.value == 'Phone') {
                fieldData[index].isRequiredCheckBoxShow = true;
            } else if (event.target.value == 'Text') {
                fieldData[index].isLengthColoumShow = true;
                fieldData[index].isRequiredCheckBoxShow = true;
                fieldData[index].isUniqueCheckBoxShow = true;
            } else if (event.target.value == 'TextArea') {
                fieldData[index].isRequiredCheckBoxShow = true;
            }else if (event.target.value == 'LongTextArea') {
                fieldData[index].isLengthColoumShow = true;
                fieldData[index].isVisibleLinesShow= true;
            }
    
            console.log('event.target.name : ', event.target.name);
            console.log('event.target.value : ', event.target.value);
            fieldData[index][name] = event.target.value;
            this.fieldInformations = fieldData;
            console.log('this.fieldInformations ', this.fieldInformations);
        } catch (error) {
            console.log('error : ', error);
        }
    }
    
    handleFieldCheckBoxValueChange(event) {
        console.log('event.target.value handleObjectInputValueChange : ', event.target.value);
        let name = event.target.name;
        let index = event.currentTarget.dataset.index;
        let fieldData = JSON.parse(JSON.stringify(this.fieldInformations));
        fieldData[index][name] = event.target.checkeds;
        this.fieldInformations = fieldData;
        console.log('this.fieldInformations handleFieldCheckBoxValueChange: ',this.fieldInformations);
    }
    
    handleFieldBlurEventOnInput(event) {
        let name = event.target.name;
        let index = event.currentTarget.dataset.index;
        let fieldData = JSON.parse(JSON.stringify(this.fieldInformations));
        fieldData[index][name] = event.target.value;
        let value = event.target.value.replace(" ","_");
        fieldData[index]['fieldName'] = value;
        this.fieldInformations = fieldData;
        console.log('this.fieldInformations handleFieldInputValueChange: ',this.fieldInformations);
    }

// Object Values Control Panal
    handleObjectInputValueAndComboboxChange(event) {
        if(event.target.name == 'dataType' && event.target.value == 'Auto Number'){
                this.isFormatRequeried = true;
        } else if (event.target.name == 'dataType' && event.target.value == 'Text'){
            this.isFormatRequeried = false;
        }
        console.log('event.target.value handleObjectInputValueChange : ', event.target.value);
        let name = event.target.name;
        let objectData = this.objectInformations;
        objectData[name] = event.target.value;
        this.objectInformations = objectData;
        console.log('this.fieldInformations handleObjectInputValueAndComboboxChange: ',this.objectInformations);
    }

    handleObjectCheckboxValueChange(event) {
        console.log('event.target.value handleObjectInputValueChange : ', event.target.value);
        let name = event.target.name;
        let objectData = this.objectInformations;
        objectData[name] = event.target.checked;
        this.objectInformations = objectData;
        console.log('this.fieldInformations handleObjectCheckboxValueChange: ',this.objectInformations);
    }
    
    handleObjectRadioValueChange(event) {
        console.log('event.target.value handleObjectInputValueChange : ', event.target.value);
        let name = event.target.name;
        let objectData = this.objectInformations;
        objectData[name] = event.detail.value;
        this.objectInformations = objectData;
        console.log('this.fieldInformations handleObjectRadioValueChange: ',this.objectInformations);
    }

    handleClick() {
        this.showObjectInfo = true;
    }

    handleSubmit() {
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputCmp) => {
                inputCmp.reportValidity();
                return validSoFar && inputCmp.checkValidity();
            }, true);
        if (allValid) {
            console.log('All form entries look valid. Ready to submit!');
            console.log('this.fieldInformations : ', this.fieldInformations);
            this.objectInformations.fieldsArray = this.fieldInformations;
             console.log('this.objectInformations : ', this.objectInformations);
            getObjectAndFieldsData({objectInformations:JSON.stringify(this.objectInformations)}).then(result => {

            }).catch(error => {
                console.error('Error:', error);
            });
        } else {
            console.log('Please update the invalid form entries and try again.');
            return this.showNotification('Error', 'Please update the invalid form entries and try again.', 'error');
        }
    }


    get options() {
        return [
            { label: 'Open the standard Salesforce.com Help & Training window', value: 'Open the standard Salesforce.com Help & Training window' },
            { label: 'Open a window using a Visualforce page', value: 'Open a window using a Visualforce page' },
        ];
    }
    get deploaymentOptions() {
         return [
            { label: 'In Development', value: 'In Development' },
            { label: 'Deployed', value: 'Deployed' },
        ];
    }

     get objectDataTypes() {
        return [
            { label: 'Auto Number', value: 'Auto Number' },
            { label: 'Text', value: 'Text' },
        ];
     }
    
    get fieldDataTypes() {
        return [
            { label: 'AutoNumber', value: 'AutoNumber' },
            { label: 'Checkbox', value: 'Checkbox' },
            // { label: 'Currency', value: 'Currency' },
            { label: 'Date', value: 'Date' },
            // { label: 'Date/Time', value: 'Date/Time' },
            { label: 'Email', value: 'Email' },
            { label: 'Number', value: 'Number' },
            // { label: 'Percent', value: 'Percent' },
            // { label: 'Phone', value: 'Phone' },
            { label: 'Text', value: 'Text' },
            // { label: 'Text Area', value: 'TextArea' },
            { label: 'Text Area (Long)', value: 'LongTextArea' },
            // { label: 'Text Area (Rich)', value: 'RichTextArea' },
            // { label: 'Text (Encrypted)', value: 'Text (Encrypted)' },
            // { label: 'Time', value: 'Time' },
            // { label: 'URL', value: 'URL' },
        ];
    }

    
    showNotification(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}