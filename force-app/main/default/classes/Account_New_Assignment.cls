public class Account_New_Assignment {
    public List<Account> accounts{get;set;}
    public list<SelectOption> accountOptions{get;set;}
    public String selectedAccount{get;set;}
    public Boolean showForm{get;set;}
    public Account account{get;set;}
    public List<Contact> contactRecords{get;set;}
    
    public Account_New_Assignment(){
        contactRecords = new List<Contact>();
        showForm = false;
        account = new Account();
        accountOptions =  new list<SelectOption>();
        accountOptions.add(new SelectOption('','--None--'));
        accounts = [Select Id , Name, BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry FROM Account];
        for(Account acc : accounts){
            accountOptions.add(new SelectOption(acc.Id,acc.Name));
        }
    }
    public void showForms(){
        showForm = true;
         for(Account acc : accounts){
             if(acc.id == selectedAccount){
                 account = acc;
                 break;
             }
         }
    }
    public void saveRecord(){
        contactRecords = [SELECT Id , Name , MailingStreet, MailingCity, MailingState, MailingPostalCode, MailingCountry,
                          AccountId FROM Contact Where AccountId =: selectedAccount];
        if(contactRecords.size()>0){
            for(Contact con : contactRecords){
                con.MailingStreet = account.BillingStreet;
                con.MailingCity = account.BillingCity;
                con.MailingState = account.BillingState;
                con.MailingPostalCode = account.BillingPostalCode;
                con.MailingCountry  = account.BillingCountry; 
            }
            upsert contactRecords;
        }
        
    }
    
    
}