public class BookingListController {
      public List<Booking__c> bookings{set;get;}
    public BookingListController(){
         bookings = [SELECT id,Name,Room__c,Customer__c,Status__c,Check_In__c,Check_Out_Time__c,Email__c
                     		 FROM Booking__c];
    }

}