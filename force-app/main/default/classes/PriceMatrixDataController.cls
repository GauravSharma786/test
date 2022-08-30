public without sharing class PriceMatrixDataController {
    @AuraEnabled(cacheable=true)
    public static List<	Price_Matrix__c> getPriceMatrixData(){
        String userId = UserInfo.getUserId();
            return [Select Id, Name, IsActive__c, (Select Id, Name, Price_Matrix__c, Input_Data__c, Output_Data__c FROM Matrix_Data__r) FROM Price_Matrix__c WHERE IsActive__c = true];
    }

    @AuraEnabled
    public static string insertMatrixData(Matrix_Data__c matrixDataObj){
                insert matrixDataObj;
        return 'SUCCEEDED';
    }

    @AuraEnabled
    public static string updateAccounts( Object data ) {
        system.debug('data'+data);
        List < Matrix_Data__c > accsForUpdate = ( List < Matrix_Data__c > ) JSON.deserialize(
            JSON.serialize( data ),
            List < Matrix_Data__c >.class
        );
        try {
            update accsForUpdate;
            return 'Success: Matrix_Data__c(s) updated successfully';
        }
        catch (Exception e) {
            return 'The following exception has occurred: ' + e.getMessage();
        }

    }

    @AuraEnabled
    public static String createJson(Object data ,Object data2){
        List <WrapperClass> wrapperList = ( List <WrapperClass> ) JSON.deserialize(
            JSON.serialize( data ),
            List <WrapperClass>.class
        );
        List <WrapperClass> wrapperList2 = ( List <WrapperClass> ) JSON.deserialize(
            JSON.serialize( data2 ),
            List <WrapperClass>.class
        );
        Map<Id, WrapperClass> wrapperMap = new Map<Id, WrapperClass>();
        List<WrapperClass> wrapperList3 = new List<WrapperClass>();
        List<Matrix_Data__c> matrixList = new List<Matrix_Data__c>();
        system.debug('wrapperList'+wrapperList.size());
        system.debug('wrapperList2'+wrapperList2.size());
        for(WrapperClass wrapperObj : wrapperList2){
            wrapperMap.put(wrapperObj.id,wrapperObj);
        }
        for(WrapperClass wrapperObj : wrapperList){
            WrapperClass obj = wrapperMap.get(wrapperObj.id);
            obj.AttributeName = wrapperObj.AttributeName!= null ?wrapperObj.AttributeName:obj.AttributeName;
            obj.AttributeValue = wrapperObj.AttributeValue!= null ?wrapperObj.AttributeValue:obj.AttributeValue;
            obj.ProductName = wrapperObj.ProductName!= null ?wrapperObj.ProductName:obj.ProductName;
            obj.ProductCode = wrapperObj.ProductCode!= null ?wrapperObj.ProductCode:obj.ProductCode;
            obj.MRP = wrapperObj.MRP!= null ?wrapperObj.MRP:obj.MRP;
            obj.GST = wrapperObj.GST!= null ?wrapperObj.GST:obj.GST;
            obj.TargetProductName = wrapperObj.TargetProductName!= null ?wrapperObj.TargetProductName:obj.TargetProductName;
            obj.TargetProductCode = wrapperObj.TargetProductCode!= null ?wrapperObj.TargetProductCode:obj.TargetProductCode;
            wrapperList3.add(obj);
            Matrix_Data__c matrixObj = new Matrix_Data__c();
            matrixObj.Id = wrapperObj.Id;
            matrixObj.Input_Data__c = '{"AttributeName":"'+obj.AttributeName+'","AttributeValue":"'+obj.AttributeValue+'","ProductName":"'+obj.ProductName+'","ProductCode":"'+obj.ProductCode+'"}';
            matrixObj.Output_Data__c = '{"MRP":"'+obj.MRP+'","GST":"'+obj.GST+'","TargetProductName":"'+obj.TargetProductName+'","TargetProductCode":"'+obj.TargetProductCode+'"}';
            matrixList.add(matrixObj);
        }
        system.debug('matrixList'+matrixList);
        update matrixList;
        system.debug('wrapperList'+wrapperList);
        string Outputget= JSON.serialize(wrapperList); 
        system.debug(Outputget);
        return Outputget;

    }

    public class WrapperClass{
        @AuraEnabled public String id;
        @AuraEnabled public String AttributeName;
        @AuraEnabled public String AttributeValue;
        @AuraEnabled public String ProductName;
        @AuraEnabled public String ProductCode;
        @AuraEnabled public String MRP;
        @AuraEnabled public String GST;
        @AuraEnabled public String TargetProductName;
        @AuraEnabled public String TargetProductCode;
    }
}
