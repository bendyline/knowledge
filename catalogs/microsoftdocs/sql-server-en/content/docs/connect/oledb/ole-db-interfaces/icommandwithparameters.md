---
title: "ICommandWithParameters (OLE DB driver)"
description: "Learn how improvements allow ICommandWithParameters::GetParameterInfo to obtain more accurate descriptions of expected results for OLE DB Driver for SQL Server."
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: vanto, randolphwest, davidengel, sunilbs, vbeiranvand
ms.date: "06/14/2018"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
ms.custom:
  - ignite-2025
---
# ICommandWithParameters

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)






  Improvements in the database engine beginning with  SQL Server 2012 (11.x) 
 allow ICommandWithParameters::GetParameterInfo to obtain more accurate descriptions of the expected results. These more accurate results may differ from the values returned by CommandWithParameters::GetParameterInfo in previous versions of  SQL Server 
. For more information, see [Metadata Discovery](../features/metadata-discovery.md).  
  
 Also beginning in  SQL Server 2012 (11.x) 
, when calling ICommandWithParameters::SetParameterInfo, the value passed to the *pwszName* parameter must be a valid identifier. For more information, see [Database Identifiers](../../../relational-databases/databases/database-identifiers.md).  
  
## Related content

- [OLE DB Driver for SQL Server (OLE DB) Interfaces](oledb-driver-for-sql-server-ole-db-interfaces.md)
