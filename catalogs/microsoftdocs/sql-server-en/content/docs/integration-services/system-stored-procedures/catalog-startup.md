---
title: "catalog.startup"
description: "catalog.startup"
ms.date: "03/04/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: reference
---
# catalog.startup 


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory



**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  Performs maintenance of the state of operations for the SSISDB catalog.  
  
 The stored procedure fixes the status of any packages there were running if and when the  SSIS 
 server instance goes down.  
  
 You have the option of enabling the stored procedure to run automatically each time the  SSIS 
 server instance is restarted, by selecting the **Enable automatic execution of Integration Services stored procedure at SQL Server startup** option in the **Create Catalog** dialog box.  
  
## Syntax  
  
```sql  
catalog.startup  
```  
  
## Return Code Value  
 0 (success)  
  
## Result Sets  
 None  
  
## Permissions  
 This stored procedure requires one of the following permissions:  
  
-   READ and MODIFY permissions on the instance of execution, READ and EXECUTE permissions on the project, and if applicable, READ permissions on the referenced environment  
  
-   Membership to the **ssis_admin** database role  
  
-   Membership to the **sysadmin** server role
