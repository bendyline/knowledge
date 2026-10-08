---
title: "catalog.remove_data_tap"
description: "catalog.remove_data_tap"
ms.date: "03/06/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: reference
---
# catalog.remove_data_tap 


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory



**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Removes a data tap from a component output that is in an execution. The unique identifier for the data tap is associated with an instance of the execution.  
  
## Syntax  
  
```sql  
catalog.remove_data_tap [ @data_tap_id = ] data_tap_id  
```  
  
## Arguments  
 [ @data_tap_id = ] *data_tap_id*  
 The unique identifier for the data tap that is created by using the catalog.add_data_tap stored procedure. The *data_tap_id* is **bigint**.  
  
## Remarks  

- When a package contains more than one data flow tasks that have the same name, the data tap is added to the first data flow task with the given name.  
  
- To remove data taps, the instance of the execution must be in the created state (a value of 1 in the **status** column of the [catalog.operations (SSISDB Database)](../system-views/catalog-operations-ssisdb-database.md) view) .  
  
## Return Codes  
 0 (success)  
  
 When the stored procedure fails, it throws an error.  
  
## Result Set  
 None  
  
## Permissions  
 This stored procedure requires one of the following permissions:  
  
-   MODIFY permissions on the instance of execution  
  
-   Membership to the **ssis_admin** database role  
  
-   Membership to the **sysadmin** server role  
  
## Errors and Warnings  
 The following list describes conditions that cause the stored procedure to fail.  
  
-   The user does not have MODIFY permissions.  
  
## Related content

- [catalog.add_data_tap](catalog-add-data-tap.md)
- [catalog.add_data_tap_by_guid](catalog-add-data-tap-by-guid.md)
