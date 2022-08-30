public class ObjectRecordComponentController {
    public String objName{get;set;}
 
    public List<Sobject> getObjectRecords(){
        String query= 'Select Id , Name , Email , Phone  From ' + objName;
        return new List<Sobject>(Database.query(query));
    }
}