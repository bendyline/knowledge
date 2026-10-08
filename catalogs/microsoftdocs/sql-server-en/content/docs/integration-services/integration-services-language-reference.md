---
title: "Integration Services Language Reference"
description: "Integration Services Language Reference"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: reference
---
# Integration Services Language Reference


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory



**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

  This section describes the  Transact-SQL  API for administering  Integration Services 
 projects that have been deployed to an instance of  SQL Server 
.  
  
  Integration Services 
 stores objects, settings, and operational data in a database referred to as the  Integration Services 
 catalog. The default name of the  Integration Services 
 catalog is SSISDB. The objects that are stored in the catalog include projects, packages, parameters, environments, and operational history.  
  
 The  Integration Services 
 catalog stores its data in internal tables that are not visible to users. However it exposes the information that you need through a set of public views that you can query. It also provides a set of stored procedures that you can use to perform common tasks on the catalog.  
  
 Typically you manage  Integration Services 
 objects in the catalog by opening  SQL Server Management Studio 
. However you can also use the database views and stored procedures directly, or write custom code that calls the managed API.  Management Studio
 and the managed API query the views and call the stored procedures that are described in this section to perform many of their tasks.  
  
## In This Section  
 [Views (Integration Services Catalog)](system-views/views-integration-services-catalog.md)  
 Query the views to inspect  Integration Services 
 objects, settings, and operational data.  
  
 [Stored Procedures (Integration Services Catalog)](system-stored-procedures/stored-procedures-integration-services-catalog.md)  
 Call the stored procedures to add, remove, or modify  Integration Services 
 objects and settings.  
  
 [Functions (Integration Services Catalog)](functions-dm-execution-performance-counters.md)  
 Call the functions to administer  Integration Services 
 projects.
