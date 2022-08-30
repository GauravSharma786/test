public without sharing class UserBookingDetailController {
    
    @AuraEnabled(cacheable=true)
    public static List<Seat_Booking__c> getUserBookingDetails(){
        String userId = UserInfo.getUserId();
            return [Select Id, Status__c, OwnerId, In_Progress__c, ShowTime__c, Booking_Date__c, Total_Amount__c, Total_Seat__c, Movie__c, Movie__r.Name, (Select Id, Seat__c, Seat_Category__c, Seat__r.Name, Seat_Category__r.Name FROM Seat_Booking_Line_Items__r) FROM Seat_Booking__c WHERE OwnerId =:userId];
    }

    @AuraEnabled(cacheable=true)
    public static List<movieModel> getUserUpcomingShowsDetails(){
        String userId = UserInfo.getUserId();
        Map<Id , Seat_Booking__c> movieListMap = new Map<Id , Seat_Booking__c>([Select Id, Status__c, OwnerId, In_Progress__c, ShowTime__c, Booking_Date__c, Total_Amount__c, Total_Seat__c, Movie__c, Movie__r.Name, (Select Id, Seat__c, Seat_Category__c, Seat__r.Name, Seat_Category__r.Name FROM Seat_Booking_Line_Items__r) FROM Seat_Booking__c WHERE OwnerId =:userId AND Status__c ='Upcoming' AND In_Progress__c = false]);
        Set<Id> newSet = new Set<Id>();
        list<movieModel> movieModelList = new List<movieModel>();

        for(Seat_Booking__c seatbookingobj : movieListMap.values()){
            newSet.add(seatbookingobj.Movie__c);
        }
        

        Map<String , String> mapContentDocumentIds = new Map<String ,String>();
        for(ContentDocumentLink conobj : [SELECT Id, ContentDocumentId, LinkedEntityId FROM ContentDocumentLink WHERE LinkedEntityId IN :newSet]){
            mapContentDocumentIds.put(conobj.ContentDocumentId, conobj.LinkedEntityId);
        }
        Map<String, String> linkedAndContentVersionIdMap = new Map<String, String>(); 
        for(ContentVersion contentobj : [SELECT Id, Description, ContentDocumentId FROM ContentVersion WHERE  ContentDocumentId IN : mapContentDocumentIds.keySet()]){
            if(mapContentDocumentIds.containsKey(contentobj.ContentDocumentId))   {
                linkedAndContentVersionIdMap.put(mapContentDocumentIds.get(contentobj.ContentDocumentId) , contentobj.Id); 
            } 
            
        }
        for(Seat_Booking__c seatbookingObj : movieListMap.values()){
            String movieId = linkedAndContentVersionIdMap.containsKey(seatbookingObj.Movie__c)?linkedAndContentVersionIdMap.get(seatbookingObj.Movie__c):'';
            movieModel seatsBookingObj = new movieModel(seatbookingObj , movieId);
            movieModelList.add(seatsBookingObj);
        }

        return movieModelList;

    }

    @AuraEnabled
    public static String bookingStatusCanceled(String bookingId){
        List<Seat_Booking__c> bookingRecords = new List<Seat_Booking__c>([Select Id, Name, Status__c FROM Seat_Booking__c WHERE Id =: bookingId]);
            
            if(bookingRecords.size() > 0){
                Seat_Booking__c bookingRecord = bookingRecords.get(0);
                try {
                    bookingRecord.Status__c = 'Canceled';
                    update bookingRecord;

                    return 'SUCCEEDED';
                } catch (Exception e) {
                    throw new AuraHandledException(e.getMessage()); 

                }
            }
        return 'false';
    }

    public class movieModel{

        @AuraEnabled public Seat_Booking__c seatBooking;
         @AuraEnabled public String movieId;
         
         public movieModel(Seat_Booking__c seatBooking , String movieId) {
             this.seatBooking = seatBooking;
             this.movieId = movieId;
             
         }
     }
}   
