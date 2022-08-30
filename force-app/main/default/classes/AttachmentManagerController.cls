public class AttachmentManagerController {
	public List<AttachmentModel> attachmenRecordList{get;set;}
    public List<AttachmentModel> objectRecordList{get;set;}
    public List<AttachmentModel> selectedObjectRecordList{get;set;}
    public List<Attachment> selectedAttachmentRecordList{get;set;}
    public List<SelectOption> objectOptions{get;set;}
    
    public String searchedName {get;set;}
    public String selectedAttachmentObject{get;set;}
    public String selectedRecordObject{get;set;}
    
    public Boolean hasShowRecord{get;set;}
    public Boolean allChecked{get;set;}
    public Boolean allSelected{get;set;}
    
    
    public AttachmentManagerController(){
        fillObjectSelectOptions();
        attachmenRecordList = new List<AttachmentModel>();
        objectRecordList = new List<AttachmentModel>();
        selectedObjectRecordList= new List<AttachmentModel>();
        selectedAttachmentRecordList = new List<Attachment>();
        hasShowRecord = false;
    }
    private void fillObjectSelectOptions(){
        Set<String> objectSelectOptions = new Set<String>();
        objectSelectOptions.add('Account');
        objectSelectOptions.add('Contact');
        objectSelectOptions.add('Opportunity');
        objectSelectOptions.add('Movie__c');
        objectOptions = new List<SelectOption>();
        objectOptions.add(new SelectOption('','-None-'));
        for(String options : objectSelectOptions){
            objectOptions.add(new SelectOption(options,options));
        }
    }
    
    public void showObjectList(){
        hasShowRecord = false;
        attachmenRecordList.clear();
        if(String.isNotBlank(selectedAttachmentObject)){
            String query = 'SELECT Id ,Name, Body, ContentType FROM Attachment WHERE ParentId in (SELECT Id From '+selectedAttachmentObject+')';
            List<Attachment> attachmentList = Database.query(query);
            for(Attachment att : attachmentList){
                AttachmentModel am = new AttachmentModel();
                am.attachment = att;
                attachmenRecordList.add(am);
            }
        }
    }
    
    public PageReference save(){
        list<Attachment> attachmentlist = new list<Attachment>();
        For(AttachmentModel om : selectedObjectRecordList){
            
            For(Attachment attach : selectedAttachmentRecordList){
                
                Attachment att = new Attachment(ParentId = om.recordId, Name = attach.Name,  
                                                Body = attach.Body, ContentType = attach.ContentType);
                attachmentlist.add(att);
            }
        }
        if(attachmentlist.size()>0){
            upsert attachmentlist;
        }
        PageReference pg = new PageReference('/apex/Attachment_Tab_Page');
        pg.setRedirect(true);
        return pg;
    }
    public void search(){
        String tempName= '%'+searchedName+'%';
        objectRecordList.clear();
        Switch on selectedRecordObject{
            when 'Account' {
                List<Account> accountList;
                If(String.isNotBlank(searchedName)){
                    accountList = [SELECT id , Name FROM Account WHERE Name Like : tempName];
                    
                }else{
                    accountList = [SELECT id , Name FROM Account];
                }  
                for(Account account : accountList){
                    AttachmentModel am = new AttachmentModel();
                    am.recordName = account.Name;
                    am.recordId = account.Id;
                    objectRecordList.add(am);
                }
            }
            when 'Opportunity' {
                List<Opportunity> opportunityList;
                If(String.isNotBlank(searchedName)){
                    opportunityList = [SELECT id , Name FROM Opportunity WHERE Name Like : tempName];
                    
                }else{
                    opportunityList = [SELECT id , Name FROM Opportunity];
                }  
                for(Opportunity opportunity : opportunityList){
                    AttachmentModel am = new AttachmentModel();
                    am.recordName = opportunity.Name;
                    am.recordId = opportunity.Id;
                    objectRecordList.add(am);
                }
            }
            when 'Contact' {
                List<Contact> contactList;
                If(String.isNotBlank(searchedName)){
                    contactList= [SELECT id , Name FROM Contact WHERE Name Like : tempName];
                }else{
                    contactList= [SELECT id , Name FROM Contact];
                }         
                for(Contact con : contactList){
                    AttachmentModel am = new AttachmentModel();
                    am.recordName = con.Name;
                    am.recordId = con.Id;
                    objectRecordList.add(am);
                }
            }
        }
    }
    
    public void selectAllRecords(){
        selectedObjectRecordList.clear();
        for(AttachmentModel am : objectRecordList){
            am.isSelected = allSelected;
            selectedObjectRecordList.add(am);
        }
    }
    public void selectedRecord(){
        Integer count = 0;
        selectedObjectRecordList.clear();
        for(AttachmentModel am : objectRecordList){
            if(am.isSelected){
                selectedObjectRecordList.add(am);
                count++;
            }
        }
        if(objectRecordList.size() == count){
            allSelected = true;
        }else{
            allSelected = false;
        }
    }
    public void allSelectedAttachments(){
        selectedAttachmentRecordList.clear();
        for(AttachmentModel cm : attachmenRecordList){
            selectedAttachmentRecordList.add(cm.attachment);
            cm.isChecked = allChecked;
        }
    }
    public void selectedAttachment(){
        Integer count = 0;
        selectedAttachmentRecordList.clear();
        for(AttachmentModel attach : attachmenRecordList){
            if(attach.isChecked){
                count++;
                selectedAttachmentRecordList.add(attach.attachment);
            }
        }
        if(attachmenRecordList.size() == count){
            allChecked = true;
        }else{
            allChecked = false;
        }
    }
    public void back(){
        hasShowRecord = false;
    }
    public void copy(){
         hasShowRecord = false;
        for(AttachmentModel attach : attachmenRecordList){
            if(attach.isChecked){
                hasShowRecord = True;
            }
        }
        if(!hasShowRecord){
            ApexPages.addmessage(new ApexPages.message(ApexPages.severity.WARNING,'Please Select Atleast One Attachment'));
        }
    }
    public class AttachmentModel{
        public Boolean isChecked{get;set;}
        public Boolean isSelected{get;set;}
        public Attachment attachment{get;set;}
        public String recordName{get;set;}
        public String recordId{get;set;}
    }
}