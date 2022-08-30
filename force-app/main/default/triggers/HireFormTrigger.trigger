trigger HireFormTrigger on Hire_Form__c (before insert , after Update){
    List<Hire_Form__c> hireNewRecordList = trigger.new;
    if(trigger.isInsert)
    {
        HireformTriggerHelperClass hf = new HireformTriggerHelperClass();
        hf.beforeInsert(hireNewRecordList);
    }
    
    if(trigger.isUpdate){
        
        HireformTriggerHelperClass hf = new HireformTriggerHelperClass();
        hf.afterUpdate(hireNewRecordList);
    }
}