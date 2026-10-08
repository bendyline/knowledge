---
title: "Delete Packages"
description: "Delete Packages"
ms.date: "03/01/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: how-to
---
# Delete Packages


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  In  SQL Server Data Tools (SSDT) 
, you can delete packages saved to the file system. If you delete a package, it is deleted permanently and it cannot be restored to an  Integration Services 
 project.  
  
> **Note:**  
>  If you want to remove packages from an  Integration Services 
 project, but use them in other projects, then you should use the **Exclude From Project** option instead of the **Delete** option.  
  
### To delete a package in Business Intelligence  
  
1.  In  SQL Server Data Tools (SSDT) 
, open the  Integration Services 
 project that contains the package you want to delete.  
  
2.  In Solution Explorer, right-click the package, and then click **Delete**.  
  
3.  Click **OK** to confirm the deletion or click **Cancel** to keep the package.
