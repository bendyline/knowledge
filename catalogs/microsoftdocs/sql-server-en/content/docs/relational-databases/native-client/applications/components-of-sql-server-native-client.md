---
title: "Components"
description: Learn about components of the SQL Server Native Client such as sqlncli11.dll, sqlnclir11.rll, sqlncli.h, and sqlncli11.lib.
author: markingmyname
ms.author: maghan
ms.date: "06/14/2024"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQL Server Native Client ODBC driver, about SQL Server Native Client ODBC driver"
  - "data access [SQL Server Native Client], components"
  - "components [SQL Server Native Client]"
  - "SQLNCLI, about SQL Server Native Client"
---
# Components of SQL Server Native Client

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
 (versions 2012 through 2019), see this [Support Lifecycle exception](support-policies-for-sql-server-native-client.md#support-lifecycle-exception).


   SQL Server 
 Native Client contains the following components:  
  
| Component | Description |
| --- | --- |
| sqlncli11.dll | The dynamic-link library (DLL) file that contains all of the  SQL Server |
 | Native Client functionality. This includes the  SQL Server |
 | Native Client OLE DB provider and the  SQL Server |
 | Native Client ODBC driver. |
| sqlnclir11.rll | The accompanying resource file for the  SQL Server |
 | Native Client library. |
| sqlncli.h | The  SQL Server |
 | Native Client header file that contains all of the new definitions needed in order to use  SQL Server |
 | Native Client. This header file replaces both the odbcss.h and the sqloledb.h header files.<br /><br /> Note: You cannot reference sqlncli.h and odbcss.h in the same program, but you can reference sqlncli.h and sqloledb.h in same program as long as sqloledb.h is defined first. |
| sqlncli11.lib | The library file needed to directly call the **bcp** utility functions that are part of the  SQL Server |
 | Native Client ODBC driver.<br /><br /> Note: If you do reference the sqlncli11.lib file in your programming code, you need to make sure that the sqlncli11.dll file is in your system path, and in the system path of the users that make use of your application. |
  
## Related content

- [Building Applications with SQL Server Native Client](building-applications-with-sql-server-native-client.md)
