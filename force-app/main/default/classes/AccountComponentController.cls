public class AccountComponentController{
    public Id accountId{get;set;}
    public Account account;
    public Account getAccount(){
        account = [Select Id , Name , Type , Phone, OwnerId, salary__c, CreatedDate, Father_Name__c, password__c 
                              FROM Account WHERE Id =: accountId];
       return account;
    }
}