public class MetadataServiceUtility {
    @AuraEnabled
    public static void getObjectAndFieldsData(String objectInformations){
        system.debug('objectInformations'+objectInformations);
        system.debug('Object == '+parse(objectInformations));
        
        JSON2Apex obj = parse(objectInformations);
        system.debug('fieldsArray '+obj.fieldsArray);
        createObject(obj.objectApiName,obj.objectName,obj.objectPluralName);
        createField(obj.objectApiName,obj.fieldsArray);
       // createAutoNumberField(obj.objectApiName,obj.fieldsArray);
        
        /*createObject(obj.objectApiName,obj.objectName,obj.objectPluralName);
        for(FeldsArray obj2 : obj.fieldsArray){
            if(obj2.fieldDataType == 'Text'){
                createField(obj.objectApiName,obj.fieldsArray);
            }else if(obj2.fieldDataType == 'AutoNumber'){
               // createAutoNumberField(obj.objectApiName,obj.fieldsArray);
            }
            
        }*/
    }
    
    public static void createObject(String fullName,String label,String pluralLabel)
    {
        MetadataService.MetadataPort service = createService();
        MetadataService.CustomObject customObject = new MetadataService.CustomObject();
        customObject.fullName = fullName+'__c';
        customObject.label = label;
        customObject.pluralLabel = pluralLabel;
        customObject.nameField = new MetadataService.CustomField();
        customObject.nameField.type_x = 'AutoNumber';
        customObject.nameField.label = 'Test Record';
        customObject.nameField.displayFormat = 'AN-{0000}';
        customObject.nameField.startingNumber = 1;
        customObject.deploymentStatus = 'Deployed';
        customObject.sharingModel = 'ReadWrite';
        List<MetadataService.SaveResult> results =
            service.createMetadata(
                new MetadataService.Metadata[] { customObject });
        handleSaveResults(results);
    }
    
    // Text Field
    public static void createField(String objectName,List<FeldsArray> fieldsArray)
    {
        MetadataService.MetadataPort service = createService();
        List<MetadataService.Metadata> customfieldConfigMetadata = new List<MetadataService.Metadata>();
        
        for(FeldsArray obj : fieldsArray){
            if(obj.fieldDataType == 'Text'){
                MetadataService.CustomField customField = new MetadataService.CustomField();
                customField.fullName = objectName+'__c.'+obj.fieldName+'__c';
                customField.label = obj.fieldLabel;
                customField.type_x = 'Text';
                customField.length = Integer.valueOf(obj.length);
                customfieldConfigMetadata.add(customField);
            }else if(obj.fieldDataType == 'AutoNumber'){
                MetadataService.CustomField customField = new MetadataService.CustomField();
                customField.fullName = objectName+'__c.'+obj.fieldName+'__c';
                customField.label = obj.fieldLabel;
                customField.type_x = 'AutoNumber';
                customField.displayFormat = obj.displayFormat;
                customField.startingNumber = Integer.valueOf(obj.startingNumber);
                customfieldConfigMetadata.add(customField);
            }else if(obj.fieldDataType == 'LongTextArea'){
                MetadataService.CustomField customField = new MetadataService.CustomField();
                customField.fullName = objectName+'__c.'+obj.fieldName+'__c';
                customField.label = obj.fieldLabel;
                customField.type_x = 'LongTextArea';
                customField.length = Integer.valueOf(obj.length);
                customField.visibleLines = Integer.valueOf(obj.visibleLines);
                customfieldConfigMetadata.add(customField);
            }else if(obj.fieldDataType == 'Checkbox'){
                MetadataService.CustomField customField = new MetadataService.CustomField();
                customField.fullName = objectName+'__c.'+obj.fieldName+'__c';
                customField.label = obj.fieldLabel;
                customField.type_x = 'Checkbox';
                customfieldConfigMetadata.add(customField);
            }else if(obj.fieldDataType == 'Date'){
                MetadataService.CustomField customField = new MetadataService.CustomField();
                customField.fullName = objectName+'__c.'+obj.fieldName+'__c';
                customField.label = obj.fieldLabel;
                customField.type_x = 'Date';
                customField.defaultValue = 'False';
                customfieldConfigMetadata.add(customField);
            }else if(obj.fieldDataType == 'Email'){
                MetadataService.CustomField customField = new MetadataService.CustomField();
                customField.fullName = objectName+'__c.'+obj.fieldName+'__c';
                customField.label = obj.fieldLabel;
                customField.type_x = 'Email';
                customField.required = Boolean.valueOf(obj.isRequired);
                customField.unique = Boolean.valueOf(obj.isUnique);
                customfieldConfigMetadata.add(customField);
            }else if(obj.fieldDataType == 'Number'){
                MetadataService.CustomField customField = new MetadataService.CustomField();
                customField.fullName = objectName+'__c.'+obj.fieldName+'__c';
                customField.label = obj.fieldLabel;
                customField.type_x = 'Number';
                customField.length = Integer.valueOf(obj.length);
                customField.scale = Integer.valueOf(obj.decimalPlaces);
                customField.required = Boolean.valueOf(obj.isRequired);
                customField.unique = Boolean.valueOf(obj.isUnique);
                customfieldConfigMetadata.add(customField);
            }
            
        }
        
        if(customfieldConfigMetadata.size() > 0){
            List<MetadataService.SaveResult> results = service.createMetadata(customfieldConfigMetadata);
            handleSaveResults(results);
            
        }
        //List<MetadataService.SaveResult> results = service.createMetadata(customfieldConfigMetadata);
        //handleSaveResults(results);
    }
    
    // Auto Number Field
     public static void createAutoNumberField(String objectName,List<FeldsArray> fieldsArray)
     {
         MetadataService.MetadataPort service = createService();
         List<MetadataService.Metadata> customfieldConfigMetadata = new List<MetadataService.Metadata>();
         
         for(FeldsArray obj : fieldsArray){
             if(obj.fieldDataType == 'AutoNumber'){
                 MetadataService.CustomField customField = new MetadataService.CustomField();
                 customField.fullName = objectName+'__c.'+obj.fieldName+'__c';
                 customField.label = obj.fieldLabel;
                 customField.type_x = 'AutoNumber';
                 customField.displayFormat = obj.displayFormat;
                 customField.startingNumber = Integer.valueOf(obj.startingNumber);
                 customfieldConfigMetadata.add(customField);
             }
             
         }
         
         List<MetadataService.SaveResult> results = service.createMetadata(customfieldConfigMetadata);
         handleSaveResults(results);
    }
    
    // This is Object and Field creation Configration
    public class MetadataServiceExamplesException extends Exception { }
    
    public static MetadataService.MetadataPort createService(){
        MetadataService.MetadataPort service = new MetadataService.MetadataPort();
        service.SessionHeader = new MetadataService.SessionHeader_element();
        service.SessionHeader.sessionId = getSessionIdFromVFPage(); //UserInfo.getSessionId();
        return service;
    }
    
    public static String getSessionIdFromVFPage(){
        String content = Page.GetSessionId.getContent().toString();
        Integer s = content.indexOf('Start_Of_Session_Id') + 'Start_Of_Session_Id'.length(),
            e = content.indexOf('End_Of_Session_Id');
        return content.substring(s, e);
    }
    
    public static void handleSaveResults(List<MetadataService.SaveResult> saveResult)
    {
        for(MetadataService.SaveResult obj : saveResult){
            if(obj==null || obj.success)
                return;
        // Construct error message and throw an exception
        if(obj.errors!=null)
        {
            List<String> messages = new List<String>();
            messages.add(
                (obj.errors.size()==1 ? 'Error ' : 'Errors ') +
                'occured processing component ' + obj.fullName + '.');
            for(MetadataService.Error error : obj.errors)
                messages.add(
                    error.message + ' (' + error.statusCode + ').' +
                    ( error.fields!=null && error.fields.size()>0 ?
                     ' Fields ' + String.join(error.fields, ',') + '.' : '' ) );
            if(messages.size()>0)
                throw new MetadataServiceExamplesException(String.join(messages, ' '));
        }
            if(!obj.success)
                throw new MetadataServiceExamplesException('Request failed with no specified error.');
        }
        // Nothing to see?
        
    }
    
    /**
* Example helper method to interpret a SaveResult, throws an exception if errors are found
**/
    public static void handleDeleteResults(MetadataService.DeleteResult deleteResult)
    {
        // Nothing to see?
        if(deleteResult==null || deleteResult.success)
            return;
        // Construct error message and throw an exception
        if(deleteResult.errors!=null)
        {
            List<String> messages = new List<String>();
            messages.add(
                (deleteResult.errors.size()==1 ? 'Error ' : 'Errors ') +
                'occured processing component ' + deleteResult.fullName + '.');
            for(MetadataService.Error error : deleteResult.errors)
                messages.add(
                    error.message + ' (' + error.statusCode + ').' +
                    ( error.fields!=null && error.fields.size()>0 ?
                     ' Fields ' + String.join(error.fields, ',') + '.' : '' ) );
            if(messages.size()>0)
                throw new MetadataServiceExamplesException(String.join(messages, ' '));
        }
        if(!deleteResult.success)
            throw new MetadataServiceExamplesException('Request failed with no specified error.');
    }
    
    /**
* Example helper method to interpret a UpsertResult, throws an exception if errors are found
**/
    public static void handleUpsertResults(MetadataService.UpsertResult upsertResult)
    {
        // Nothing to see?
        if(upsertResult==null || upsertResult.success)
            return;
        // Construct error message and throw an exception
        if(upsertResult.errors!=null)
        {
            List<String> messages = new List<String>();
            messages.add(
                (upsertResult.errors.size()==1 ? 'Error ' : 'Errors ') +
                'occured processing component ' + upsertResult.fullName + '.');
            for(MetadataService.Error error : upsertResult.errors)
                messages.add(
                    error.message + ' (' + error.statusCode + ').' +
                    ( error.fields!=null && error.fields.size()>0 ?
                     ' Fields ' + String.join(error.fields, ',') + '.' : '' ) );
            if(messages.size()>0)
                throw new MetadataServiceExamplesException(String.join(messages, ' '));
        }
        if(!upsertResult.success)
            throw new MetadataServiceExamplesException('Request failed with no specified error.');
    }
    
    public class JSON2Apex{
        public String objectName; //Test
        public String objectPluralName; //Tests
        public String objectApiName; //Test
        public Boolean startWithVowelSound;
        public String description; //
        public String context_Sensitive_Help_Setting; //
        public String recordName; //
        public String dataType; //
        public String displayFormat; //
        public String startingNumber; //
        public Boolean allowReports;
        public Boolean alloeActivity;
        public Boolean trackFieldHistory;
        public Boolean allowInChatterGroups;
        public Boolean allowSharing;
        public Boolean allowBulkAPIAccess;
        public Boolean allowStreamingAPIAccess;
        public String deploymentStatus; //
        public List<FeldsArray> fieldsArray;
    }
    
    public class FeldsArray {
        public String fieldLabel; //Test1
        public String fieldName; //Test1
        public String fieldDataType; //Text
        public String helpText; //
        public String description; //
        public String length; //10
        public String decimalPlaces; //
        public String displayFormat; //
        public Integer startingNumber;    //1
        public String isRequired; //
        public String visibleLines; //
        public String isUnique; //
        public Boolean isLengthColoumShow;
        public Boolean isDecemalPlacesShow;
        public Boolean isRequiredCheckBoxShow;
        public Boolean isDisplayFormatShow;
        public Boolean isStartingNumberShow;
        public Boolean isVisibleLinesShow;
        public Boolean isUniqueCheckBoxShow;
        public Integer uniqueKey;    //710872
    }
    
    public static JSON2Apex parse(String json){
        return (JSON2Apex) System.JSON.deserialize(json, JSON2Apex.class);
    }
    
}