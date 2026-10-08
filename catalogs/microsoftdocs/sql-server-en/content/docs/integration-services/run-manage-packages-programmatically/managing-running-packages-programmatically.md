---
title: "Managing Running Packages Programmatically"
description: "Managing Running Packages Programmatically"
ms.date: "03/04/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "packages [Integration Services], managing"
  - "running packages [Integration Services]"
---
# Managing Running Packages Programmatically


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  As you work programmatically with  Integration Services 
 packages, you may want to determine which packages are currently running. The [Microsoft.SqlServer.Dts.Runtime.Application](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application) class of the [Microsoft.SqlServer.Dts.Runtime](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime) namespace provides methods and classes to satisfy these requirements.  
  
 For more information about monitoring packages, see [Package Management (SSIS Service)](../service/package-management-ssis-service.md).  
  
 All the methods discussed in this topic require a reference to the **Microsoft.SqlServer.ManagedDTS** assembly. After you add the reference in a new project, import the [Microsoft.SqlServer.Dts.Runtime](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime) namespace with a **using** or **Imports** statement.  
  
> **Important:**  
>  The methods of the [Microsoft.SqlServer.Dts.Runtime.Application](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application) class for working with the SSIS Package Store support only ".", localhost, or the server name for the local server. You cannot use "(local)".  
  
## Determining Which Packages Are Currently Running  
 To determine which packages are currently running on the specified server, call the [Microsoft.SqlServer.Dts.Runtime.Application.GetRunningPackages%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application.GetRunningPackages%252A) method. This method returns a [Microsoft.SqlServer.Dts.Runtime.RunningPackages](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.RunningPackages) collection of [Microsoft.SqlServer.Dts.Runtime.RunningPackage](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.RunningPackage) objects.  
  
> **Note:**  
>  Administrators see all packages that are currently executing on the computer; other users see only those packages that they have launched.  
  
## Working with Running Packages  
 After you have determined which packages are currently running, you can retrieve information about the packages and request that a package be stopped.  
  
### Getting Information about a Running Package  
 As you iterate through the [Microsoft.SqlServer.Dts.Runtime.RunningPackages](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.RunningPackages) collection, you can use the properties of the [Microsoft.SqlServer.Dts.Runtime.RunningPackage](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.RunningPackage) object to locate a package or to obtain additional information about the packages that are running:  
  
-   [Microsoft.SqlServer.Dts.Runtime.RunningPackage.ExecutionDuration%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.RunningPackage.ExecutionDuration%252A)  
  
-   [Microsoft.SqlServer.Dts.Runtime.RunningPackage.ExecutionStartTime%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.RunningPackage.ExecutionStartTime%252A)  
  
-   [Microsoft.SqlServer.Dts.Runtime.RunningPackage.InstanceID%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.RunningPackage.InstanceID%252A)  
  
-   [Microsoft.SqlServer.Dts.Runtime.RunningPackage.PackageDescription%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.RunningPackage.PackageDescription%252A)  
  
-   [Microsoft.SqlServer.Dts.Runtime.RunningPackage.PackageID%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.RunningPackage.PackageID%252A)  
  
-   [Microsoft.SqlServer.Dts.Runtime.RunningPackage.PackageName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.RunningPackage.PackageName%252A)  
  
-   [Microsoft.SqlServer.Dts.Runtime.RunningPackage.UserName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.RunningPackage.UserName%252A)  
  
### Stopping a Running Package  
 You can call the [Microsoft.SqlServer.Dts.Runtime.RunningPackage.Stop%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.RunningPackage.Stop%252A) method of a [Microsoft.SqlServer.Dts.Runtime.RunningPackage](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.RunningPackage) object to request that the package be stopped. There may be a delay between the time that a stop request is issued and the time that the package actually stops.  
  
## Related content

- [Package Management (SSIS Service)](../service/package-management-ssis-service.md)
- [Enumerating Available Packages Programmatically](enumerating-available-packages-programmatically.md)
