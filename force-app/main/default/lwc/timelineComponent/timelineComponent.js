import { LightningElement, api, wire,track } from 'lwc';
import getChildObjectsData from '@salesforce/apex/TimeLineController.getChildObjectsData';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class TimeLineComponent extends LightningElement() {
    @api recordId;
    @api objectApiName;
    @track objectInfo;

    
    connectedCallback() {
        console.log('recordId : ', this.recordId);
        console.log('objectApiName : ', this.objectApiName);
    }

    @wire(getObjectInfo, { objectApiName: '$objectApiName' })
    objectInfo({ error, data }) {
      if (data) {
          console.log('Data', data);
          console.log('Data childRelationships ', data.childRelationships);

          let childData = data.childRelationships.map(element => {
              let obj = {
                  childObjectName:element.childObjectApiName,
                  fieldName: element.fieldName,
                  childRelationShipApiName: element.relationshipName
              }
              return obj;
        });
        
          console.log('OUTPUT : ',JSON.stringify(childData));
          console.log('OUTPUT childData: ',childData);
       
          let test = { childs: childData };
            getChildObjectsData({data:JSON.stringify(test)})
            .then(result => {
                console.log('result  :-   ', result);
            })
            .catch(error => {
                this.error = error;
            });
          
      } else if (error) {
         console.error('Error:', error);
      }
    }


    //  childOptions() {
    //     let childRelationship = [];
    //     if (this.objectInfo) {
    //         if (this.objectInfo.data) {
    //             if (this.objectInfo.data.childRelationships) {
    //                 for (var i = 0; i < this.objectInfo.data.childRelationships.length; i++) {
    //                     childRelationship.push({
    //                         label: this.objectInfo.data.childRelationships[i].childObjectApiName,
    //                         value: this.objectInfo.data.childRelationships[i].childObjectApiName
    //                     });
    //                 }
    //             }
    //         }
    //     }
    //     console.log('childRelationship: ',childRelationship); 
    // }

    //  childRelationshipInformation() {
    //     let childRelationInfo;
    //     if (this.objectInfo) {
    //         if (this.objectInfo.data) {
    //             if (this.objectInfo.data.fields) {
    //                 for (var i = 0; i < this.objectInfo.data.childRelationships.length; i++) {
    //                     if (this.objectInfo.data.childRelationships[i].childObjectApiName === this.childRelationShipApiName) {
    //                         childRelationInfo = this.objectInfo.data.childRelationships[i];
    //                         break;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     console.log('childRelationInfo? JSON.stringify(childRelationInfo : ',childRelationInfo); 
    // }
    // renderedCallback(){
    //     getChildObjectsData({recordId:this.recordId})
    //         .then(result => {
    //             this.contacts = result;
    //         })
    //         .catch(error => {
    //             this.error = error;
    //         });       }
    
}
