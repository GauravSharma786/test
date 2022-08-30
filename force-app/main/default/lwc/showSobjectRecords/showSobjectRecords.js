import { LightningElement, wire, track } from 'lwc';
import getObjects from '@salesforce/apex/showSobjectRecordsControllerLWC.getObjects';
import { CurrentPageReference } from 'lightning/navigation';
import getFields from '@salesforce/apex/showSobjectRecordsControllerLWC.getObjectFields';
import getRecords from '@salesforce/apex/showSobjectRecordsControllerLWC.getRecords';
export default class ShowSobjectRecords extends LightningElement {

    @wire(CurrentPageReference) pageRef;
    @track selectedObject;
    @track sObjectList = [];
    @track fieldList = [];
    @track _selected = [];
    @track recordsOfObject = '';
    @track columns = [];
    title;
    @track selectedRecord;

    @wire(getObjects)
    objectList({ data, error }) {
        if (data) {
            this.sObjectList.push(data);
            console.log('data : ', data);
        }
        if (error) {
            console.log('error=>', error);
        }
    }

    get listOfObject() {
        let temp = [];
        for (let key in this.sObjectList[0]) {
            if (this.sObjectList[0].hasOwnProperty(key)) {
                let obj = { label: this.sObjectList[0][key], value: key };
                temp.push(obj);
            }
        }
        return temp;
    }

    handlesObjectValue(event) {
        console.log('event.target.value : ', event.target.value);
        this.recordsOfObject = '';
        this.selectedObject = event.target.value;
        this.fieldsOfsObject(event.target.value);
    }

    fieldsOfsObject(data) {
        getFields({ objectName: data }).then(result => {
            this._selected = [];
            this.publishFields();
            this.fieldList = result;
            console.log('this.fieldList : ',this.fieldList);
        }).catch(error => {
            console.log('Error=>', error);
        })
    }

    get fieldsOfObject() {
        let temp = [];
        for (let key in this.fieldList) {
            if (this.fieldList.hasOwnProperty(key)) {
                let obj = { label: this.fieldList[key], value: key };
                temp.push(obj);
            }
        }
        return temp;
    }
    handleChange(event) {
        console.log('OUTPUT : ',event.detail.value);
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

        let obj = { field: temp, object: this.selectedObject };
        console.log('publishFields : ', obj);
        if (obj.field.length) {
            this.recordOfObject(obj);
        }
    }

    recordOfObject(data){
        let fields = [];
        data.field.forEach(item =>{
           fields.push(item.fieldName);
        });

        this.columns = data.field;
        let fieldNames = fields.join(',');
        // this.objectName = data.object;
        this.title = 'List of ' + this.selectedObject;
        
        getRecords({ fields: fieldNames, objectName: this.selectedObject }).then(result => {
            console.log('result Data : ',result);
            this.recordsOfObject = result.length > 0 ? result : ''; 
        }).catch(error=>{
            this.recordsOfObject = [];
            console.log('Error=>',error);
        })
    }
    
}