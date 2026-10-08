---
title: "System Requirements"
description: "System Requirements for SQL Server Native Client"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "system requirements [SQL Server Native Client]"
  - "data access [SQL Server Native Client], system requirements"
  - "SQL Server Native Client, system requirements"
  - "SQLNCLI, system requirements"
---
# System Requirements for SQL Server Native Client

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



  To use data access features of  SQL Server 
 such as MARS, you must have the following software installed:  
  
-    SQL Server 
 Native Client on your client.  
  
-   An instance of  SQL Server 
 on your server.  
  
  SQL Server 
 Native Client requires Windows Installer 3.1. Windows Installer 3.1 is already installed on  Microsoft 
 Windows operating systems. For all other platforms you need to explicitly install it. For more information, see [Windows Installer 3.1 Redistributable (v2)](https://support.microsoft.com/topic/windows-installer-3-1-v2-3-1-4000-2435-is-available-e3978d9b-5fbf-bfec-71b9-1a463290065a).  
  
> **Note:**  
>  Make sure you log on with administrator privileges before installing this software.  
  
## Operating System Requirements  
 For a list of operating systems that support  SQL Server 
 Native Client, see [Support Policies for SQL Server Native Client](applications/support-policies-for-sql-server-native-client.md).  
  
## SQL Server Requirements  
 To use  SQL Server 
 Native Client to access data in  SQL Server 
 databases, you must have an instance of  SQL Server 
 installed.  
  
  SQL Server 2014 (12.x)
 supports connections from all versions of MDAC, Windows Data Access Components, and all versions of  SQL Server 
 Native Client. When an older client version connects to  SQL Server 
, server data types not known to the client are mapped to types that are compatible with the client version. For more information, see Data Type Compatibility for Client Versions, later in this topic.  
  
## Cross-Language Requirements  
 The English-language version of  SQL Server 
 Native Client is supported on all localized versions of supported operating systems. Localized versions of  SQL Server 
 Native Client are supported on localized operating systems that are the same language as the localized  SQL Server 
 Native Client version. Localized versions of  SQL Server 
 Native Client are also supported on English-language versions of supported operating systems as long as the matching language settings are installed.  
  
 For upgrades:  
  
-   English-language versions of  SQL Server 
 Native Client can be upgraded to any localized version of  SQL Server 
 Native Client.  
  
-   Localized versions of  SQL Server 
 Native Client can be upgraded to localized versions of  SQL Server 
 Native Client of the same language.  
  
-   Localized version of  SQL Server 
 Native Client can be upgraded to the English-language version of  SQL Server 
 Native Client.  
  
-   Localized versions of  SQL Server 
 Native Client cannot be upgraded to localized  SQL Server 
 Native Client versions of a different localized language.  
  
## Data Type Compatibility for Client Versions  
  SQL Server 
 and  SQL Server 
 Native Client map new data types to older datatypes that are compatible with down-level clients, as shown in the table below.  
  
 OLE DB and ADO applications can use the **DataTypeCompatibility** connection string keyword with  SQL Server 
 Native Client to operate with older data types. When **DataTypeCompatibility=80**, OLE DB clients will connect using the  SQL Server 2005 (9.x) 
 tabular data stream (TDS) version, rather than the  TDS version. This means that for  SQL Server 2008 (10.0.x) 
 and later data types, down-level conversion will be performed by the server, rather than by  SQL Server 
 Native Client. It also means that the features available on the connection will be limited to the  SQL Server 2005 (9.x) 
 feature set. Attempts to use new datatypes or features are detected as early as possible on API calls and errors are returned to the calling application, rather than attempting to pass invalid requests to the server.  
  
 There is no **DataTypeCompatibility** control for ODBC.  
  
 IDBInfo::GetKeywords will always return a keyword list that corresponds to the server version on the connection and is not affected by **DataTypeCompatibility**.  
  
|Data type|SQL Server Native Client<br /><br /> SQL Server 2005|SQL Server Native Client 11.0<br /><br />  SQL Server 2014 (12.x)
|Windows Data Access Components, MDAC, and<br /><br /> SQL Server Native Client OLE DB applications with DataTypeCompatibility=80|  
|---------------|--------------------------------------------------|-------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|  
|CLR UDT (\<= 8Kb)|udt|Udt|Varbinary|  
|varbinary(max)|varbinary|varbinary|Image|  
|varchar(max)|varchar|varchar|Text|  
|nvarchar(max)|nvarchar|nvarchar|Ntext|  
|xml|xml|xml|Ntext|  
|CLR UDT (> 8Kb)|udt|varbinary|Image|  
|date|date|varchar|Varchar|  
|datetime2|datetime2|varchar|Varchar|  
|datetimeoffset|datetimeoffset|varchar|Varchar|  
|time|time|varchar|Varchar|  
  
## Related content

- [SQL Server Native Client Programming](sql-server-native-client-programming.md)
- [Installing SQL Server Native Client](applications/installing-sql-server-native-client.md)
