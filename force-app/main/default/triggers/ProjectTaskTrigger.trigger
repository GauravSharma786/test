/*
 Name	 	 	:- ProjectTaskTrigger
 Author	 		:- Gaurav Sharma
 Date  	 		:-  6 March 2021
 Description   	:-  This Class Trigger Work On After Update Event. Update Project Task Field then update
					Status Field of Parent.
*/


trigger ProjectTaskTrigger on Project_Task__c (before update, after update) {
   
    if(Trigger.isAfter && Trigger.isUpdate){
         Map<Id , Project_Task__c> mapProjectTasks = new Map<Id ,Project_Task__c>();
        for(Project_Task__c projectTaskObj : trigger.new){
            if(projectTaskObj.Completed__c == true && (Trigger.Oldmap.get(projectTaskObj.Id).Completed__c != true)){
                mapProjectTasks.put(projectTaskObj.Id , projectTaskObj);
            }
        }
        if(mapProjectTasks.size() > 0){
            ProjectTaskTriggerHelper.updateParentProject(mapProjectTasks);
        }
    }
}