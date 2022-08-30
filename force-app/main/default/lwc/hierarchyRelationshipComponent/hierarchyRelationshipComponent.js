import { LightningElement, track } from 'lwc';

export default class HierarchyRelationshipComponent extends LightningElement {
    keyIndex = 0;
    contactKeyIndex;
    showContactRow = false;
    //@track accountName;

    @track mainList = [
                {
                    id: 0,
                    accountName: '',
                    accountPhone: '',
                    accountAddress: '',
                    accountDescription: '',
                    contactList: [],
                    contactId: 0
                }
   
    ];

    handleClick() {
        ++this.keyIndex;
        var newItem = [{
            id: this.keyIndex,
            accountList: [
                {
                    id: 0,
                    accountName: '',
                    accountPhone: '',
                    accountAddress: '',
                    accountDescription: '',
                    contactList: [],
                    contactId: 0
                }
            ],
            accountId: 0
        }];
        this.mainList = this.mainList.concat(newItem);
    }

    addRow(event) {
        console.log('event.target.accessKey : ', event.target.accessKey);
        let tempList = [];

        this.mainList.forEach(element => {
            if (element.id === parseInt(event.target.accessKey)) {
                if (element.accountList.length < 4) {
                    ++element.accountId;
                    //  if (element.accountId < 4) {
                    element.accountList.push({
                        id: element.accountId,
                        contactList: [],
                        contactId: 0
                    });

                    //  }
                }
            }
            tempList.push(element);
        });
        this.mainList = tempList;
        console.log('this.mainList : ', this.mainList);
    }
    addContact(event) {
        this.mainList.forEach(element => {
            if (element.id === parseInt(event.target.accessKey)) {
                element.accountList = element.accountList.filter(function (element1) {
                    if (parseInt(element1.id) === parseInt(event.target.name)) {

                        element1.contactList.push({
                            id: element1.contactId,
                        });
                        ++element1.contactId;
                    }
                    return element1;
                });

            }
        });

        console.log('this.mainList contact add time: ', this.mainList);
    }

    removeRow(event) {
        console.log('Coming in remove');
        console.log('event.target.accessKey : ', event.target.accessKey);
        console.log('event.target.accessKey : ', event.target.name);
        this.mainList = this.mainList.filter(function (element) {
            if (element.id === parseInt(event.target.accessKey)) {
                if (element.accountList.length >= 2) {
                    element.accountList = element.accountList.filter(function (element1) {
                        return parseInt(element1.id) !== parseInt(event.target.name);
                    });
                }
            }
            return element;
        });
        console.log('this.mainList2 : ', this.mainList);
    }

    removeContactRow(event) {
        console.log('event.target.name : ', event.target.name);
        console.log('event.target.accessKey : ', event.target.accessKey);
        console.log('event.target.alternativetext : ', event.target);
        this.mainList = this.mainList.filter(function (element) {
            if (element.id === parseInt(event.target.accessKey)) {
                element.accountList = element.accountList.filter(function (element1) {
                    if (parseInt(element1.id) === parseInt(event.target.name)) {
                        element1.contactList = element1.contactList.filter(function (element2) {
                            return parseInt(element2.id) !== parseInt(event.target.alternativeText);
                        });
                    }
                    return element1
                });
            }
            return element;
        });
        console.log('OUTPthis.itemListUT 23232: ', this.mainList);
    }

    handleChange(event) {
        console.log('this.mainList : ', this.mainList);
        console.log('event.target.dataset.accountindex : ', event.target.dataset.accountindex);
        console.log('event.target.dataset.parentid : ', event.target.dataset.parentid);
        //console.log('event.terget.value : ', event.terget.value);
        // let value = event.terget.value;

        let accountName;
        let accountPhone;
        let accountAddress;
        let accountDescription;
        // let firstName;
        // let lastName;
        // let Phone;
        // let email;

        if (event.target.name == 'accountName') {
            accountName = event.target.value;
        } else if (event.target.name == 'accountPhone') {
            accountPhone = event.target.value;
        } else if (event.target.name == 'accountAddress') {
            accountAddress = event.target.value;
        } else if (event.target.name == 'accountDescription') {
            accountDescription = event.target.value;
        } //else if (event.target.dataset.id == 'firstName') {
        //     firstName = value;
        // } else if (event.target.dataset.id == 'lastName') {
        //     lastName = value;
        // } else if (event.target.dataset.id == 'Phone') {
        //     Phone = value;
        // } else if (event.target.dataset.id == 'email') {
        //     email = value;
        // }

        console.log('event.target.value : ', event.target.value);
        console.log('accountName : ', accountName);
        console.log('accountPhone : ', accountPhone);
        console.log('accountAddress : ', accountAddress);
        console.log('accountDescription : ', accountDescription);
        // console.log('firstName : ', firstName);
        // console.log('lastName : ', lastName);
        // console.log('Phone : ', Phone);
        // console.log('email : ', email);

    }

}


        //  this.mainList = tempList;

        // this.itemList = this.itemList.filter(function (element) {
        //     if (parseInt(element.id) === parseInt(event.target.accessKey)) {
        //         element.contactList.push({
        //             id: element.contactId,
        //         });
        //         ++element.contactId;
        //     }
        //     console.log('element : ', element);
        //     return element;
        // });






        // this.mainList = this.itemList.filter(function (element) {
        //     if (element.id === parseInt(event.target.accessKey)) {
        //         this.mainList = this.itemList.filter(function (element) {

        //         });
        //         element.contactList = element.contactList.filter(function (element) {
        //             return parseInt(element.id) !== parseInt(event.target.value);
        //         });

        //     }
        //     return element;
        // });
		
		List<Daily_Price_Movement__c> lstDailyPriceMovement = new List<Daily_Price_Movement__c>([Select Id, Date__c, Commodity__c, Price__c FROM Daily_Price_Movement__c WHERE Commodity__c IN (\'PI FG (DAP-Delhi)\',\'PI FG (DAP-Ludhiana)\')]);
List<North_Market_Information__c> northMarketInformations = [Select Id, PI_FG_DAP_Delhi__c, PI_FG_DAP_Ludhiana__c FROM North_Market_Information__c]; 
                                                                                                                                                                                        
Map<Date, Map<String, Decimal>> dailyPriceByCommodityMap = new Map<Date, Map<String, Decimal>>();
for(Daily_Price_Movement__c obj : lstDailyPriceMovement){
    if(dailyPriceByCommodityMap.containsKey(obj.Date__c)){
        if(dailyPriceByCommodityMap.get(obj.Date__c).containsKey(obj.Commodity__c)){
            dailyPriceByCommodityMap.get(obj.Date__c).get(obj.Commodity__c).put(obj.Price__c);
        }else{
            dailyPriceByCommodityMap.get(obj.Date__c).put(obj.Commodity__c,obj.Price__c);
        }
    }else{
        dailyPriceByCommodityMap.put(obj.Date__c, new Map<String, Decimal>{obj.Commodity__c, obj.Price__c});
    }
}
  List<North_Market_Information__c> updatedNorthMarketList = new List<North_Market_Information__c>();
 for(North_Market_Information__c northMarketObj : northMarketInformations){
     if(dailyPriceByCommodityMap.containsKey(northMarketObj.Date__c)){
         northMarketObj.PI_FG_DAP_Delhi__c = dailyPriceByCommodityMap.get(northMarketObj.Date__c).get('PI FG (DAP-Delhi)');
         northMarketObj.PI_FG_DAP_Ludhiana__c = dailyPriceByCommodityMap.get(northMarketObj.Date__c).get('PI FG (DAP-Ludhiana)');
         updatedNorthMarketList.add(northMarketObj);
     }
 }  
                                                                                                                                                                                        
update updatedNorthMarketList;    