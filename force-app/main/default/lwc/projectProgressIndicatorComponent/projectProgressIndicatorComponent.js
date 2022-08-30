import { LightningElement, wire, track, api } from "lwc";
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import STATUS from '@salesforce/schema/Project__c.Status__c';
//import getProjectRecordList from "@salesforce/apex/ProgressBarController.getProjectRecordList";

export default class ProjectProgressIndicatorComponent extends LightningElement {
  @api recordId;
  @track currentStep = "New";

  @wire(getRecord, { recordId: "$recordId" , fields: STATUS})
  project;

  get status(){
    return getFieldValue(this.project.data, STATUS);
  }

  connectedCallback() {
    console.log("OUTPUT : ", this.recordId);
  }
}