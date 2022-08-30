public without sharing class ShowBookingsController {
    
    @AuraEnabled
    public static List<Movie__c> getMovies(String recordId){
        return [Select Id, Name, Show_StartTime__c FROM Movie__c WHERE Id =:recordId];
    }

    @AuraEnabled
    public static List<Seat_Booking__c> getMovieShowByDate(Date bookingdate){
        return [Select Id, Status__c, Movie__c, ShowTime__c, Total_Seat__c, Booking_Date__c, OwnerId,(Select Id, Name, Seat__c, Seat_Bookings__c, Seat_Category__c FROM Seat_Booking_Line_Items__r) FROM Seat_Booking__c WHERE Booking_Date__c =:bookingdate AND Status__c != 'Completed'];
    }

     @AuraEnabled
     public static String createBookingAndLineitems(Seat_Booking__c booking, List<Seat_Booking_Line_Item__c> bookingLineItems, Date selectedDate){
        List<Seat_Booking__c> seatBookingObjList = new List<Seat_Booking__c>();
        String currentUserId = UserInfo.getUserId();
        seatBookingObjList = [Select Id, Status__c, Movie__c, In_Progress__c, ShowTime__c, Total_Seat__c, Booking_Date__c, OwnerId FROM Seat_Booking__c WHERE OwnerId =: currentUserId AND Booking_Date__c =: selectedDate AND Status__c = 'Upcoming' AND In_Progress__c = false AND Movie__c =: booking.Movie__c];
        if(seatBookingObjList.size() > 0){
            try {
                System.debug('Data: '+bookingLineItems);
                System.debug('booking: '+booking);
                if(booking != null && bookingLineItems != null && !bookingLineItems.isEmpty()){
                    //insert booking;
                    for(Seat_Booking_Line_Item__c lineItemObj : bookingLineItems){
                        lineItemObj.Seat_Bookings__c = seatBookingObjList[0].Id;
                    }
                    upsert bookingLineItems;
                }
                return 'UPDATED';
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());    
            }
        }else{
            try {
                System.debug('Data: '+bookingLineItems);
                System.debug('booking: '+booking);
                if(booking != null && bookingLineItems != null && !bookingLineItems.isEmpty()){
                    insert booking;
                    for(Seat_Booking_Line_Item__c lineItemObj : bookingLineItems){
                        lineItemObj.Seat_Bookings__c = booking.Id;
                    }
                    insert bookingLineItems;
                }
                return 'SUCCEEDED';
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());    
            }
        }
        
    }
}