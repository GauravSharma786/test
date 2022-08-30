public class AggregateController{
    public list<Contact> contacts{get;set;}
   
    public AggregateController(){
        contacts = getContactList();
    }
    private list<Contact> getContactList(){
        return new list<Contact>([SELECT Id, Name , Email,Phone, (SELECT Id FROM Attachments) From Contact]);
    }
}