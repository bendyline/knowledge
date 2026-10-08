---
title: Create an Entity
description: Learn how to create an entity in Master Data Services to contain members and their attributes. You must have permissions for the System Administration area.
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: how-to
ms.custom:
  - build-2025
helpviewer_keywords:
  - "entities [Master Data Services], creating"
  - "creating entities [Master Data Services]"
---
# Create an Entity (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, create an entity to contain members and their attributes.  
  
## Prerequisites  
 To perform this procedure:  
  
-   You must have permission to access the **System Administration** functional area.  
  
-   You must be a model administrator. For more information, see [Administrators (Master Data Services)](administrators-master-data-services.md).  
  
-   A model must exist. For more information, see [Create a Model (Master Data Services)](create-a-model-master-data-services.md).  
  
### To create an entity  
  
1.  In  Master Data Manager 
, click **System Administration**.  
  
2.  On the **Manage Model** page, from the grid, select the model that you want to create entity for and then click **Entities**.  
  
3.  On the **Manage Entity** page, click **Add**.  
  
4.  In the **Name** box, type the name of the entity.  
  
5.  Optionally, in the **Description** field, type the entity description.  
  
6.  Optionally, in the **Name for staging tables** box, type a name for the staging table.  
  
     If you do not complete this field, the entity name is used.  
  
    > **Tip:**  
    >  Use the model name as part of the staging table name, for example *Modelname_Entityname*. This makes the tables easier to find in the database. For more information about the staging tables, see [Overview: Importing Data from Tables (Master Data Services)](overview-importing-data-from-tables-master-data-services.md).
    > **Tip:**
    > If using the default naming for Staging tables, MDS will automatically append identifiers (e.g. _1, _2) to the staging table names if an entity with same name exists in another Model.
  
7.  For the **Transaction Log Type** field, choose the transaction log type in the dropdown list.  
  
     For more information, see [Change the Entity Transaction Log Type (Master Data Services)](change-the-entity-transaction-log-type-master-data-services.md)  
  
8.  Optional. Select the **Create Code values automatically** check box. For more information, see [Automatic Code Creation (Master Data Services)](automatic-code-creation-master-data-services.md).  
  
9. Optional. Select the **Enable data Compression** checkbox. By default the row compression is turned on. For more information , see [Data Compression](../relational-databases/data-compression/data-compression.md).  
  
10. Click **Save**.  
  
## Grid Columns  
 For each created entity, a row with thirteen columns is added to the grid. The following are the columns.  
  
| Name | Description |
| --- | --- |
| Status | The entity status. When you click **Save** the following image is displayed that indicates that the entity is updating.<br /><br /> Icon for updating status<br /><br /> If there are errors when creating or editing an entity, the following image is displayed.<br /><br /> Icon for error status<br /><br /> If the status is OK, then the following image is displayed.<br /><br /> Icon for OK status |
| Name | The entity name. |
| Description | The entity description. |
| Staging Table | The prefix name of the table that is used for storing data. |
| Transaction Log Type | The transaction log type of the entity. |
| Automatic Code Creation | Specifies whether automatic code creation is enabled. |
| Data Compression | Specifies whether data compression is enabled for the entity. |
| Is Sync Target | Specifies if the entity is the target of a sync relationship. |
| Is Hierarchy Enabled | Specifies if the entity is enabled for explicit hierarchies. This column shows Yes if at least one explicit hierarchy is created for the entity. |
| Created By | The username of the user who created the entity. |
| Created On | The date and time when the entity was created. |
| Updated By | The username of the user who last updated the entity. |
| Updated On | The date and time when the entity was last updated. |
  
## Related content

- [Entities (Master Data Services)](entities-master-data-services.md)
- [Explicit Hierarchies (Master Data Services)](explicit-hierarchies-master-data-services.md)
- [Edit an Entity (Master Data Services)](edit-an-entity-master-data-services.md)
- [Delete an Entity (Master Data Services)](delete-an-entity-master-data-services.md)
- [Create a Text Attribute (Master Data Services)](create-a-text-attribute-master-data-services.md)
- [Create a Domain-Based Attribute (Master Data Services)](create-a-domain-based-attribute-master-data-services.md)
- [Create a File Attribute (Master Data Services)](create-a-file-attribute-master-data-services.md)
