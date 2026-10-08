---
title: "Building Applications"
description: Find out how to build applications, with upgrades from MDAC, header and library files, and connection strings, with the SQL Server Native Client library.
author: markingmyname
ms.author: maghan
ms.date: 12/16/2019
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "data access [SQL Server Native Client], building applications"
  - "SQLNCLI, building applications"
  - "applications [SQL Server Native Client]"
  - "SQL Server Native Client, building applications"
---
# Building Applications with SQL Server Native Client

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


  When developing an application that uses the  SQL Server 
 Native Client library, there are a number of issues that come into play. The topics in this section discuss many of these issues including upgrading from MDAC to  SQL Server 
 Native Client, using the  SQL Server 
 Native Client header and library files, and an overview of the various connection strings that can be used with  SQL Server 
 Native Client.  
  
## In This Section  
 [Installing SQL Server Native Client](installing-sql-server-native-client.md)  
 Discusses how  SQL Server 
 Native Client is installed, the locations that various components are installed to, and how to uninstall  SQL Server 
 Native Client.  
  
 [Components of SQL Server Native Client](components-of-sql-server-native-client.md)  
 Discusses the components that make up  SQL Server 
 Native Client including library, resource, help, and header files.  
  
 [Using Connection String Keywords with SQL Server Native Client](using-connection-string-keywords-with-sql-server-native-client.md)  
 Discusses the various types of connection strings that can be used when connecting to a database through  SQL Server 
 Native Client.  
  
 [Using the SQL Server Native Client Header and Library Files](using-the-sql-server-native-client-header-and-library-files.md)  
 Discusses how to use the  SQL Server 
 Native Client header and library files within an application.  
  
 [Updating an Application to SQL Server Native Client from MDAC](updating-an-application-to-sql-server-native-client-from-mdac.md)  
 Discusses the differences between  SQL Server 
 Native Client and MDAC and issues that should be considered when upgrading from MDAC to  SQL Server 
 Native Client.  
  
 [Updating an Application from SQL Server 2005 Native Client](updating-an-application-from-sql-server-2005-native-client.md)  
 Discusses issues that should be considered when upgrading from  SQL Server 2005 (9.x) 
 Native Client to  SQL Server 
 Native Client in  SQL Server 2012 (11.x) 
.  
  
 [Using ADO with SQL Server Native Client](using-ado-with-sql-server-native-client.md)  
 Discusses how ADO can use  SQL Server 
 Native Client to access and use  SQL Server 
 functionality.  
  
 [Support Policies for SQL Server Native Client](support-policies-for-sql-server-native-client.md)  
 Discusses how various data-access components can be used with different versions of  SQL Server 
 Native Client.  
  
 [Connecting to an Azure SQL Database Using SQL Server Native Client](connecting-to-a-windows-azure-sql-database-using-sql-server-native-client.md)  
 Discusses how to connect to a  SQL Database
 using  SQL Server 
 Native Client.  
  
## Related content

- [SQL Server Native Client Programming](../sql-server-native-client-programming.md)
- [ODBC How-to Topics](../../native-client-odbc-how-to/odbc-how-to-topics.md)
- [OLE DB How-to Topics (Native Client OLE DB provider)](../../native-client-ole-db-how-to/ole-db-how-to-topics.md)
