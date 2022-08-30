trigger CaseTrigger on Case (before update){
    Map<Id , Hire_Form__c> hireFormRecordMap = new Map<Id , Hire_Form__c>();
    Set<Id> idsOfContact = new Set<Id>();
    List<Case> caseNewList = trigger.new;
   
    for(Case caseobj : caseNewList){
        if(caseobj.Status == 'Closed' ){
        idsOfContact.add(caseobj.ContactId);
        }
    }
    if(idsOfContact.size()>0){
        for(Hire_Form__c hireobj : [SELECT Id, Name, Candidate__c, Status__c FROM Hire_Form__c WHERE Candidate__c in: (idsOfContact) LIMIT 1000]){
            hireFormRecordMap.put(hireobj.Candidate__c , hireobj);
        }
        
        for(Case caseobj : caseNewList){
            if(caseobj.ContactId != null){
                string hireType = hireFormRecordMap.get(caseobj.ContactId).Status__c;
                
                if(caseobj.Status == 'Closed'){
                    if(hireType != 'Completed'){
                        caseobj.Status.addError('You can not close the case until hire form  is completed');
                    }
                }
            }
        } 
    }
}