public class AccountFieldSetController {
    public String queryString{get;set;}
    public List<Account> accList{get;set;}
    public AccountFieldSetController(){
        queryString = 'select id';
        for(Schema.FieldSetMember fld :SObjectType.Account.FieldSets.accountFieldSet.getFields()) {
            queryString += ', ' + fld.getFieldPath();
        }
        queryString += ' from Account';
        acclist = Database.query(queryString);
    }
}