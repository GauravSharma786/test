public without sharing class SeatBookingController {
    
    @AuraEnabled(cacheable=true)
    public static List<Movie__c> getMoviesList(){
        try {
            return [SELECT Id, Name, Show_StartTime__c FROM Movie__c];
        } catch (Exception e) {
            throw new AuraHandledException('Darn it! Something went wrong: ' + e.getMessage());   
        } 
    }
    
    @AuraEnabled(cacheable=true)
    public static List<SeatBookingModel> getSeatsRecord(String movieId , Date bookingDate){
        List<SeatBookingModel> seatBookingList = new  List<SeatBookingModel>();
        List<Seat_Category__c> seatCategorys =[SELECT Id, Name, Price__c, (SELECT Id, Seat_Category__c, Name, Status__c FROM Seats__r ORDER BY Name) FROM Seat_Category__c];
    

    Map<Id, Seat_Booking_Line_Item__c> seatBookingLineItemMap = new Map<Id, Seat_Booking_Line_Item__c>();
    
        for(Seat_Booking_Line_Item__c seatlineitemobj : [Select Id, Seat_Bookings__r.OwnerId, Name, Seat__c, Seat_Bookings__c, Seat_Category__c, Seat_Bookings__r.Booking_Date__c FROM Seat_Booking_Line_Item__c WHERE Seat_Bookings__r.Movie__c =: movieId AND Seat_Bookings__r.Booking_Date__c =: bookingDate]){
            seatBookingLineItemMap.put(seatlineitemobj.Seat__c, seatlineitemobj);
        }

        for(Seat_Category__c seatCategoryObj : seatCategorys){

                SeatBookingModel seatBookModal = new SeatBookingModel();
                seatBookModal.seatCategory = seatCategoryObj;

                List<SeatBookingLineItemModel> bookingLineItemList = new List<SeatBookingLineItemModel>();
                for(Seat__c seatObj : seatcategoryobj.Seats__r){
                    SeatBookingLineItemModel sbliObj = new SeatBookingLineItemModel();
                    sbliObj.id = seatObj.Id;
                    sbliObj.name = seatObj.Name;
                    sbliObj.isBooked = seatBookingLineItemMap.containsKey(seatObj.Id);
                    sbliObj.styleClass = 'slds-box slds-p-around_medium slds-text-align_center seats';
                    sbliObj.styleClass += sbliObj.isBooked ? ' booked-alluser-seat' : '';
                    if(seatBookingLineItemMap.containsKey(seatObj.Id) && (seatBookingLineItemMap.get(seatObj.Id).Seat_Bookings__r.OwnerId == UserInfo.getUserId())){
                        sbliObj.styleClass = 'slds-box slds-p-around_medium slds-text-align_center seats booked-currentuser-seat';
                    }
                    bookingLineItemList.add(sbliObj);
                }
                seatBookModal.bookingLineItemList = bookingLineItemList;
                seatBookingList.add(seatBookModal);
                
            }
        return seatBookingList;

    }

    public class SeatBookingModel{
        @AuraEnabled public List<SeatBookingLineItemModel> bookingLineItemList; 
        @AuraEnabled public Seat_Category__c seatCategory;
    }

    public class SeatBookingLineItemModel{
        @AuraEnabled public String id; 
        @AuraEnabled public String name; 
        @AuraEnabled public Boolean isBooked;
        @AuraEnabled public String styleClass;
    }


}