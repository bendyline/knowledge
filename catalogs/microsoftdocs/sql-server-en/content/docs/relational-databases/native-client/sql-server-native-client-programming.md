---
title: "Programming"
description: Use these resources to understand SQL Server Native Client, a stand-alone data access API, used for both OLE DB and ODBC.
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQLNCLI, about SQL Server Native Client"
  - "SQL Server Native Client, about SQL Server Native Client"
  - "data access [SQL Server Native Client], about SQL Server Native Client"
  - "data access [SQL Server Native Client]"
  - "SQL Server Native Client"
  - "SQLNCLI"
  - "native data access [SQL Server Native Client]"
---
# SQL Server Native Client Programming

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
 Native Client is a stand-alone data access application programming interface (API), used for both OLE DB and ODBC, that was introduced in  SQL Server 2005 (9.x) 
.  SQL Server 
 Native Client combines the SQL OLE DB provider and the SQL ODBC driver into one native dynamic-link library (DLL). It also provides new functionality above and beyond that supplied by the Windows Data Access Components (Windows DAC, formerly Microsoft Data Access Components, or MDAC).  SQL Server 
 Native Client can be used to create new applications or enhance existing applications that need to take advantage of features introduced in  SQL Server 2005 (9.x) 
, such as multiple active result sets (MARS), user-defined data types (UDT), query notifications, snapshot isolation, and XML data type support.  
  
> **Note:**  
>  For a list of the differences between  SQL Server 
 Native Client and Windows DAC, plus information about issues to consider before updating a Windows DAC application to  SQL Server 
 Native Client, see [Updating an Application to SQL Server Native Client from MDAC](applications/updating-an-application-to-sql-server-native-client-from-mdac.md).  
  
 The  SQL Server 
 Native Client ODBC driver is always used in conjunction with the ODBC Driver Manager supplied with Windows DAC. The  SQL Server 
 Native Client OLE DB provider can be used in conjunction with OLE DB Core Services supplied with Windows DAC, but this is not a requirement; the choice to use Core Services or not depends on the requirements of the individual application (for example, if connection pooling is required).  
  
 ActiveX Data Object (ADO) applications may use the  SQL Server 
 Native Client OLE DB provider, but it is recommended to use ADO in conjunction with the **DataTypeCompatibility** connection string keyword (or its corresponding **DataSource** property). When using the  SQL Server 
 Native Client OLE DB provider, ADO applications may exploit those new features introduced in  SQL Server 2005 (9.x) 
 that are available via the  SQL Server 
 Native Client via connection string keywords or OLE DB properties or  Transact-SQL . For more information about the use of these features with ADO, see [Using ADO with SQL Server Native Client](applications/using-ado-with-sql-server-native-client.md).  
  
  SQL Server 
 Native Client was designed to provide a simplified method of gaining native data access to SQL Server using either OLE DB or ODBC. It is simplified in that it combines OLE DB and ODBC technologies into one library, and it provides a way to innovate and evolve new data access features without changing the current Windows DAC components, which are now part of the Microsoft Windows platform.  
  
 While  SQL Server 
 Native Client uses components in Windows DAC, it is not explicitly dependent on a particular version of Windows DAC. You can use  SQL Server 
 Native Client with the version of Windows DAC that is installed with any operating system supported by  SQL Server 
 Native Client.  
  
## In This Section  
 [SQL Server Native Client](sql-server-native-client.md)  
 Lists the significant new  SQL Server 
 Native Client features.  
  
 [When to Use SQL Server Native Client](when-to-use-sql-server-native-client.md)  
 Discusses how  SQL Server 
 Native Client fits in with Microsoft data access technologies, how it compares to Windows DAC and ADO.NET, and provides pointers for deciding which data access technology to use.  
  
 [SQL Server Native Client Features](features/sql-server-native-client-features.md)  
 Describes the features supported by  SQL Server 
 Native Client.  
  
 [Building Applications with SQL Server Native Client](applications/building-applications-with-sql-server-native-client.md)  
 Provides an overview of  SQL Server 
 Native Client development, including how it differs from Windows DAC, the components that it uses, and how ADO can be used with it.  
  
 This section also discusses  SQL Server 
 Native Client installation and deployment, including how to redistribute the  SQL Server 
 Native Client library.  
  
 [System Requirements for SQL Server Native Client](system-requirements-for-sql-server-native-client.md)  
 Discusses the system resources needed to use  SQL Server 
 Native Client.  
  
 [SQL Server Native Client (OLE DB)](ole-db/sql-server-native-client-ole-db.md)  
 Provides information about using the  SQL Server 
 Native Client OLE DB provider.  
  
 [SQL Server Native Client (ODBC)](odbc/sql-server-native-client-odbc.md)  
 Provides information about using the  SQL Server 
 Native Client ODBC driver.  
  
 [Finding More SQL Server Native Client Information](finding-more-sql-server-native-client-information.md)  
 Provides additional resources about  SQL Server 
 Native Client, including links to external resources and getting further assistance.  
  
 [SQL Server Native Client Errors](sql-server-native-client-error-mssqlserver-50000.md)  
 Contains topics about runtime errors associated with  SQL Server 
 Native Client.  
  
## Related content

- [Updating an Application from SQL Server 2005 Native Client](applications/updating-an-application-from-sql-server-2005-native-client.md)
- [ODBC How-to Topics](../native-client-odbc-how-to/odbc-how-to-topics.md)
- [OLE DB How-to Topics (Native Client OLE DB provider)](../native-client-ole-db-how-to/ole-db-how-to-topics.md)
