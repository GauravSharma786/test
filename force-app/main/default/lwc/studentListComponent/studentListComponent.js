import { LightningElement, track } from 'lwc';
import pubSub from 'c/pubsubComponent';
import getStudentList from '@salesforce/apex/StudentListController.getStudentList';

export default class StudentListComponent extends LightningElement {
    city;
    studentList;
    studentId;

    connectedCallback(){
        console.log('Hello');
        pubSub.subscribe("sendcity", value=> {
            console.log('city',value);
            this.city = value;
            console.log('result', this.city);
           this.getAccounts();
        });
        
       
        
    }

    getAccounts(){
        console.log('Hey');
        getStudentList({city : this.city}).then(result => {
            console.log('result',result);
            this.studentList = result;
            console.log('result2',this.accountList);
        }).catch(error => {
            console.log('error',error);
        });
    }

    handleClick(event){
        this.studentId = event.target.value;
        console.log('Id',this.studentId);
    }
}