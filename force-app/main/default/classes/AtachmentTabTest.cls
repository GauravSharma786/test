@isTest
private class AtachmentTabTest {
    
    @isTest
    private static void getAccountAttachmentObjectController(){
        Account acc= new Account(Name='Test Class 1');
        insert acc;
        Attachment attachment = new Attachment(ParentId = acc.Id,Name = 'Test Attachment',Body = Blob.valueOf('Test Data'));
        insert attachment;
        Attachment_Tab_Controller atobj = new Attachment_Tab_Controller();
        atobj.selectedAttachmentObject='Account';
        atobj.showAttachmentsList();
        atobj.attachmenRecordList.get(0).isChecked = true;
        atobj.selectedAttachment();
        atobj.allSelectedAttachments();
        atobj.copy();
        atobj.selectedRecordObject='Account';
        atobj.searchedName='a';
        atobj.search();
        atobj.objectRecordList.get(0).isSelected = true;
        atobj.save();
        atobj.back();
    }
    @isTest
    private static void getContactAttachmentObjectController(){
        Contact con= new Contact(LastName='Test LastName 2');
        insert con;
        Attachment attachment = new Attachment(ParentId = con.Id,Name = 'Test Attachment2',Body = Blob.valueOf('Test Data2'));
        insert attachment;
        Attachment_Tab_Controller atobj = new Attachment_Tab_Controller();
        atobj.selectedAttachmentObject='Contact';
        atobj.showAttachmentsList();
        atobj.attachmenRecordList.get(0).isChecked = true;
        atobj.selectedAttachment();
        atobj.allSelectedAttachments();
        atobj.copy();
        atobj.selectedRecordObject='Contact';
        atobj.searchedName='a';
        atobj.search();
        atobj.objectRecordList.get(0).isSelected = true;
        atobj.selectedRecord();
        atobj.selectAllRecords();
        atobj.save();
        atobj.back();
    }
    @isTest
    private static void getNegativeContactAttachmentObjectController(){
        Contact con= new Contact(LastName='Test LastName 2');
        insert con;
        Attachment attachment = new Attachment(ParentId = con.Id,Name = 'Test Attachment2',Body = Blob.valueOf('Test Data2'));
        insert attachment;
        Attachment_Tab_Controller atobj = new Attachment_Tab_Controller();
        atobj.selectedAttachmentObject='Contact';
        atobj.showAttachmentsList();
        atobj.attachmenRecordList.get(0).isChecked = false;
        atobj.selectedAttachment();
        atobj.allSelectedAttachments();
        atobj.copy();
        //atobj.hasShowRecord = false;
        //atobj.selectedRecordObject='Contact';
        //atobj.searchedName='a';
        atobj.search();
        // atobj.objectRecordList.get(0).isSelected = true;
        atobj.selectedRecord();
        atobj.selectAllRecords();
        atobj.save();
        atobj.back();
    }
    /*
    @isTest
    private static void getfillObjects(){
        Attachment_Tab_Controller atobj = new Attachment_Tab_Controller();
        Account acc= new Account(Name='Test Class 1', Department__c ='Sales');
        insert acc;
        
        Attachment attachment = new Attachment(ParentId = acc.Id,Name = 'Test Attachment',Body = Blob.valueOf('Test Data'));
        insert attachment;
        atobj.fillObjectSelectOptions();
        
        atobj.selectedAttachmentObject='Account';
        atobj.showObjectList();
    }
    @isTest
    private static void getAccountAttachmentRecordsList(){
        Attachment_Tab_Controller atobj = new Attachment_Tab_Controller();
        atobj.selectedAttachmentObject='Account';
        atobj.showObjectList();
    }
    @isTest
    private static void getContactAttachmentRecordsList(){
        Attachment_Tab_Controller atobj = new Attachment_Tab_Controller();
        atobj.selectedAttachmentObject='Contact';
        atobj.showObjectList();
    }
    @isTest
    private static void getOpportunityAttachmentRecordsList(){
        Attachment_Tab_Controller atobj = new Attachment_Tab_Controller();
        atobj.selectedAttachmentObject='Opportunity';
        atobj.showObjectList();
    }
    @isTest
    private static void getSave(){
        Attachment_Tab_Controller atobj = new Attachment_Tab_Controller();
        atobj.save();
    }
    @isTest
    private static void getAccountSearch(){
        Attachment_Tab_Controller atobj = new Attachment_Tab_Controller();
        
        atobj.searchedName='Account';
        atobj.search();
        
    }
    @isTest
    private static void getContactSearch(){
        Attachment_Tab_Controller atobj = new Attachment_Tab_Controller();
        atobj.search();
        atobj.searchedName='Contact';
    }
    @isTest
    private static void getOpportunitySearch(){
        Attachment_Tab_Controller atobj = new Attachment_Tab_Controller();
        atobj.search();
        atobj.searchedName='Opportunity';
    }
    @isTest
    private static void getSelectedAllRecords(){
        Attachment_Tab_Controller atobj = new Attachment_Tab_Controller();
        atobj.selectAllRecords();
    }
    @isTest
    private static void getSelectedRecord(){
        Attachment_Tab_Controller atobj = new Attachment_Tab_Controller();
        atobj.selectedRecord();
    }
    @isTest
    private static void getSelectedAllAttachments(){
        Attachment_Tab_Controller atobj = new Attachment_Tab_Controller();
        atobj.allSelectedAttachments();
    }
    @isTest
    private static void getSelectedAttachment(){
        Attachment_Tab_Controller atobj = new Attachment_Tab_Controller();
        atobj.selectedAttachment();
    }
    @isTest
    private static void getBack(){
        Attachment_Tab_Controller atobj = new Attachment_Tab_Controller();
        atobj.back();
    }
    @isTest
    private static void getcopy(){
        Attachment_Tab_Controller atobj = new Attachment_Tab_Controller();
        atobj.copy();
    }*/
        
        }