public without sharing class MovieController {
    
    @AuraEnabled(cacheable=true)
    public static List<movieModel> getMoviesAttachments(){
        Map<Id , Movie__c> movieListMap = new Map<Id , Movie__c>([Select Id, Name, Show_StartTime__c FROM Movie__c]);
        Set<Id> newSet = movieListMap.keySet();

        list<movieModel> movieModelList = new List<movieModel>();
        
        Map<String , String> mapContentDocumentIds = new Map<String ,String>();
        for(ContentDocumentLink conobj : [SELECT Id, ContentDocumentId, LinkedEntityId FROM ContentDocumentLink WHERE LinkedEntityId IN :newSet]){
            mapContentDocumentIds.put(conobj.ContentDocumentId, conobj.LinkedEntityId);
        }
        
         Map<String, String> linkedAndContentVersionIdMap = new Map<String, String>(); 
        for(ContentVersion contentobj : [SELECT Id, Description, ContentDocumentId FROM ContentVersion WHERE  ContentDocumentId IN : mapContentDocumentIds.keySet()]){
            
            if(mapContentDocumentIds.containsKey(contentobj.ContentDocumentId))   {
                linkedAndContentVersionIdMap.put(mapContentDocumentIds.get(contentobj.ContentDocumentId) , contentobj.Id); 
            } 
            
        }
        for(Movie__c movie : movieListMap.values()){
            String movieId = linkedAndContentVersionIdMap.containsKey(movie.Id)?linkedAndContentVersionIdMap.get(movie.Id):'';
            movieModel movieobj = new movieModel(movie , movieId);
            movieModelList.add(movieobj);
        }
        return movieModelList;
    }
    public class movieModel{

        @AuraEnabled public Movie__c movie;
         @AuraEnabled public String movieId;
         
         public movieModel(Movie__c movie , String movieId) {
             this.movie = movie;
             this.movieId = movieId;
             
         }
     }
}
