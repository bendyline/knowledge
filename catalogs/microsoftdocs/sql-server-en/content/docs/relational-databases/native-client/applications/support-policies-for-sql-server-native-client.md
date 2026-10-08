---
title: Support Policies
description: Learn about SQL Server Native Client supported SQL Server versions, operating systems, and support policies for ADO, BCP, ODBC, and OLE DB.
author: markingmyname
ms.author: maghan
ms.date: 09/06/2022
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
---
# Support Policies for SQL Server Native Client

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


  This topic discusses how various data-access components can be used with  SQL Server 
 Native Client (SNAC).  
  
## Server Support  
  SQL Server 
 Native Client 11.0 supports connections to,  SQL Server 2008 (10.0.x) 
,  SQL Server 2008 R2 (10.50.x) 
,  SQL Server 2012 (11.x) 
,  SQL Server 2014 (12.x)
, and  Azure SQL Database 
.  
  
## Supported Operating System Versions  
 The following table lists which operating systems support  SQL Server 
 Native Client.  
  
| SQL Server Native Client version | Supported operating systems |
| --- | --- |
| SQL Server Native Client (SQL Server 2005) | Microsoft Windows 2000 Service Pack 4 or later<br /><br /> Microsoft Windows Server 2003 or later<br /><br /> Microsoft Windows XP Service Pack 1 or later<br /><br /> Microsoft Windows Vista (requires  SQL Server |
 | Service Pack 2, or later)<br /><br /> Microsoft Windows Server 2008 R2 (requires  SQL Server |
 | Service Pack 2, or later) |
| SQL Server Native Client 10.0 ( SQL Server 2008 (10.0.x) |
| ) | Microsoft Windows Server 2003 Service Pack 2, or later<br /><br /> Microsoft Windows XP Service Pack 2, or later<br /><br /> Microsoft Windows Vista<br /><br /> Microsoft Windows Server 2008 R2 |
| SQL Server Native Client 10.5 ( SQL Server 2008 R2 (10.50.x) |
| ) | Microsoft Windows Server 2003 Service Pack 2, or later<br /><br /> Microsoft Windows XP Service Pack 2 or later<br /><br /> Microsoft Windows Vista<br /><br /> Microsoft Windows Server 2008 R2<br /><br /> Microsoft Windows 7 |
| SQL Server Native Client 11.0 ( SQL Server 2012 (11.x) |
 | and  SQL Server 2014 (12.x) |
| ) | Microsoft Windows Vista<br /><br /> Microsoft Windows Server 2008 R2<br /><br /> Microsoft Windows 7<br /><br /> Microsoft Windows 8<br /><br /> Microsoft Windows Server 2012 |
  
## ADO Support Policies  
 ADO applications can use the SQLOLEDB OLE DB provider that is included with Windows if they do not require any of the features of  SQL Server 2005 (9.x) 
 or later.  
  
 ADO applications can use the version of  SQL Server 
 Native Client included in  SQL Server 2005 (9.x) 
. ADO applications can also use  SQL Server 
 Native Client 11.0 (included in  SQL Server 2014 (12.x)
), but if they do so they must specify `DataTypeCompatibility=80` in the connection strings. Only features from  SQL Server 2005 (9.x) 
 are available when `DataTypeCompatibility=80` is present in the connection strings.  
  
## BCP Support Policies  
 Beginning in  SQL Server 2008 (10.0.x) 
, bcp.exe supports data files that are no more than three  SQL Server 
 versions older than the version of  SQL Server 
 in which bcp.exe shipped.  
  
## ODBC Support Policies  
 Applications should use the  SQL Server 
 ODBC driver included with the Windows operating system. You can use the  SQL Server 
 Native Client ODBC driver if the application is certified it for use with a specific version of  SQL Server 
 Native Client.  
  
## OLE DB Support Policies  
 Applications should use the  SQL Server 
 OLE DB provider included with the Windows operating system. You can use the  SQL Server 
 Native Client OLE DB provider if the application is certified for use with a specific version of  SQL Server 
 Native Client.  
  
 OLE DB applications that have not been certified for use with  SQL Server 
 Native Client can use  SQL Server 
 Native client if they specify `DataTypeCompatibility=80` in their connection strings.  
  
 OLE DB applications that use OLE DB Service Components can only use  SQL Server 
 Native client if they specify `DataTypeCompatibility=80` in their connection strings. However, no features added after  SQL Server 2005 (9.x) 
 will be available in this case.  
 
 ## Support Lifecycle 
  
  SQL Server Native Client support lifecycle can be found on the [SNAC lifecycle explained blog](https://techcommunity.microsoft.com/t5/sql-server-blog/snac-lifecycle-explained/ba-p/385381). This lifecycle applies to building database applications using SQL Server Native Client. 
 
 ### Support Lifecycle exception
 
Limited support is provided for the SQL Native Client 11.0 that gets installed by SQL Server 2012 through 2019 until the SQL Server respective end-of-support lifecycles. This support exception only applies to the SNAC 11 driver that is installed and used by SQL Server components (e.g. SQL Server Engine Linked Servers). This means the driver is supported on Windows versions where SQL Server 2012 through SQL Server 2019 are supported. Do not remove the SQL Native Client provider that gets installed by SQL Server on the system. The support exception only covers critical security fixes and does not include enhancements or fixes to SQL Native Client 11.0.

This support exception does not cover using SQL Native Client 11.0 as a driver for database applications to connect to SQL Server. Any applications using SNAC 11.0 must be updated to use newer versions (see [Download ODBC Driver for SQL Server - ODBC Driver for SQL Server](../../../connect/odbc/download-odbc-driver-for-sql-server.md) and [Download Microsoft OLE DB Driver for SQL Server - OLE DB Driver for SQL Server](../../../connect/oledb/download-oledb-driver-for-sql-server.md)). 




## Related content

- [Building Applications with SQL Server Native Client](building-applications-with-sql-server-native-client.md)
