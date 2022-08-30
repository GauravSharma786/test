public class AccountContactCountController {
    public List<AccountContactModel> accountContactModels {get;set;}
    public AccountContactCountController(){
        accountContactModels = new List<AccountContactModel>();
        //loadDataV1();
       
        //loadDataV2();
       
        loadDataV3();
    }
//Version v1
    private void loadDataV1(){
        List<Account> accounts = getAccounts();
        Set<Id> accountIds = new Set<Id>();
        for(Account acc : accounts){
            accountIds.add(acc.Id);
        }
        List<Contact> contacts = getContacts(accountIds);
       
        for(Account acc : accounts){
            Integer count = 0;
            for(Contact con : contacts){
                if(con.AccountId == acc.Id){
                count++;    
                }
            }
            accountContactModels.add(new AccountContactModel(acc, count));
           
        }
       
    }
    //Version V2
    private void loadDataV2(){
        Map<Id, Account> accountMap = getAccountMap();
        Set<Id> accountIds = accountMap.keySet();
       
        List<Contact> contacts = getContacts(accountIds);
       
        for(Id accId : accountMap.keySet()){
            Account acc = accountMap.get(accId);
            Integer count = 0;
            for(Contact con : contacts){
                if(con.AccountId == acc.Id){
                count++;    
                }
            }
            accountContactModels.add(new AccountContactModel(acc, count));
           
        }
       
    }
   
    //Version V3
    private void loadDataV3(){
        Map<Id, Account> accountMap = getAccountMap();
        Set<Id> accountIds = accountMap.keySet();
       
        List<Contact> contacts = getContacts(accountIds);
        Map<Id, List<Contact>> contactMap = new Map<Id, List<Contact>>();
       
        for(Contact con : contacts){
        List<Contact> contactList = contactMap.get(con.AccountId);
            if(contactList == null){
                contactList = new List<Contact>();
            }
            contactList.add(con);
            contactMap.put(con.AccountId, contactList);
        }
        //Set<Id> ids = accountMap.keySet();
        for(Id accId : accountMap.keySet()){
            Account acc = accountMap.get(accId);
            Integer count = 0;
            List<Contact> contactList = contactMap.get(accId);
            if(contactList != null){
                count = contactList.size();
            }
            accountContactModels.add(new AccountContactModel(acc, count));
           
        }
       
    }
   
    private Map<Id, Account> getAccountMap(){
    /*Map<Id, Account> accountMap = new Map<Id, Account>();
        List<Account> accounts = [SELECT Id, Name FROM Account];
        for(Account acc : accounts){
            accountMap.put(acc.Id, acc);
        }*/
       
        Map<Id, Account> accountMap = new Map<Id, Account>([SELECT Id, Name FROM Account]);
        return accountMap;
    }
   
    private List<Account> getAccounts(){
    return [SELECT Id, Name FROM Account];    
    }  
   
    private List<Contact> getContacts(Set<Id> accountIds){
    return [SELECT Id, Name, AccountId FROM Contact where AccountId IN: accountIds];    
    }
   
    public class AccountContactModel{
        public Account acc {get;set;}
        public Integer totalContacts {get;set;}
        public AccountContactModel(Account acc, Integer totalContacts ){
            this.acc = acc;
            this.totalContacts = totalContacts;
        }
    }
}