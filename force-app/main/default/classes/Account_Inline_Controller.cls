public class Account_Inline_Controller {
    public List<Contact> parentsRecord{get;set;}
    public List<Contact> noParentRecords{get;set;}
    public List<AccountModel> contactParentRecords{get;set;}
    public List<AccountModel> contactNoParentRecords{get;set;}
    private Id accId; //fgfgdf
    
    public Account_Inline_Controller(ApexPages.StandardController s){
        accId = s.getId();
        contactParentRecords = new List<AccountModel>();
        contactNoParentRecords = new List<AccountModel>();
        parentsRecord = [Select Id , Name FROM Contact WHERE AccountId =: accId ];
        noParentRecords = [Select Id , Name FROM Contact WHERE AccountId = null];
        loadData();
    }
    public void loadData(){
        for(Contact con :parentsRecord){
            AccountModel am = new AccountModel();
            am.parent = con;
            
            contactParentRecords.add(am);
        }
        for(Contact con :noParentRecords){
            AccountModel am = new AccountModel();
            am.parent = con;
             
            contactNoParentRecords.add(am);
        }
    }
    public void remove(){
         List<AccountModel> removeRecords = new List<AccountModel>();
        List<AccountModel> temprecords = new List<AccountModel>();
         for(AccountModel con : contactParentRecords){
            if(con.isChecked){
                con.parent.AccountId = null;
                con.isChecked = false;
                removeRecords.add(con);
            }else{
                temprecords.add(con);
            }
            
        }
        contactParentRecords = temprecords;
        contactNoParentRecords.addAll(removeRecords);
    }
    public void add(){
        List<AccountModel> removeRecords = new List<AccountModel>();
        List<AccountModel> temprecords = new List<AccountModel>();
        for(AccountModel con : contactNoParentRecords){
            if(con.isChecked){
                con.parent.AccountId = accId;
                con.isChecked = false;
                removeRecords.add(con);
            }else{
                temprecords.add(con);
            }
          
        }
        contactNoParentRecords = temprecords;
        contactParentRecords.addAll(removeRecords);
        //count = contactParentRecords.size();
    }
    public void save(){
		List<Contact> contactRecords = new List<Contact>(); 
        for(AccountModel am : contactParentRecords){
            contactRecords.add(am.parent);
        }
        for(AccountModel amm : contactNoParentRecords){
            contactRecords.add(amm.parent);
        }
         try{
             upsert contactRecords;
        }Catch(Exception e){
            ApexPages.addMessages(e);
        }
        
    }
    public class AccountModel{
        public Contact parent{get;set;}
        public Boolean isChecked{get;set;}
    }
    
}