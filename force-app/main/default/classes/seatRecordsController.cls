public without sharing class seatRecordsController {
    
    @AuraEnabled(cacheable=true)
    public static List<Seat_Category__c> getSeatsRecord(){
      return [SELECT Id, Name, Price__c, (SELECT Id, Seat_Category__c, Name, Status__c, CreatedDate FROM Seats__r ORDER BY Name) FROM Seat_Category__c ORDER BY Price__c DESC];

    }
}