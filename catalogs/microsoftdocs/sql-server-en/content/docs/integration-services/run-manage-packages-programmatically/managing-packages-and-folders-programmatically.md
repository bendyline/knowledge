---
title: "Managing Packages and Folders Programmatically"
description: "Managing Packages and Folders Programmatically"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "enumerators [Integration Services]"
  - "packages [Integration Services], managing"
  - "custom enumerators [Integration Services]"
---
# Managing Packages and Folders Programmatically


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


<a name="top"></a> As you work programmatically with  Integration Services 
 packages, you may want to determine whether an individual package or folder exists, or to manage the folders in which packages are stored. The [Microsoft.SqlServer.Dts.Runtime.Application](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application) class of the [Microsoft.SqlServer.Dts.Runtime](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime) namespace provides a variety of methods to satisfy these requirements.    
    
##  <a name="exists"></a> Determining Whether a Package or Folder Exists    
 To determine programmatically whether a saved package exists, call one of the following methods before attempting to load and run the package:    
    
| Storage Location | Method to Call |
| --- | --- |
| SSIS Package Store | [Microsoft.SqlServer.Dts.Runtime.Application.ExistsOnDtsServer%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application.ExistsOnDtsServer%252A) |
| SQL Server |
| [Microsoft.SqlServer.Dts.Runtime.Application.ExistsOnSqlServer%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application.ExistsOnSqlServer%252A) |
    
 To determine programmatically whether a folder exists, call one of the following methods before attempting to list the packages stored in the folder, :    
    
| Storage Location | Method to Call |
| --- | --- |
| SSIS Package Store | [Microsoft.SqlServer.Dts.Runtime.Application.FolderExistsOnDtsServer%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application.FolderExistsOnDtsServer%252A) |
| SQL Server |
| [Microsoft.SqlServer.Dts.Runtime.Application.FolderExistsOnSqlServer%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application.FolderExistsOnSqlServer%252A) |
    
 [Back to top](#top)    
    
##  <a name="managing"></a> Managing Packages and Folders    
 The [Microsoft.SqlServer.Dts.Runtime.Application](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application) class of the [Microsoft.SqlServer.Dts.Runtime](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime) namespace provides additional methods for managing packages and the folders in which they are stored.    
    
###  <a name="managing_rempkg"></a> Removing a Package    
 To remove a saved package programmatically, call one of the following methods:    
    
| Storage Location | Method to Call |
| --- | --- |
| SSIS Package Store | [Microsoft.SqlServer.Dts.Runtime.Application.RemoveFromDtsServer%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application.RemoveFromDtsServer%252A) |
| SQL Server |
| [Microsoft.SqlServer.Dts.Runtime.Application.RemoveFromSqlServer%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application.RemoveFromSqlServer%252A) |
    
 [Back to top](#top)    
    
###  <a name="managing_create"></a> Creating a Folder    
 To create a storage folder programmatically, call one of the following methods:    
    
| Storage Location | Method to Call |
| --- | --- |
| SSIS Package Store | [Microsoft.SqlServer.Dts.Runtime.Application.CreateFolderOnDtsServer%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application.CreateFolderOnDtsServer%252A) |
| SQL Server |
| [Microsoft.SqlServer.Dts.Runtime.Application.CreateFolderOnSqlServer%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application.CreateFolderOnSqlServer%252A) |
    
 [Back to top](#top)    
    
###  <a name="managing_remfldr"></a> Removing a Folder    
 To remove a storage folder programmatically, call one of the following methods:    
    
| Storage Location | Method to Call |
| --- | --- |
| SSIS Package Store | [Microsoft.SqlServer.Dts.Runtime.Application.RemoveFolderFromDtsServer%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application.RemoveFolderFromDtsServer%252A) |
| SQL Server |
| [Microsoft.SqlServer.Dts.Runtime.Application.RemoveFolderFromSqlServer%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application.RemoveFolderFromSqlServer%252A) |
    
 [Back to top](#top)    
    
###  <a name="managing_rename"></a> Renaming a Folder    
 To rename a storage folder programmatically, call one of the following methods:    
    
| Storage Location | Method to Call |
| --- | --- |
| SSIS Package Store | [Microsoft.SqlServer.Dts.Runtime.Application.RenameFolderOnDtsServer%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application.RenameFolderOnDtsServer%252A) |
| SQL Server |
| [Microsoft.SqlServer.Dts.Runtime.Application.RenameFolderOnSqlServer%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application.RenameFolderOnSqlServer%252A) |
    
 [Back to top](#top)    
    
## Related content

- [Package Management (SSIS Service)](../service/package-management-ssis-service.md)
- [Enumerating Available Packages Programmatically](enumerating-available-packages-programmatically.md)
