public class Attachment_Tab_Controller{
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
    
    
    public Attachment_Tab_Controller(){
        fillObjectSelectOptions();
        attachmenRecordList = new List<AttachmentModel>();
        objectRecordList = new List<AttachmentModel>();
        selectedObjectRecordList= new List<AttachmentModel>();
        selectedAttachmentRecordList = new List<Attachment>();
        hasShowRecord = false;
    }
    @Testvisible
    private void fillObjectSelectOptions(){
        Set<String> objectSelectOptions = new Set<String>();
        objectSelectOptions.add('Account');
        objectSelectOptions.add('Contact');
        objectSelectOptions.add('Opportunity');
        objectOptions = new List<SelectOption>();
        objectOptions.add(new SelectOption('','-None-'));
        for(String options : objectSelectOptions){
            objectOptions.add(new SelectOption(options,options));
        }
    }
    
    public void showAttachmentsList(){
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
    public void search(){
        String querys;
        if(selectedRecordObject != null){
        String tempName= '\'%'+searchedName+'%\'';
        objectRecordList.clear();
        
        If(String.isNotBlank(selectedRecordObject)){
             querys = 'SELECT id , Name FROM '+ selectedRecordObject +' WHERE Name Like ' + tempName;
        }else{
             querys = 'SELECT id , Name FROM ' + selectedRecordObject;
        }
        List<Sobject> queryList = Database.query(querys);
      
        for(Sobject sobj : queryList){
            AttachmentModel am = new AttachmentModel();
            am.recordName = (String)sobj.get('Name');
            am.recordId = sobj.Id;
            objectRecordList.add(am);
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
    public class AttachmentModel{
        public Boolean isChecked{get;set;}
        public Boolean isSelected{get;set;}
        public Attachment attachment{get;set;}
        public String recordName{get;set;}
        public String recordId{get;set;}
    }
}