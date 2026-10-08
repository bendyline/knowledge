---
title: "SMO Object Model"
description: "SMO Object Model"
author: "markingmyname"
ms.author: "maghan"
ms.date: "03/14/2017"
ms.service: sql
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "object models [SMO]"
  - "SMO [SQL Server], object model"
  - "SQL Server Management Objects, object model"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# SMO Object Model

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  The SMO object model is made up of a hierarchy of objects. The [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server) object is the top level object and all instance class objects reside under the [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server) object.  
  
 The [Microsoft.SqlServer.Management.Smo.Wmi.ManagedComputer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Wmi.ManagedComputer) class is a top level class with a separate object hierarchy. The [Microsoft.SqlServer.Management.Smo.Wmi.ManagedComputer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Wmi.ManagedComputer) object represents  Microsoft 
  SQL Server 
 services and network settings available through the WMI Provider.  
  
 Besides the [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server) and [Microsoft.SqlServer.Management.Smo.Wmi.ManagedComputer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Wmi.ManagedComputer) objects, there are several utility classes that represent tasks or operations, such as [Microsoft.SqlServer.Management.Smo.Transfer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Transfer), [Microsoft.SqlServer.Management.Smo.Backup](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Backup), or [Microsoft.SqlServer.Management.Smo.Restore](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Restore)  
  
 The SMO object model is made up of several namespaces. For more information, see [SMO Namespaces](smo-object-model-namespaces.md).  
  
## Related content

- [SMO Object Model Diagram](smo-object-model-diagram.md)
- [SMO Object Model Namespaces](smo-object-model-namespaces.md)
- [WMI Provider for Configuration Management](../wmi-provider-configuration/wmi-provider-for-configuration-management.md)
