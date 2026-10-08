---
title: "Large CLR User-Defined Types"
description: "Large CLR User-Defined Types in SQL Server Native Client"
author: markingmyname
ms.author: maghan
ms.date: "03/17/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "large CLR user-defined types"
---
# Large CLR User-Defined Types in SQL Server Native Client

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:** 
> [SQL Server Native Client](../sql-server-native-client.md) (SNAC) isn't shipped with:

-  SQL Server 2022 (16.x) 
 and later versions
-  SQL Server Management Studio 
 19 and later versions

The SQL Server Native Client (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) aren't recommended for new application development.

For new projects, use one of the following drivers:

- [Microsoft ODBC Driver for SQL Server](../../../connect/odbc/microsoft-odbc-driver-for-sql-server.md)
- [Microsoft OLE DB Driver for SQL Server](../../../connect/oledb/oledb-driver-for-sql-server.md)

For SQLNCLI that ships as a component of  SQL Server Database Engine 
 (versions 2012 through 2019), see this [Support Lifecycle exception](../applications/support-policies-for-sql-server-native-client.md#support-lifecycle-exception).


  In SQL Server 2005, user-defined types (UDTs) in the common language runtime (CLR) were restricted to 8,000 bytes in size. This restriction has been lifted in  SQL Server 2008 (10.0.x) 
 and later versions. CLR UDTs are now treated in a similar way to large object (LOB) types. That is, UDTs less than or equal to 8,000 bytes behave the same way as in SQL Server 2005, but larger UDTs are supported and report their size as "unlimited".  
  
 For more information, see [Large CLR User-Defined Types (OLE DB)](../ole-db/large-clr-user-defined-types-ole-db.md) and [Large CLR User-Defined Types (ODBC)](../odbc/large-clr-user-defined-types-odbc.md).  
  
## Use Cases  
 For ODBC, support for large UDTs includes the ability to send UDT values in pieces as data-at-execution parameters. This is done by using SQLPutData.  
  
 For OLE DB, support for large UDTs includes the ability to stream UDT values to and from the server by using ISequentialStream binding.  
  
 UDTs less than or equal to 8,000 bytes will behave as they did in SQL Server 2005. For OLE DB, you can still stream small UDTs by using ISequentialStream binding.  
  
 Sometimes native code will have to understand the contents of CLR UDTs, but will not have to instantiate managed objects. If this is the case, you can use custom serialization to convert UDT values on the server into a well known format for clients.  
  
 For applications that have existing data access code, you can exploit CLR UDT behavior on the client by retrieving UDTs through native APIs and instantiating them by using C++ CLI interop in mixed mode applications.  
  
## Related content

- [SQL Server Native Client Features](sql-server-native-client-features.md)
