import { LightningElement } from 'lwc';
import {additionNumber} from './myJs';
export default class CalculaterComponent extends LightningElement {
    firstNumber;
    secondNumber;
    resultValue;

    onChangeNumberOne(event){
        this.firstNumber = parseInt(event.target.value);
    }
    onChangeNumbertwo(event){
        this.secondNumber = parseInt(event.target.value);
    }

    addition(event){
        this.resultValue = additionNumber(parseInt(this.firstNumber),parseInt(this.secondNumber),'+');
    }
    multification(event){
        this.resultValue = additionNumber(parseInt(this.firstNumber),parseInt(this.secondNumber),'*');
    }
    subtraction(event){
        this.resultValue = additionNumber(parseInt(this.firstNumber),parseInt(this.secondNumber),'-');
    }
    division(event){
        this.resultValue = additionNumber(parseInt(this.firstNumber),parseInt(this.secondNumber),'/');
    }
    mode(event){
        this.resultValue = additionNumber(parseInt(this.firstNumber),parseInt(this.secondNumber),'%');
    }
}