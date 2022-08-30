public class BookingController {
    public Booking__c booking{set;get;}
    public List<Booking__c> bookings{set; get;}
    public id bid{get;set;}
    public BookingController(){
        String bid  = ApexPages.currentPage().getParameters().get('bid');
        if(String.isNotBlank(bid))
        {
            bookings = [SELECT id,Name,Room__c,Customer__c,Status__c,Check_In__c,Check_Out_Time__c,Email__c
                        FROM Booking__c WHERE id=: bid];
            if(bookings.isEmpty()){
                booking = new Booking__c();
            }else{
                booking = bookings.get(0);
            }
        }
        else
        {
            bookings = [SELECT id,Name,Room__c,Customer__c,Status__c,Check_In__c,Check_Out_Time__c,Email__c
                        FROM Booking__c];
            booking = new Booking__c();
        }
    }
    public PageReference save(){
        try{
            upsert booking;
            PageReference pg = new PageReference('/' + booking.Id);
            return pg;   
        }
        catch(Exception e){
            ApexPages.addMessages(e);
            return null;
        }
    }
    public void saveandnew(){
        try{
            upsert booking;
            booking = new Booking__c();
        }
        catch(Exception e){
            ApexPages.addMessages(e);    
        }
    }
    
    public PageReference edit(){        
        PageReference pg = new PageReference('/apex/BookingDetail?bid=' + bid);
        pg.setRedirect(true);
        return pg;
    }
    public PageReference view(){        
        PageReference pg = new PageReference('/apex/BookingOutputFeildPage?bid=' + bid);
        pg.setRedirect(true);
        return pg;
    }
    public PageReference BookingList(){        
        PageReference pg = new PageReference('/apex/BookingListPage');
        pg.setRedirect(true);
        return pg;
    }
    public void quicksave()
    {
        
        upsert booking;
    }
    public PageReference back(){        
        PageReference pg = new PageReference('/apex/BookingDetail');
        pg.setRedirect(true);
        return pg;
    }
}