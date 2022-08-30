import { LightningElement , track , wire} from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import getObjects from '@salesforce/apex/showSobjectRecordsControllerLWC.getRecords';
import { registerListener } from 'c/pubSubComponent';
import { CurrentPageReference } from 'lightning/navigation'; 

export default class ShowRecordsOfSobject extends LightningElement {

    @wire(CurrentPageReference) pageRef;
    @track objectName;
    @track recordsOfObject = '';
    @track columns = [];
    title;
    @track selectedRecord;

    connectedCallback(){
        registerListener("fieldsOfObject",this.fieldsOfObject,this);
    }

    fieldsOfObject(data){
        this.selectedRecord = '';
        let fields = [];
        data.field.forEach(recordApi =>{
           fields.push(recordApi.fieldName);
        });
        this.columns = data.field;
        let fieldNames = fields.join(',');
        this.objectName = data.object;
        this.title = 'List of ' + this.objectName;
        
        getObjects({fields : fieldNames , objectName : this.objectName}).then(result=>{
            this.recordsOfObject = result.length > 0 ? result : ''; 
        }).catch(error=>{
            this.recordsOfObject = [];
            console.log('Error=>',error);
        })
    }

    getSelectedName(event){
        let selectRows = event.detail.selectedRows;
        if (selectRows.length == 1){
            this.selectedRecord =  selectRows[0];
        }
    }

    handleSubmit(event){
        const recordInput = event.detail.fields;
        updateRecord(recordInput)
        .then(() => {
            this.showModal();
        })
        .catch(error => {
            console.log(error);
        });
    }

    showModal(){
            this.selectedRecord = '';  
    }
}