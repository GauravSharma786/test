trigger AccountTrigger on Account (before update) {
    Map<Id,Account> accountRecordMap = trigger.newMap;
    List<Opportunity> opportunityRecordList =[Select Id , AccountId , Stage_Type__c FROM Opportunity 
                                         WHERE AccountId in:(accountRecordMap.keySet())];
    
    if(trigger.isBefore) {
         for(Opportunity opportunity :opportunityRecordList){
           Account account = accountRecordMap.get(opportunity.AccountId);
            if(account.Account_Type__c==null)
                opportunity.Stage_Type__c = '0'; 
            else if(account.Account_Type__c.equalsIgnoreCase('Reseller'))
                opportunity.Stage_Type__c = '10';
            else if(account.Account_Type__c.equalsIgnoreCase('Buyer'))
                opportunity.Stage_Type__c = '25';
            else 
                opportunity.Stage_Type__c = '100';
        }
        
        if(opportunityRecordList.size()>0){
            update opportunityRecordList;
        }
    }
}