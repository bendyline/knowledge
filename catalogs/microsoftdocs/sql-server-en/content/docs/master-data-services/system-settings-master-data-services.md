---
title: System Settings
description: Learn how to configure the system settings for all web applications and web services associated with a Master Data Services database.
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
helpviewer_keywords:
  - "Master Data Services, system settings"
  - "system settings [Master Data Services]"
---
# System Settings (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  For all web applications and web services associated with a  Master Data Services 
 database, you can configure system settings.  
  
 Many of these settings can be configured in  Master Data Services Configuration Manager 
 on the **Database** page. Others can be configured in the System Settings table (mdm.tblSystemSetting) in the  Master Data Services 
 database.  
  
 The settings can be grouped in the following categories:  
  
-   [General Settings](#General)  
  
-   [Version Management Settings](#Versions)  
  
-   [Staging Settings](#Staging)  
  
-   [Explorer Settings](#Explorer)  
  
-   [Add-in for Excel Settings](#xls)  
  
-   [Business Rule Settings](#BusinessRules)  
  
-   [Notification Settings](#Notifications)  
  
-   [Security Settings](#Security)  
  
-   [Not Used](#NotUsed)  
  
##  <a name="General"></a> General Settings  
  
| Configuration Manager Setting | System Setting | Description |
| --- | --- | --- |
| **Database connection time-out** | **DatabaseConnectionTimeOut** | The number of seconds the  Master Data Services |
 | database allows for a connection to complete. If the connection does not complete within this time, the connection is canceled and an error is returned. The default value is **60** seconds (1 minute). |
| **Database command time-out** | **DatabaseCommandTimeOut** | The number of seconds the  Master Data Services |
 | database allows for a command to complete. If the command does not complete within this time, the command is canceled and an error is returned. The default value is **3600** seconds (60 minutes). |
| **Web service time-out** | **ServerTimeOut** | The number of seconds ASP.NET allows for a  Master Data Manager |
 | page request to complete. If the request does not complete within this time, the request is canceled and an error is returned. The default value is **120000** seconds (2000 minutes). |
| **Client time-out** | **ClientTimeOut** | The number of seconds of inactivity before  Master Data Manager |
 | returns to the home page. The default value is **300** seconds (5 minutes). |
| **Number of rows per batch** | **RowsPerBatch** | The number of records to retrieve in each batch by the web service. The default value is **50**. |
|  | **ApplicationName** | The text that is displayed in event logs. The default value is **MDM**. |
|  | **SiteTitle** | The text that is displayed in the  Master Data Manager |
 | web browser's title bar. The default value is **Master Data Manager**. |
| **Log retention in Days** | **LogRetentionDays** | The number of days after which the logs will be deleted. The default value is -1 and indicates the log tables will not be cleaned.<br /><br /> If the value is 0, log tables retain only today's data. Data logs for the previous days are truncated.<br /><br /> If the value is greater than 0, the log data is retained for the number of days specified by the value. |
  
##  <a name="Versions"></a> Version Management Settings  
  
| Configuration Manager Setting | System Setting | Description |
| --- | --- | --- |
| **Copy only committed versions** | **CopyOnlyCommittedVersion** | In  Master Data Manager |
| , determines whether users can copy model versions with a status of **Committed**, or versions with any status. The default value is **Yes** or **1**, which indicates that users can copy **Committed** versions only. Change to **No** or **2** to allow users to copy all versions. |
  
 For more information, see [Versions (Master Data Services)](versions-master-data-services.md).  
  
##  <a name="Staging"></a> Staging Settings  
  
| Configuration Manager Setting | System Setting | Description |
| --- | --- | --- |
| **Log all staging transactions** | **StagingTransactionLogging** | Applies to SQL Server 2008 R2 only. Determines whether or not transactions are logged when staging records are loaded into the  Master Data Services |
 | database. The default value is **Off** or **2**. Change to **On** or **1** to turn on logging. |
| **Staging batch interval** | **StagingBatchInterval** | In the  Master Data Manager |
 | **Integration Management** functional area, the number of seconds after you select **Start Batches** that your batch is processed. The default value is **60** seconds (1 minute). |
  
 For more information, see [Overview: Importing Data from Tables (Master Data Services)](overview-importing-data-from-tables-master-data-services.md).  
  
##  <a name="Explorer"></a> Explorer Settings  
  
| Configuration Manager Setting | System Setting | Description |
| --- | --- | --- |
| **Number of members in the hierarchy by default** | **HierarchyChildNodeLimit** | In the  Master Data Manager |
 | **Explorer** functional area, the maximum number of members that are displayed in each hierarchy node before **...more...** is displayed. You can click **...more...** to show the next group of members. The default value is **50**. |
| **Show names in hierarchy by default** | **ShowNamesInHierarchy** | In the  Master Data Manager |
 | **Explorer** functional area, determines the default setting that is selected when you view hierarchies.<br /><br /> The default value is **Yes** or **1**, which indicates that the name and code of each member are displayed. Change to **No** or **2** to display the code only. |
| **Number of domain-based attributes in list** | **DBAListRowLimit** | In the  Master Data Manager |
 | **Explorer** functional area, the number of attributes that are displayed in a list when you double-click a domain-based attribute value in the grid. The default value is **50**. If more than 50 members exist, a searchable dialog is displayed instead. |
|  | **GridFilterDefaultFuzzySimilarityLevel** | In the  Master Data Manager |
 | **Explorer** functional area, the level of similarity used when using the **Matches** filter criteria. The default value is **0.3**. Set the value closer to **1** to return a match that is closer to the search criteria. Set to **1** for an exact match. |
  
##  <a name="xls"></a> Add-in for Excel Settings  
  
| Configuration Manager Setting | System Setting | Description |
| --- | --- | --- |
| Show Add-in for Excel text on website home page | ShowAddInText | On the  Master Data Manager |
 | home page, show a link for users to download the  Add-in for Excel |
| . |
| Add-in for Excel install path on website home page | AddInURL | On the  Master Data Manager |
 | home page, if the link to the  Add-in for Excel |
 | is displayed, the location users go to when they click the link. |
  
##  <a name="BusinessRules"></a> Business Rule Settings  
  
| Configuration Manager Setting | System Setting | Description |
| --- | --- | --- |
| **Number to increment new business rules by** | **BusinessRuleDefaultPriorityIncrement** | In the  Master Data Manager |
 | **System Administration** functional area, the number the priority of each new business rule is incremented by. The default value is **10**. |
| **Number of members to apply business rules to** | **BusinessRuleRealtimeMemberCount** | In the  Master Data Manager |
 | **Explorer** functional area, the maximum number of members in the grid to apply business rules to. In the  Add-in for Excel |
| , the maximum number of members in the active worksheet to apply business rules to. The default value is **10000**. |
| **Business Rule User Script Execute First** | **BusinessRuleUserScriptExecuteFirst** | Normally, business rule action executes with sequence "Default Value", "Change Value", "Validation", "External Action", "User Defined Action Script". If this setting is changed to **1**, "User Defined Action Script" will be the first step for business rule action execution. This setting is a hidden setting. The default value is **0**. |
  
 For more information, see [Business Rules (Master Data Services)](business-rules-master-data-services.md).  
  
##  <a name="Notifications"></a> Notification Settings  
  
| Configuration Manager Setting | System Setting | Description |
| --- | --- | --- |
| **Master Data Manager URL for notifications** | **MDMRootURL** | The URL for the  Master Data Manager |
 | web application, which is used in the link in email notifications, for example `https://constoso/mds`. |
| **Notification email interval** | **NotificationInterval** | The frequency, in seconds, that email notifications are sent. The default value is **120** seconds (2 minutes). |
| **Number of notifications in a single email** | **NotificationsPerEmail** | The maximum number of validation issues that will be listed in a single notification email. Additional issues, if they exist, are not included in the email, but are available in  Master Data Manager |
| . |
| **Default email format** | **EmailFormat** | The format for all email notifications. The default value is **HTML** or **1**. The database setting of **2** indicates **Text**.<br /><br /> Note: You can override this for an individual user in  Master Data Manager |
| , by changing and saving the **Email format** on the user's **General** tab. |
| **Regular expression for email address** | **EmailRegExPattern** | In the  Master Data Manager |
 | **User and Group Permissions** functional area, the regular expression used to validate the email address entered on a user's **General** tab. For more information about regular expressions, see [Regular Expression Language Elements](https://learn.microsoft.com/dotnet/standard/base-types/regular-expression-language-quick-reference) in the MSDN library. |
| **Database Mail account** | **EmailProfilePrincipalAccount** | Displays the Database Mail account to use when sending email notifications. The default profile is **mds_email_user**. |
| **Database Mail profile** | **DatabaseMailProfile** | The Database Mail profile to use when sending email notifications. The default value is blank. |
|  | **ValidationIssueHTML** | In HTML format, the text of the email users get when a business rule fails validation. |
|  | **ValidationIssueText** | In plain text format, the text of the email users get when a business rule fails validation. |
|  | **VersionStatusChangeText** | In plain text format, the text of the email users get when the status of a version changes. Only users with **Update** permission to the entire model receive this email. |
|  | **VersionStatusChangeHTML** | In HTML format, the text of the email users get when the status of a version changes. Only users with **Update** permission to the entire model receive this email. |
  
 For more information, see [Notifications (Master Data Services)](notifications-master-data-services.md).  

<a id="Security"></a>

## Security settings
  
| Configuration Manager Setting | System Setting | Description |
| --- | --- | --- |
|  | **SecurityMemberProcessInterval** | In the  Master Data Manager |
 | **User and Group Permissions** functional area, the frequency, in seconds, that user and group permissions set on the **Hierarchy Members** tab are applied. The default value is **3600** seconds (60 minutes). |

##  <a name="Performance"></a> Performance Settings  

| Configuration Manager Setting | System Setting | Description |
| --- | --- | --- |
| **Enable performance improvement setting** | **PerformanceImprovementEnable** | We default to enable this setting (**Set to 1**) that load permission related page will have a good performance. But in this situation create/modify entities, attributes, users, or groups will have a low performance. To avoid this, you can disable this setting (**Set to 0**). After change this setting. You must run command "**EXEC [mdm].[udpPerformanceToggleSwitch];**" to make sure that the view and data is correct. |
  
 For more information, see [Immediately Apply Member Permissions (Master Data Services)](immediately-apply-member-permissions-master-data-services.md).  
  
##  <a name="NotUsed"></a> Not Used  
 The following settings in the System Settings table are not used.  
  
-   **SecurityMode**  
  
-   **MDSHubName**  
  
-   **ApplicationLogging**  
  
-   **ReportServer**  
  
-   **ReportDirectory**  
  
-   **BusinessRuleEngineIterationLimit**  
  
-   **BusinessRuleExtensibility**  
  
-   **AttributeExplorerMarkAllActionMemberCount**  
  
## Related content

- [Database Object Security (Master Data Services)](database-object-security-master-data-services.md)
