import { LightningElement, api, track } from "lwc";

export default class ProgressbarChild extends LightningElement {
  @api pbValue;
  @track error;

  handleChange(e) {
    this.pbValue = e.target.value;
    //console.log(this.pbValue);

    // creating a custom event to send data to parent
    const onChangeEvent = new CustomEvent("changepbvalue", {
      detail: this.pbValue
    });

    // dispatching event
    this.dispatchEvent(onChangeEvent);
    // if (e.target.value >= 0 && e.target.value <= 100) {
    //   this.error = "";
    //   this.pbValue = e.target.value;

    //   // creating a custom event to send data to parent
    //   const onChangeEvent = new CustomEvent("onchangepbvalue", {
    //     detail: { inputValue: this.pbValue, hello: "hello" }
    //   });

    //   // dispatching the event
    //   this.dispatchEvent(onChangeEvent);
    // } else {
    //   this.error = "Enter numbers between 1 and 100";
    // }
  }
}
