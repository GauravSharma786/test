public class AccountAggregateController {
    public List<accountModel> accountModelList{get;set;}
    Map<String , Integer> contactMap;
    public List<Account> accounts{get;set;}
    
    public AccountAggregateController(){
        accountModelList = new List<accountModel>();
        contactMap = new Map<String , Integer>();
        accounts = [SELECT Id, Name, ParentId FROM Account];
        getAccountContactsCount();
    }
    
   private void getAccountContactsCount(){
        List<AggregateResult> aggResults = [SELECT count(Id) totalContacts, AccountId FROM Contact GROUP BY AccountId];
        System.debug('## Size: ' + aggResults.size());
       for(AggregateResult ar : aggResults){
           Integer count = (Integer)ar.get('totalContacts');
           Id accountId = (Id)ar.get('AccountId');
           System.debug('## AccountId: ' + accountId + ', Total Contacts: ' + count);  
           contactMap.put(accountId,count);
       }
       for(Account account : accounts){
           accountModel am = new accountModel();
           if(contactMap.containsKey(account.id)){
               am.name = account.Name;
               am.count = contactMap.get(account.Id);
               accountModelList.add(am);
           }else{
                am.name = account.Name;
               	am.count = 0;
               accountModelList.add(am);
           }
       }
       
    }
    
    public class accountModel{
        public string name{get;set;}
        public Integer count{get;set;}
   }
}