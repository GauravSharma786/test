public class AttacmentSubqueryController {

    
      public list<Contact> contactList{get;set;}
   
    public AttacmentSubqueryController(){
        contactList = [SELECT Id, Name,Email,Phone, (SELECT Id FROM Attachments) From Contact];
    }
}