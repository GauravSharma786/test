public class AccountController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(){
        List<Account> accounts = new List<Account>();
        accounts = [Select Id, Name, Phone, Type, BillingCity from Account ];
        return accounts;
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getRecordData(Id accountId){
        return [Select Id, Name, Total_Contact__c,Gender__c, Phone, Type from Account WHERE Id =: accountId LIMIT 1];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountByCity(String city){
        return [Select Id, Name, BillingCity, Phone, Type from Account WHERE BillingCity =: city];
    }
}