import { LightningElement, wire, track } from "lwc";
import getAccounts from "@salesforce/apex/AccountController.getAccounts";
import { columns } from "./utils";

export default class Assignment8 extends LightningElement {
  @track accounts;
  @track error;
  @track columns = columns;
  @track iconName = "utility:chevronright";

  @wire(getAccounts)
  wiredAccounts({ error, data }) {
    if (error) {
      this.error = error.message;
      this.wiredAccounts = undefined;
      console.log("Error => ", this.error);
    } else if (data) {
      this.accounts = data;
      this.error = undefined;
      console.log("Data => ", this.accounts);
    }
  }

  handleClick(e) {
    console.log(e);
  }
}
