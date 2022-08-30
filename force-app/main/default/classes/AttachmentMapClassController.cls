public class AttachmentMapClassController {
    public list<AttachmentModel> attachmentModelList{get;set;}
    public String cid{get;set;}
    public Attachment attachment {get;set;}
    public AttachmentMapClassController(){
        attachment = new Attachment();
        cid  = ApexPages.currentPage().getParameters().get('cid');
        attachmentModelList = new List<AttachmentModel>();
        loadAttacData();
    }
    public void loadAttacData(){
        Map<id , Contact> contactMap = getContactMap();
        Set<id> conIds = contactMap.keySet();
        
        List<Attachment> attachments = getAttachments(conIds);
        Map<Id, List<Attachment>> attachmentMap = new Map<Id, List<Attachment>>();
        
        for(Attachment att : attachments){
            List<Attachment> attachmentList = attachmentMap.get(att.ParentId);
            if(attachmentList == null){
                attachmentList = new List<Attachment>();
            }
            attachmentList.add(att);
            attachmentMap.put(att.ParentId, attachmentList);
        }
        //Set<Id> ids = accountMap.keySet();
        for(Id conId : contactMap.keySet()){
            Contact cont = contactMap.get(conId);
            Integer count = 0;
            String recentAttachmentId = '';
            List<Attachment> attachmentsList = attachmentMap.get(conId);
            if(attachmentsList != null){
                count = attachmentsList.size();
                recentAttachmentId = '/servlet/servlet.FileDownload?file='+attachmentsList.get(0).id;
            }
            attachmentModelList.add(new AttachmentModel(cont, count , recentAttachmentId));
        }
    }
    private Map<Id, Contact> getContactMap(){
        Map<Id, Contact> contactMap = new Map<Id, Contact>([SELECT Id, FirstName FROM Contact]);
        return contactMap;
    }
    private List<Attachment> getAttachments(Set<Id> conIds){
        return new List <Attachment>([SELECT Id, ParentId FROM Attachment Where ParentId in: conIds ORDER BY CreatedDate DESC]);    
    }
    public PageReference uploadAttachment(){
        PageReference pg = new PageReference('/apex/New_Attachment_Page?cid=' + cid);
        pg.setRedirect(true);
        return pg;
    }
    public PageReference upload() {        
        attachment.ParentId = cid;
        PageReference pg = new PageReference('/apex/AttachmentMapPage');
        try {
            insert attachment;
        } catch (Exception e) {
            ApexPages.addMessages(e);
            return null;
        } 
        pg.setRedirect(true);
        return pg;
    }
    public class AttachmentModel{
        public Contact contact{get;set;}
        public Integer totalAttachments {get;set;}
        public String recentAttachment{get;set;}
        public AttachmentModel(Contact contact, Integer totalAttachments,String recentAttachment){
            this.contact = contact;
            this.totalAttachments = totalAttachments;
            this.recentAttachment = recentAttachment;
        }
    }
}