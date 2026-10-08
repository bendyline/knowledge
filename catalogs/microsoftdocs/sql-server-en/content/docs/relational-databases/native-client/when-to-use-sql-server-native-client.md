---
title: "When to Use"
description: Decide whether to use SQL Server Native Client, which is one of several technologies that you can use to access data in a SQL Server database.
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQL Server Native Client ODBC driver, about SQL Server Native Client ODBC driver"
  - "SQLNCLI, about SQL Server Native Client"
  - "data access [SQL Server Native Client], about SQL Server Native Client"
---
# When to Use SQL Server Native Client

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:** 
> [SQL Server Native Client](sql-server-native-client.md) (SNAC) isn't shipped with:

-  SQL Server 2022 (16.x) 
 and later versions
-  SQL Server Management Studio 
 19 and later versions

The SQL Server Native Client (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) aren't recommended for new application development.

For new projects, use one of the following drivers:

- [Microsoft ODBC Driver for SQL Server](../../connect/odbc/microsoft-odbc-driver-for-sql-server.md)
- [Microsoft OLE DB Driver for SQL Server](../../connect/oledb/oledb-driver-for-sql-server.md)

For SQLNCLI that ships as a component of  SQL Server Database Engine 
 (versions 2012 through 2019), see this [Support Lifecycle exception](applications/support-policies-for-sql-server-native-client.md#support-lifecycle-exception).


   SQL Server 
 Native Client is one technology that you can use to access data in a  SQL Server 
 database.  For a discussion of the different data-access technologies, see [Data Access Technologies Road Map](../../connect/connect-history.md)  
  
 When deciding whether to use  SQL Server 
 Native Client as the data access technology of your application, you should consider several factors.  
  
 For new applications, if you're using a managed programming language such as Microsoft Visual C# or Visual Basic, and you need to access the new features in  SQL Server 
, you should use the .NET Framework Data Provider for  SQL Server 
, which is part of the .NET Framework.  
  
 If you are developing a COM-based application and need to access the new features introduced in  SQL Server 
, you should use  SQL Server 
 Native Client. If you don't need access to the new features of  SQL Server 
, you can continue to use Windows Data Access Components (WDAC).  
  
 For existing OLE DB and ODBC applications, the primary issue is whether you need to access the new features of  SQL Server 
. If you have a mature application that does not need the new features of  SQL Server 
, you can continue to use WDAC. But if you do need to access those new features, such as the [xml data type](../../t-sql/xml/xml-transact-sql.md), you should use  SQL Server 
 Native Client.  
  
 Both  SQL Server 
 Native Client and MDAC support read committed transaction isolation using row versioning, but only  SQL Server 
 Native Client supports snapshot transaction isolation. (In programming terms, read committed transaction isolation with row versioning is the same as Read-Committed transaction.)  
  
 For information about the differences between  SQL Server 
 Native Client and MDAC, see [Updating an Application to SQL Server Native Client from MDAC](applications/updating-an-application-to-sql-server-native-client-from-mdac.md).  
  
## Related content

- [SQL Server Native Client Programming](sql-server-native-client-programming.md)
- [ODBC How-to Topics](../native-client-odbc-how-to/odbc-how-to-topics.md)
- [OLE DB How-to Topics (Native Client OLE DB provider)](../native-client-ole-db-how-to/ole-db-how-to-topics.md)
