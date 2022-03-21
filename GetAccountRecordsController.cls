public with sharing class GetAccountRecordsController {
   
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
    return [SELECT Id, Name FROM Account limit 5];
    }

    @AuraEnabled(cacheable=true)
    public static Account getselectedAccount(String accId) {
        return [SELECT Id, Name, Industry, Type, Owner.Name from Account where Id=:accId];
    }

    @AuraEnabled(cacheable=true)
    public static User getProfilePicture(String uid) {
        return [SELECT SmallPhotoUrl from User where Id=:uid];
    }
    
}
