public class AttachmentInlineController {
	Public Attachment attachment{get;set;}
    Public Attachment recentAttachment{get;set;}
    private Id conId;
    public AttachmentInlineController(ApexPages.StandardController s){
        conId = s.getId();
        recentAttachment = getAttachment();
        attachment = new Attachment(ParentId = conId);
    }
    private Attachment getAttachment(){
        list<String> contant = new List<String>{'image/jpeg' , 'image/png'};
        list<Attachment> attachmentlist = new list<Attachment>
            ([SELECT Id , Name , Body , ContentType , ParentId FROM Attachment WHERE ParentId = :conId AND ContentType in: contant 
              ORDER BY CreatedDate DESC LIMIT 1]);
        if(attachmentlist.size()>0){
            return attachmentlist.get(0);
        }else{
            return new Attachment();
        }
        
     }
    
    public void save(){
        try{
             Upsert attachment;
        }Catch(Exception e){
            ApexPages.addMessages(e);
        }
    }
}