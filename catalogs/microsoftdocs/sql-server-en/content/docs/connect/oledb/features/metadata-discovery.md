---
title: "Metadata Discovery"
description: Learn how metadata discovery improvements allow OLE DB Driver for SQL Server applications to ensure metadata compatibility.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: vanto, randolphwest, davidengel, sunilbs, vbeiranvand
ms.date: "06/12/2018"
ms.service: sql
ms.subservice: connectivity
ms.topic: "reference"
ms.custom:
  - ignite-2025
---
# Metadata Discovery

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)






  The metadata discovery improvement in  SQL Server 2012 (11.x) 
 allows OLE DB Driver for SQL Server applications to ensure that column or parameter metadata returned from the execution of a query is identical to or compatible with the metadata format you specified before you executed the query. You will receive an error if the metadata returned after query execution is not compatible with the metadata format you specified before query execution.  
  
 In bcp and IBCPSession and IBCPSession2 interfaces, you can now specify a delayed read (delayed metadata discovery) to avoid metadata discovery for query out operations. This improves performance and eliminates metadata discovery failures.  
  
 If you develop an application using OLE DB Driver for SQL Server but connect to a server version earlier than  SQL Server 2012 (11.x) 
, metadata discovery functionality will correspond to the version of the server.  
  
## Remarks   
 The following OLE DB member functions have been enhanced in  SQL Server 2012 (11.x) 
 to provide improved metadata discovery:  
  
-   IColumnsInfo::GetColumnInfo  
  
-   IColumnsRowset::GetColumnsRowset  
  
-   ICommandWithParameters::GetParameterInfo (see [ICommandWithParameters](../ole-db-interfaces/icommandwithparameters.md) for more information)  
  
 You will also see a performance improvement when specifying metadata format using IBCPSession::BCPSetBulkMode  
  
 The improved metadata discovery in OLE DB Driver for SQL Server is possible because of the addition of two stored procedures in  SQL Server 2012 (11.x) 
:  
  
-   sp_describe_first_result_set  
  
-   sp_describe_undeclared_parameters  
  
## Related content

- [OLE DB Driver for SQL Server Features](oledb-driver-for-sql-server-features.md)
