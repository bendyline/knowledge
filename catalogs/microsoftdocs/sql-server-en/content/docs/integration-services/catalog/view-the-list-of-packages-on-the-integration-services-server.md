---
title: "View the List of Packages on the Integration Services Server"
description: "View the List of Packages on the Integration Services Server"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: how-to
---
# View the List of Packages on the Integration Services Server


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  You can view the list of packages that are stored on the  Integration Services 
 server in one of two ways.  
  
  Transact-SQL  access  
 To view the list of packages that are stored on the server, query the view, [catalog.packages (SSISDB Database)](../system-views/catalog-packages-ssisdb-database.md).  
  
 In  SQL Server Management Studio 
  
 To view packages stored on the server by using Object Explorer in  SQL Server Management Studio 
, follow the procedure below.  
  
### To view packages using  SQL Server Management Studio 
  
  
1.  In  SQL Server Management Studio 
, connect to the  Integration Services 
 server. That is, connect to the instance of the  SQL Server Database Engine 
 that hosts the  Integration Services 
 database.  
  
2.  In Object Explorer, expand the tree to display the **Integration Services Catalogs** node.  
  
3.  Expand the **Integration Services Catalogs** node to display the **SSISDB** node.  
  
4.  Expand the **SSISDB** node to display a list of one or more folders. Each folder contains one or more projects in the **Projects** folder, and each project contains one more packages in the **Packages** folder.
