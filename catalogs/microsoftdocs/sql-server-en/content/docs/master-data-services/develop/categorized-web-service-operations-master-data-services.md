---
title: Categorized Web Service Operations
description: Categorized Web Service Operations (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: reference
ms.custom:
  - build-2025
---
# Categorized Web Service Operations (Master Data Services)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  The  Master Data Services 
 web service contains a complete set of operations that let you write code to control all of the features that  Master Data Manager 
 does through its user interface. The web service operations are defined by the [Microsoft.MasterDataServices.IService](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.IService) interface and are implemented as methods in the [Microsoft.MasterDataServices.ServiceClient](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient) class. This topic groups the web service operations into conceptual categories to help you understand how to use the web service API.  
  
## Model Operations  
 These operations are used to create, update, and delete models, as well as to operate on all the contents of a model, such as entities, hierarchies, and versions. For more information, see [Models (Master Data Services)](../models-master-data-services.md).  
  
- [Microsoft.MasterDataServices.ServiceClient.MetadataClone%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.MetadataClone%252A)
- [Microsoft.MasterDataServices.ServiceClient.MetadataCreate%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.MetadataCreate%252A)
- [Microsoft.MasterDataServices.ServiceClient.MetadataDelete%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.MetadataDelete%252A)
- [Microsoft.MasterDataServices.ServiceClient.MetadataGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.MetadataGet%252A)
- [Microsoft.MasterDataServices.ServiceClient.MetadataUpdate%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.MetadataUpdate%252A)
  
## Entity Operations  
 These operations are used to create, update, and delete the members of a single entity. For more information, see [Entities (Master Data Services)](../entities-master-data-services.md) and [Members (Master Data Services)](../members-master-data-services.md).  
  
- [Microsoft.MasterDataServices.ServiceClient.EntityMemberKeyLookup%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.EntityMemberKeyLookup%252A)
- [Microsoft.MasterDataServices.ServiceClient.EntityMembersCopy%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.EntityMembersCopy%252A)
- [Microsoft.MasterDataServices.ServiceClient.EntityMembersCreate%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.EntityMembersCreate%252A)
- [Microsoft.MasterDataServices.ServiceClient.EntityMembersDelete%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.EntityMembersDelete%252A)
- [Microsoft.MasterDataServices.ServiceClient.EntityMembersGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.EntityMembersGet%252A)
- [Microsoft.MasterDataServices.ServiceClient.EntityMembersMerge%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.EntityMembersMerge%252A)
- [Microsoft.MasterDataServices.ServiceClient.EntityMembersUpdate%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.EntityMembersUpdate%252A)
  
## Member Operations  
 These operations are used to get, update, and delete members. The set of members operated on can contain members from multiple entities. For more information, see [Members (Master Data Services)](../members-master-data-services.md).  
  
- [Microsoft.MasterDataServices.ServiceClient.ModelMembersBulkDelete%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.ModelMembersBulkDelete%252A)
- [Microsoft.MasterDataServices.ServiceClient.ModelMembersBulkMerge%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.ModelMembersBulkMerge%252A)
- [Microsoft.MasterDataServices.ServiceClient.ModelMembersBulkUpdate%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.ModelMembersBulkUpdate%252A)
- [Microsoft.MasterDataServices.ServiceClient.ModelMembersGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.ModelMembersGet%252A)
  
## Attribute and Hierarchy Operations  
 These operations are used to get attribute and hierarchy information. Attributes and hierarchies can also be modified by using the model operations, such as [Microsoft.MasterDataServices.ServiceClient.MetadataUpdate%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.MetadataUpdate%252A). For more information, see [Attributes (Master Data Services)](../attributes-master-data-services.md) and [Hierarchies (Master Data Services)](../hierarchies-master-data-services.md).  
  
- [Microsoft.MasterDataServices.ServiceClient.EntityMemberAttributesGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.EntityMemberAttributesGet%252A)
- [Microsoft.MasterDataServices.ServiceClient.HierarchyMembersGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.HierarchyMembersGet%252A)
  
## Business Rule Operations  
 These operations are used to create, update, delete, and publish business rules. For more information, see [Business Rules (Master Data Services)](../business-rules-master-data-services.md).  
  
- [Microsoft.MasterDataServices.ServiceClient.BusinessRulesClone%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.BusinessRulesClone%252A)
- [Microsoft.MasterDataServices.ServiceClient.BusinessRulesCreate%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.BusinessRulesCreate%252A)
- [Microsoft.MasterDataServices.ServiceClient.BusinessRulesDelete%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.BusinessRulesDelete%252A)
- [Microsoft.MasterDataServices.ServiceClient.BusinessRulesGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.BusinessRulesGet%252A)
- [Microsoft.MasterDataServices.ServiceClient.BusinessRulesPaletteGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.BusinessRulesPaletteGet%252A)
- [Microsoft.MasterDataServices.ServiceClient.BusinessRulesPublish%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.BusinessRulesPublish%252A)
- [Microsoft.MasterDataServices.ServiceClient.BusinessRulesUpdate%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.BusinessRulesUpdate%252A)
  
## Annotation Operations  
 These operations are used to create, update, and delete annotations. For more information, see [Annotations (Master Data Services)](../annotations-master-data-services.md).  
  
- [Microsoft.MasterDataServices.ServiceClient.AnnotationsDelete%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.AnnotationsDelete%252A)
- [Microsoft.MasterDataServices.ServiceClient.AnnotationsUpdate%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.AnnotationsUpdate%252A)
- [Microsoft.MasterDataServices.ServiceClient.EntityMemberAnnotationsCreate%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.EntityMemberAnnotationsCreate%252A)
- [Microsoft.MasterDataServices.ServiceClient.EntityMemberAnnotationsGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.EntityMemberAnnotationsGet%252A)
- [Microsoft.MasterDataServices.ServiceClient.TransactionAnnotationsCreate%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.TransactionAnnotationsCreate%252A)
- [Microsoft.MasterDataServices.ServiceClient.TransactionAnnotationsGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.TransactionAnnotationsGet%252A)
  
## Transaction Operations  
 These operations are used to get and reverse transactions. For more information, see [Transactions (Master Data Services)](../transactions-master-data-services.md).  
  
- [Microsoft.MasterDataServices.ServiceClient.TransactionsGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.TransactionsGet%252A)
- [Microsoft.MasterDataServices.ServiceClient.TransactionsReverse%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.TransactionsReverse%252A)
  
## Version and Validation Operations  
 These operations are used to copy and validate versions. For more information, see [Versions (Master Data Services)](../versions-master-data-services.md) and [Validation (Master Data Services)](../validation-master-data-services.md).  
  
- [Microsoft.MasterDataServices.ServiceClient.VersionCopy%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.VersionCopy%252A)
- [Microsoft.MasterDataServices.ServiceClient.ValidationGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.ValidationGet%252A)
- [Microsoft.MasterDataServices.ServiceClient.ValidationProcess%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.ValidationProcess%252A)
  
## Data Quality Operations  
 These operations are used to perform data quality tasks and to examine their results.  
  
- [Microsoft.MasterDataServices.ServiceClient.DataQualityCleansingOperationCreate%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.DataQualityCleansingOperationCreate%252A)
- [Microsoft.MasterDataServices.ServiceClient.DataQualityMatchingOperationCreate%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.DataQualityMatchingOperationCreate%252A)
- [Microsoft.MasterDataServices.ServiceClient.DataQualityInstalledState%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.DataQualityInstalledState%252A)
- [Microsoft.MasterDataServices.ServiceClient.DataQualityKnowledgeBasesGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.DataQualityKnowledgeBasesGet%252A)
- [Microsoft.MasterDataServices.ServiceClient.DataQualityOperationStart%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.DataQualityOperationStart%252A)
- [Microsoft.MasterDataServices.ServiceClient.DataQualityOperationResultsGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.DataQualityOperationResultsGet%252A)
- [Microsoft.MasterDataServices.ServiceClient.DataQualityOperationStatus%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.DataQualityOperationStatus%252A)
  
## Data Import Operations  
 These operations are used to import data into a  Master Data Services 
 database. For more information, see [Overview: Importing Data from Tables (Master Data Services)](../overview-importing-data-from-tables-master-data-services.md).  
  
- [Microsoft.MasterDataServices.ServiceClient.EntityStagingClear%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.EntityStagingClear%252A)
- [Microsoft.MasterDataServices.ServiceClient.EntityStagingGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.EntityStagingGet%252A)
- [Microsoft.MasterDataServices.ServiceClient.EntityStagingLoad%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.EntityStagingLoad%252A)
- [Microsoft.MasterDataServices.ServiceClient.EntityStagingProcess%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.EntityStagingProcess%252A)
  
 The following operations are used to import data by using the staging process included in  SQL Server 2008 R2 (10.50.x) 
. These operations should be used only to support existing databases. For new development, use the previously listed operations.  
  
- [Microsoft.MasterDataServices.ServiceClient.StagingClear%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.StagingClear%252A)
- [Microsoft.MasterDataServices.ServiceClient.StagingGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.StagingGet%252A)
- [Microsoft.MasterDataServices.ServiceClient.StagingNameCheck%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.StagingNameCheck%252A)
- [Microsoft.MasterDataServices.ServiceClient.StagingProcess%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.StagingProcess%252A)
  
## Data Export Operations  
 These operations are used to export data through the use of subscription views. For more information, see [Overview: Exporting Data (Master Data Services)](../overview-exporting-data-master-data-services.md).  
  
- [Microsoft.MasterDataServices.ServiceClient.ExportViewCreate%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.ExportViewCreate%252A)
- [Microsoft.MasterDataServices.ServiceClient.ExportViewDelete%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.ExportViewDelete%252A)
- [Microsoft.MasterDataServices.ServiceClient.ExportViewListGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.ExportViewListGet%252A)
- [Microsoft.MasterDataServices.ServiceClient.ExportViewUpdate%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.ExportViewUpdate%252A)
  
## Security Operations  
 These operations are used to modify the security settings that control access to the  Master Data Services 
 database. For more information, see [Security (Master Data Services)](../security-master-data-services.md).  
  
- [Microsoft.MasterDataServices.ServiceClient.SecurityPrincipalsClone%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.SecurityPrincipalsClone%252A)
- [Microsoft.MasterDataServices.ServiceClient.SecurityPrincipalsCreate%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.SecurityPrincipalsCreate%252A)
- [Microsoft.MasterDataServices.ServiceClient.SecurityPrincipalsDelete%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.SecurityPrincipalsDelete%252A)
- [Microsoft.MasterDataServices.ServiceClient.SecurityPrincipalsGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.SecurityPrincipalsGet%252A)
- [Microsoft.MasterDataServices.ServiceClient.SecurityPrincipalsUpdate%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.SecurityPrincipalsUpdate%252A)
- [Microsoft.MasterDataServices.ServiceClient.SecurityPrivilegesClone%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.SecurityPrivilegesClone%252A)
- [Microsoft.MasterDataServices.ServiceClient.SecurityPrivilegesCreate%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.SecurityPrivilegesCreate%252A)
- [Microsoft.MasterDataServices.ServiceClient.SecurityPrivilegesDelete%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.SecurityPrivilegesDelete%252A)
- [Microsoft.MasterDataServices.ServiceClient.SecurityPrivilegesGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.SecurityPrivilegesGet%252A)
- [Microsoft.MasterDataServices.ServiceClient.SecurityPrivilegesUpdate%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.SecurityPrivilegesUpdate%252A)
  
## System Operations  
 These operations are used to get and update system settings and user preferences.  
  
- [Microsoft.MasterDataServices.ServiceClient.ServiceCheck%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.ServiceCheck%252A)
- [Microsoft.MasterDataServices.ServiceClient.ServiceVersionGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.ServiceVersionGet%252A)
- [Microsoft.MasterDataServices.ServiceClient.SystemDomainListGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.SystemDomainListGet%252A)
- [Microsoft.MasterDataServices.ServiceClient.SystemPropertiesGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.SystemPropertiesGet%252A)
- [Microsoft.MasterDataServices.ServiceClient.SystemSettingsGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.SystemSettingsGet%252A)
- [Microsoft.MasterDataServices.ServiceClient.SystemSettingsUpdate%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.SystemSettingsUpdate%252A)
- [Microsoft.MasterDataServices.ServiceClient.UserPreferencesDelete%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.UserPreferencesDelete%252A)
- [Microsoft.MasterDataServices.ServiceClient.UserPreferencesGet%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.UserPreferencesGet%252A)
- [Microsoft.MasterDataServices.ServiceClient.UserPreferencesUpdate%2A](https://learn.microsoft.com/search/?terms=Microsoft.MasterDataServices.ServiceClient.UserPreferencesUpdate%252A)
