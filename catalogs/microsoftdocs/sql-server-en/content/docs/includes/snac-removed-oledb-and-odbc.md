---
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: jopilov, randolphwest
ms.date: 12/29/2025
ms.service: sql
ms.topic: include
---
[SQL Server Native Client](../relational-databases/native-client/sql-server-native-client.md) (SNAC) isn't shipped with:

-  SQL Server 2022 (16.x) 
 and later versions
-  SQL Server Management Studio 
 19 and later versions

The SQL Server Native Client (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) aren't recommended for new application development.

For new projects, use one of the following drivers:

- [Microsoft ODBC Driver for SQL Server](../connect/odbc/microsoft-odbc-driver-for-sql-server.md)
- [Microsoft OLE DB Driver for SQL Server](../connect/oledb/oledb-driver-for-sql-server.md)

For SQLNCLI that ships as a component of  SQL Server Database Engine 
 (versions 2012 through 2019), see this [Support Lifecycle exception](../relational-databases/native-client/applications/support-policies-for-sql-server-native-client.md#support-lifecycle-exception).
