import { LightningElement, track } from "lwc";

export default class ProgressbarParent extends LightningElement {
  @track progressValue;

  handleChange(e) {
    this.progressValue = e.detail;
  }
}
