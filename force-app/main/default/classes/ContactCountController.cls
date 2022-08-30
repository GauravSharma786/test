public class ContactCountController {
    public List<AccountModel> accountModelList{get;set;}
    private List<Account> accountList;
    public Boolean isChecked{get;set;}
    
    public ContactCountController(){
        accountModelList = new List<AccountModel>();
        accountList = new List<Account>();
        accountList = [SELECT Name, (SELECT Name FROM Contacts ) FROM Account];
        for(Account account : accountList){
            AccountModel accountmodel = new AccountModel();
            accountmodel.account = account;
            accountmodel.count = account.contacts.size();
            accountModelList.add(accountmodel);
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(){
        return [SELECT Id, Name, (SELECT Name FROM Contacts ) FROM Account];
        
    }

    public class AccountModel {
        public Integer count{get;set;}
        public Account account{get;set;}
    }
}