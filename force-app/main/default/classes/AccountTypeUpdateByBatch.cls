global class AccountTypeUpdateByBatch implements Database.Batchable<sObject>,Database.Stateful{
	global Integer countAccountRecord =0;
    
    global Database.QueryLocator start(Database.BatchableContext bc){
        return Database.getQueryLocator([Select Id, Type FROM Account]);
    }   
    
    global void execute(Database.BatchableContext bc , List<Account> accountRecordList){
        For(Account account : accountRecordList){
            account.Type = 'Prospect';
        }
        countAccountRecord+= accountRecordList.size();
        upsert accountRecordList;
    }
    
    global void finish(Database.BatchableContext bc){
         Database.executeBatch(new ContacLanguageUpdateByBatch() , 20);
        system.debug('## Records Count ' + countAccountRecord);
    }
}