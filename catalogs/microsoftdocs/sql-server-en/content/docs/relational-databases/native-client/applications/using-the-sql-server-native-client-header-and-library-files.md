---
title: "Header and Library Files"
description: Learn how to use the SQL Server Native Client header and library files to develop an application. Copy required files to your development environment.
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "header files [SQL Server Native Client]"
  - "SQLNCLI, header files"
  - "OLE DB, header files"
  - "library files [SQL Server Native Client]"
  - "SQL Server Native Client, header files"
  - "data access [SQL Server Native Client], header files"
  - "SQL Server Native Client ODBC driver,header files"
  - "data access [SQL Server Native Client], library files"
  - "SQL Server Native Client, library files"
  - "ODBC applications, header files"
  - "SQLNCLI, library files"
---
# Using the SQL Server Native Client Header and Library Files

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


  The  SQL Server 
 Native Client header and library files are installed with  SQL Server 
. When developing an application, it is important to copy and install all of the required files for development to your development environment. For more information about installing and redistributing  SQL Server 
 Native Client, see [Installing SQL Server Native Client](installing-sql-server-native-client.md).  
  
 The  SQL Server 
 Native Client header and library files are installed in the following location:  
  
 *%PROGRAM FILES%*\Microsoft SQL Server\110\SDK  
  
 The  SQL Server 
 Native Client header file (sqlncli.h) can be used to add  SQL Server 
 Native Client data access functionality to your custom applications. The  SQL Server 
 Native Client header file contains all of the definitions, attributes, properties, and interfaces needed to take advantage of the new features introduced in  SQL Server 2005 (9.x) 
.  
  
 In addition to the  SQL Server 
 Native Client header file, there is also a sqlncli11.lib library file which is the export library for  SQL Server 
 Bulk Copy Program (BCP) functionality for ODBC.  
  
 The  SQL Server 
 Native Client header file is backward compatible with both the sqloledb.h and odbcss.h header files used with Microsoft Data Access Components (MDAC), but does not contain CLSIDs for SQLOLEDB (the OLE DB provider for  SQL Server 
 included with MDAC) or symbols for XML functionality (which is not supported by  SQL Server 
 Native Client).  
  
 ODBC applications cannot reference the  SQL Server 
 Native Client header (sqlncli.h) and odbcss.h in the same program. Even if you are not using any of the features introduced in  SQL Server 2005 (9.x) 
, the  SQL Server 
 Native Client header file will work in place of the older odbcss.h.  
  
 OLE DB applications which use the  SQL Server 
 Native Client OLE DB provider only need to reference sqlncli.h. If an application uses both MDAC (SQLOLEDB) and the  SQL Server 
 Native Client OLE DB provider, it can reference both sqloledb.h and sqlncli.h, but the reference to sqloledb.h must come first.  
  
## Using the SQL Server Native Client Header File  
 To use the  SQL Server 
 Native Client header file, you must use an **include** statement within your C/C++ programming code. The following sections describe how to do this for both OLE DB and ODBC applications.  
  
> **Note:**  
>  The  SQL Server 
 Native Client header and library files can only be compiled using Visual Studio C++ 2002 or later.  
  
### OLE DB  
 To use the  SQL Server 
 Native Client header file in an OLE DB application, using the following lines of programming code:  
  
```  
#define _SQLNCLI_OLEDB_  
include "sqlncli.h";  
```  
  
> **Note:**  
>  The first line of code shown above should be omitted if both the OLE DB and ODBC APIs are used by the application. In addition, if the application has an **include** statement for sqloledb.h, the **include** statement for sqlncli.h must come after it.  
  
 When creating a connection to a data source through  SQL Server 
 Native Client, use "SQLNCLI11" as the provider name string.  
  
### ODBC  
 To use the  SQL Server 
 Native Client header file in an ODBC application, using the following lines of programming code:  
  
```  
#define _SQLNCLI_ODBC_  
include "sqlncli.h";  
```  
  
> **Note:**  
>  The first line of code shown above should be omitted if both OLE DB and ODBC APIs are used by the application. In addition, if the application has an `#include` statement for odbcss.h, it should be removed.  
  
 When creating a connection to a data source through  SQL Server 
 Native Client, use "SQL Server Native Client 11.0" as the driver name string.  
  
## Component Names and Properties by Version  
  
|Property|SQL Server Native Client<br /><br /> SQL Server 2005|SQL Server Native Client 10.0<br /><br /> SQL Server 2008|SQL Server Native Client 11.0<br /><br />  SQL Server 2012 (11.x) 
|MDAC|  
|--------------|--------------------------------------------------|-------------------------------------------------------|---------------------------------------------------------------|----------|  
|ODBC driver name|SQL Native Client|SQL Server Native Client 10.0|SQL Server Native Client 11.0|SQL Server|  
|ODBC header  file name|Sqlncli.h|Sqlncli.h|Sqlncli.h|Odbcss.h|  
|ODBC driver DLL|Sqlncli.dll|Sqlncl10.dll|Sqlncl11.dll|sqlsrv32.dll|  
|ODBC lib file for BCP APIs|Sqlncli.lib|Sqlncli10.lib|Sqlncli11.lib|Odbcbcp.lib|  
|ODBC DLL for BCP APIs|Sqlncli.dll|Sqlncli10.dll|Sqlncli11.dll|Odbcbcp.dll|  
|OLE DB PROGID|SQLNCLI|SQLNCLI10|SQLNCLI11|SQLOLEDB|  
|OLE DB header file name|Sqlncli.h|Sqlncli.h|Sqlncli.h|Sqloledb.h|  
|OLE DB provider DLL|Sqlncli.dll|Sqlncli10.dll|Sqlncli11.dll|Sqloledb.dll|  
  
 sqlncli.h supports multiple version of  SQL Server 
 Native Client through the SQLNCLI_VER macro. By default, SQLNCLI_VER defaults to the latest version of  SQL Server 
 Native Client. To build an application that uses sqlncli10.dll rather than sqlncli11.dll, set SQLNCLI_VER to 10.  
  
## Static Linking and BCP Functions  
 When an application uses BCP functions, it is important for the application to specify in the connection string the driver from the same version that shipped with the header file and library used to compile the application.  
  
 For example, if you compile an application using  SQL Server 
 Native Client, and the associated library file (sqlncli11.lib) and header file (sqlncli.h) from \Program Files\Microsoft SQL Server\110\SDK, make sure to specify (using ODBC as an example) "DRIVER={SQL Server Native Client 11.0}" in the connection string.  
  
 For more information, see Performing [Performing Bulk Copy Operations](../features/performing-bulk-copy-operations.md).  
  
## Related content

- [Building Applications with SQL Server Native Client](building-applications-with-sql-server-native-client.md)
