/*
Name	      :- ProjectTrigger
Author	      :- Gaurav Sharma
Date  	      :-  6 March 2021
Description   :- This Trigger Work On After Insert Event.This Trigger created childs of project.
*/

trigger ProjectTriger on Project__c (after insert, before update, after update) {
    set<id> idsOfProject = new set<Id>();
    if(Trigger.isAfter && Trigger.isInsert){
        idsOfProject = Trigger.Newmap.keyset();
        ProjectTriggerHelper.createProjectTasks(idsOfProject);
    }
}