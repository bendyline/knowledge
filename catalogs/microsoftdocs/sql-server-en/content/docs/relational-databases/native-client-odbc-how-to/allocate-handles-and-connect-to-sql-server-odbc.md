---
title: "Allocate Handles and Connect to SQL Server (ODBC)"
description: "Allocate Handles and Connect to SQL Server (ODBC)"
author: markingmyname
ms.author: maghan
ms.date: "03/16/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "handles [ODBC]"
  - "handles [ODBC], connection"
  - "handles [ODBC], about handles"
---
# Allocate Handles and Connect to SQL Server (ODBC)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





    
### To allocate handles and connect to SQL Server  
  
1.  Include the ODBC header files Sql.h, Sqlext.h, Sqltypes.h.  
  
2.  Include the  SQL Server 
 driver-specific header file, Odbcss.h.  
  
3.  Call [SQLAllocHandle](../../odbc/reference/syntax/sqlallochandle-function.md) with a **HandleType** of SQL_HANDLE_ENV to initialize ODBC and allocate an environment handle.  
  
4.  Call [SQLSetEnvAttr](../native-client-odbc-api/sqlsetenvattr.md) with **Attribute** set to SQL_ATTR_ODBC_VERSION and **ValuePtr** set to SQL_OV_ODBC3 to indicate the application will use ODBC 3.x-format function calls.  
  
5.  Optionally, call [SQLSetEnvAttr](../native-client-odbc-api/sqlsetenvattr.md) to set other environment options, or call [SQLGetEnvAttr](../../odbc/reference/syntax/sqlgetenvattr-function.md) to get environment options.  
  
6.  Call [SQLAllocHandle](../../odbc/reference/syntax/sqlallochandle-function.md) with a **HandleType** of SQL_HANDLE_DBC to allocate a connection handle.  
  
7.  Optionally, call [SQLSetConnectAttr](../native-client-odbc-api/sqlsetconnectattr.md) to set connection options, or call [SQLGetConnectAttr](../native-client-odbc-api/sqlgetconnectattr.md) to get connection options.  
  
8.  Call SQLConnect to use an existing data source to connect to  SQL Server 
.  
  
     Or  
  
     Call [SQLDriverConnect](../native-client-odbc-api/sqldriverconnect.md) to use a connection string to connect to  SQL Server 
.  
  
     A minimum complete  SQL Server 
 connection string has one of two forms:  
  
    ```  
    DSN=dsn_name;Trusted_connection=yes;  
    DRIVER={SQL Server Native Client 10.0};SERVER=server;Trusted_connection=yes;  
    ```  
  
     If the connection string is not complete, **SQLDriverConnect** can prompt for the required information. This is controlled by the value specified for the *DriverCompletion* parameter.  
  
     \- or -  
  
     Call [SQLBrowseConnect](../native-client-odbc-api/sqlbrowseconnect.md) multiple times in an iterative fashion to build the connection string and connect to  SQL Server 
.  
  
9. Optionally, call [SQLGetInfo](../native-client-odbc-api/sqlgetinfo.md) to get driver attributes and behavior for the  SQL Server 
 data source.  
  
10. Allocate and use statements.  
  
11. Call SQLDisconnect to disconnect from  SQL Server 
 and make the connection handle available for a new connection.  
  
12. Call [SQLFreeHandle](../native-client-odbc-api/sqlfreehandle.md) with a **HandleType** of SQL_HANDLE_DBC to free the connection handle.  
  
13. Call **SQLFreeHandle** with a **HandleType** of SQL_HANDLE_ENV to free the environment handle.  
  
> **Important:**  
>  When possible, use Windows Authentication. If Windows Authentication is not available, prompt users to enter their credentials at run time. Avoid storing credentials in a file. If you must persist credentials, you should encrypt them with the [Win32 crypto API](https://learn.microsoft.com/windows/win32/seccrypto/cryptography-reference).  
  
## Example  
 This example shows a call to **SQLDriverConnect** to connect to an instance of  SQL Server 
 without requiring an existing ODBC data source. By passing an incomplete connection string to **SQLDriverConnect**, it causes the ODBC driver to prompt the user to enter the missing information.  
  
```  
#define MAXBUFLEN   255  
  
SQLHENV      henv = SQL_NULL_HENV;  
SQLHDBC      hdbc1 = SQL_NULL_HDBC;  
SQLHSTMT      hstmt1 = SQL_NULL_HSTMT;  
  
SQLCHAR      ConnStrIn[MAXBUFLEN] =  
         "DRIVER={SQL Server Native Client 10.0};SERVER=MyServer";  
  
SQLCHAR      ConnStrOut[MAXBUFLEN];  
SQLSMALLINT   cbConnStrOut = 0;  
  
// Make connection without data source. Ask that driver   
// prompt if insufficient information. Driver returns  
// SQL_ERROR and application prompts user  
// for missing information. Window handle not needed for  
// SQL_DRIVER_NOPROMPT.  
retcode = SQLDriverConnect(hdbc1,      // Connection handle  
                  NULL,         // Window handle  
                  ConnStrIn,      // Input connect string  
                  SQL_NTS,         // Null-terminated string  
                  ConnStrOut,      // Address of output buffer  
                  MAXBUFLEN,      // Size of output buffer  
                  &cbConnStrOut,   // Address of output length  
                  SQL_DRIVER_PROMPT);  
```
