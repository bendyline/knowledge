---
title: "ICommandWithParameters (Native Client OLE DB provider)"
description: "ICommandWithParameters (Native Client OLE DB provider)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
---
# ICommandWithParameters (Native Client OLE DB Provider)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:**
> The [SQL Server Native Client](../native-client/sql-server-native-client.md) (often abbreviated SNAC) has been removed from  SQL Server 2022 (16.x) 
 and  SQL Server Management Studio 
 19 (SSMS). Both the SQL Server Native Client OLE DB provider (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) are not recommended for new development. Switch to the new [Microsoft OLE DB Driver (MSOLEDBSQL) for SQL Server](../../connect/oledb/oledb-driver-for-sql-server.md) going forward. 

  Improvements in the database engine beginning with  SQL Server 2012 (11.x) 
 allow ICommandWithParameters::GetParameterInfo to obtain more accurate descriptions of the expected results. These more accurate results may differ from the values returned by CommandWithParameters::GetParameterInfo in previous versions of  SQL Server 
. For more information, see [Metadata Discovery](../native-client/features/metadata-discovery.md).  
  
 Also beginning in  SQL Server 2012 (11.x) 
, when calling ICommandWithParameters::SetParameterInfo, the value passed to the *pwszName* parameter must be a valid identifier. For more information, see [Database Identifiers](../databases/database-identifiers.md).  
  
## Related content

- [SQL Server Native Client (OLE DB) Interfaces](sql-server-native-client-ole-db-interfaces.md)
