import { LightningElement , api , wire} from 'lwc';
import {getListUi} from 'lightning/uiListApi';
import ACCOUNT_OBJ from '@salesforce/schema/Account';

export default class ShowListOfRecord extends LightningElement {
    accountData;
    @wire(getListUi  , {
        listViewId : '00B5g0000099BftEAE'
    }) accountList({error , data}){
        if(data){
            //console.log('$$$ DATA '+JSON.stringify(data));    
            this.accountData = data.records.records;
           // console.log('@@ Data ' +this.accountData);
        }else{
            console.log('### error' +error);
        }
    }
}