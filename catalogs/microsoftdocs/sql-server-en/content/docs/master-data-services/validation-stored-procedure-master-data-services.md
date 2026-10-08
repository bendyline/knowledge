---
title: Validation Stored Procedure
description: Learn how to use the mdm.udpValidateModel stored procedure to apply business rules to all members in the model version in Master Data Services.
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
---
# Validation Stored Procedure (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, validate a version to apply business rules to all members in the model version.  
  
 This topic explains how to use the **mdm.udpValidateModel** stored procedure to validate data. If you are an administrator in the  Master Data Manager 
 web application, you can do validation in the UI instead. For more information, see [Validate a Version against Business Rules (Master Data Services)](validate-a-version-against-business-rules-master-data-services.md).  
  
> **Note:**  
>  If you invoke validation before the staging process is complete, members that have not finished staging will not be validated.  
  
## Example  
  
```  
DECLARE @ModelName nVarchar(50) = 'Customer'   
DECLARE @Model_id int   
DECLARE @UserName nvarchar(50)= 'DOMAIN\user_name'   
DECLARE @User_ID int   
DECLARE @Version_ID int   
  
SET @User_ID = (SELECT ID    
                 FROM mdm.tblUser u   
                 WHERE u.UserName = @UserName)   
SET @Model_ID = (SELECT Top 1 Model_ID   
                 FROM mdm.viw_SYSTEM_SCHEMA_VERSION   
                 WHERE Model_Name = @ModelName)   
SET @Version_ID = (SELECT MAX(ID)   
                 FROM mdm.viw_SYSTEM_SCHEMA_VERSION   
                 WHERE Model_ID = @Model_ID)  
  
EXECUTE mdm.udpValidateModel @User_ID, @Model_ID, @Version_ID, 1  
  
```  
  
## Parameters  
 The parameters of this procedure are as follows:  
  
| Parameter | Description |
| --- | --- |
| UserID | The user ID. |
| Model_ID | The model ID. |
| Version_ID | The version ID. |
  
## Related content

- [Overview: Importing Data from Tables (Master Data Services)](overview-importing-data-from-tables-master-data-services.md)
- [Validate a Version against Business Rules (Master Data Services)](validate-a-version-against-business-rules-master-data-services.md)
