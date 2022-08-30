import { LightningElement } from "lwc";

export default class MovieCard extends LightningElement {
  data;
  connectedCallback() {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=c1170061498943378849f69296c295fd"
    )
      .then((response) => {
        this.data = response.data;
        console.log(this.data);
      })
      .catch((err) => {
        console.log("Error => ", err.message);
      });
  }
}
