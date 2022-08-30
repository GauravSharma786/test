trigger ContactTrigger on Contact (after insert , after update){
    Map<Id, List<Contact>> accountContactListMap = new Map<Id, List<Contact>>();
    Map<Id, String> ContactListMap = new Map<Id, String>();
    
    List<Account> accountRecordList = new List<Account>();
    List<Contact> contactRecordList = new List<Contact>();
    Set<Id> accounttIds = new Set<Id>();   
    
    if(trigger.isInsert || trigger.isUpdate) {
        for(Contact Con : trigger.New) {
            if(String.isNotBlank(Con.AccountId)){
                accounttIds.add(Con.AccountId); 
            } 
        } 
        list<Contact> conList = new List<Contact>(trigger.old);
        for(Contact Con :conList) {
            if(String.isNotBlank(Con.AccountId)){
                accounttIds.add(Con.AccountId); 
            }  
        } 
    }
    if(accounttIds.size() > 0){
        contactRecordList = [SELECT Id, AccountId , Email FROM Contact WHERE AccountId IN : accounttIds AND Email != null];
        for(Contact Con : contactRecordList) {
            if(!accountContactListMap.containsKey(Con.AccountId)){
                accountContactListMap.put(Con.AccountId, new List<Contact>());
            }
            accountContactListMap.get(Con.AccountId).add(Con); 
            
             if(ContactListMap.get(Con.AccountId)==null){
                ContactListMap.put(Con.AccountId, Con.Email);
            }
        }
        accountRecordList = [SELECT Id,Total_Contact__c ,Primary_Contact_Email__c , Primary_Contact_Id__c
                           FROM Account WHERE Id IN :(accounttIds)];
        for(Account account : accountRecordList) {
            List<Contact> contactList = new List<Contact>();
            contactList = accountContactListMap.get(account.Id);
            account.Total_Contact__c  = contactList != null?contactList.size():0;
            account.Primary_Contact_Email__c = ContactListMap.get(account.Id);
        }
        update accountRecordList;   
    }
}