import { LightningElement } from 'lwc';
import pubSub from 'c/pubsubComponent';

export default class StudentDetailsComponent extends LightningElement {
    enteredCity;

    handlechange(event){
        this.enteredCity = event.target.value;   
      //  console.log('Entered City',this.enteredCity);
    }
    handleClick(){
       console.log('value',this.enteredCity);
       const city = this.enteredCity;
        pubSub.publish("sendcity",city);
    }
}