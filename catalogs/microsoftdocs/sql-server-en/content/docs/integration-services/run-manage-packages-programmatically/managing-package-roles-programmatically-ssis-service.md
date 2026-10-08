---
title: "Managing Package Roles Programmatically (SSIS Service)"
description: "Managing Package Roles Programmatically (SSIS Service)"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "Integration Services packages, roles"
  - "roles [Integration Services]"
  - "packages [Integration Services], roles"
---
# Managing Package Roles Programmatically (SSIS Service)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  As you work programmatically with  Integration Services 
 packages, you may want to determine which roles are available to apply to packages, or to determine or set the roles applied to an individual package. The [Microsoft.SqlServer.Dts.Runtime.Application](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application) class of the [Microsoft.SqlServer.Dts.Runtime](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime) namespace provides a variety of methods to satisfy these requirements.  
  
 Roles apply only to packages stored in the  SQL Server 
 **msdb** database. For more information about package roles, see [Integration Services Roles (SSIS Service)](../security/integration-services-roles-ssis-service.md).  
  
 All the methods discussed in this topic require a reference to the **Microsoft.SqlServer.ManagedDTS** assembly. After you add the reference in a new project, import the [Microsoft.SqlServer.Dts.Runtime](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime) namespace by using a **using** or **Imports** statement.  
  
> **Important:**  
>  The methods of the [Microsoft.SqlServer.Dts.Runtime.Application](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application) class for working with the SSIS Package Store support only ".", localhost, or the server name for the local server. You cannot use "(local)".  
  
## Determining Which Roles Are Available  
 To determine which roles are available for the packages stored on a particular server, call the [Microsoft.SqlServer.Dts.Runtime.Application.GetDtsServerRoles%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application.GetDtsServerRoles%252A) method of the [Microsoft.SqlServer.Dts.Runtime.Application](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application) class.  
  
## Determining Which Roles Are Assigned  
 To determine which roles have already been assigned to a particular package, call the [Microsoft.SqlServer.Dts.Runtime.Application.GetPackageRoles%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application.GetPackageRoles%252A) method. To assign roles to a package, call the [Microsoft.SqlServer.Dts.Runtime.Application.SetPackageRoles%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Application.SetPackageRoles%252A) method.  
  
## Related content

- [Integration Services Roles (SSIS Service)](../security/integration-services-roles-ssis-service.md)
