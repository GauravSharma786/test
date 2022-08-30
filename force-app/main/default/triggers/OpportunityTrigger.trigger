trigger OpportunityTrigger on Opportunity (before insert , before update) {
    List<Opportunity> opportunityRecordList = trigger.new;
    
    Set<Id> idsOfAccount = new Set<Id>();
    for(Opportunity opportunity : opportunityRecordList){
        if(opportunity.AccountId != null){
            idsOfAccount.add(opportunity.AccountId);
        }
    }
    Map<Id , Account> accountRecordMap = new Map<Id , Account>([Select Id , Account_Type__c  FROM Account WHERE Id in :(idsOfAccount)]);
    for(Opportunity opportunity : opportunityRecordList){
        if(opportunity.AccountId != null){
            String typeName = accountRecordMap.get(opportunity.AccountId).Account_Type__c;
            Switch on typeName {
                when 'Reseller'{
                    opportunity.Stage_Type__c = '10';
                }
                when 'Buyer'{
                    opportunity.Stage_Type__c = '25';
                }
                when 'Current Customer'{
                    opportunity.Stage_Type__c = '100';
                }
                when else{
                    opportunity.Stage_Type__c = '0';
                }
            }
        }else{
            opportunity.Stage_Type__c = null;
        }
    }
}