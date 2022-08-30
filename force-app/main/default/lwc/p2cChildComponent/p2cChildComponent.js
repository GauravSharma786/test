import { LightningElement , api } from 'lwc';

export default class P2cChildComponent extends LightningElement {
    @api parentvalue;
    childDetails = 
    {
        "india": {
            src:"https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png",
            header:"India",
            description:"India Detail",
            text:"My India"
        },
        "america" : {
            src:"https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg",
            header:"America",
            description:"America Detail",
            text:"America Is The "
        },
        "japan" : {
            src:"https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1200px-Flag_of_Japan.svg.png",
            header:"Japan",
            description:"Japan Detail",
            text:"My japan"
        }
    };
    get obj(){
        let obj;
        if(this.parentvalue != null){
            obj = this.childDetails[this.parentvalue]
        }else{
            obj ={
                src:'',
                header:'',
                description:'',
                text: ''
            }
        }
        return obj;
    }
    /*src = this.childDetails[parentvalue].src;
    header = this.childDetails[parentvalue].header;
    description = this.childDetails[parentvalue].description;
    text = this.childDetails[parentvalue].text;*/
    
}