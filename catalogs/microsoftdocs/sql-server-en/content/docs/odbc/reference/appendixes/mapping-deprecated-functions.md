---
title: "Mapping Deprecated Functions"
description: "Mapping Deprecated Functions"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, sunilbs, mcimfl
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
helpviewer_keywords:
  - "mapping deprecated functions [ODBC], about mapping deprecated functions"
  - "backward compatibility [ODBC], mapping deprecated functions"
  - "deprecated functions [ODBC]"
  - "compatibility [ODBC], mapping deprecated functions"
  - "functions [ODBC], mapping deprecated functions"
  - "mapping deprecated functions [ODBC]"
---
# Mapping Deprecated Functions
This section describes how deprecated functions are mapped by the ODBC *3.x* Driver Manager to guarantee backward compatibility of ODBC *3.x* drivers that are used with ODBC *2.x* applications. The Driver Manager performs this mapping regardless of the version of the application. Because each of the ODBC *2.x* functions in the following list is mapped to the corresponding ODBC *3.x* function when called in an ODBC *3.x* driver, the ODBC *3.x* driver does not have to implement the ODBC *2.x* functions.  
  
 The mapping in the list is triggered when the driver is an ODBC *3.x* driver and the driver does not support the function that is being mapped.  
  
 The following table lists all duplicated functionality that was introduced in ODBC *3.x*.  
  
| ODBC *2.x* function | ODBC *3.x* function |
| --- | --- |
| **SQLAllocConnect** | **SQLAllocHandle** |
| **SQLAllocEnv** | **SQLAllocHandle** |
| **SQLAllocStmt** | **SQLAllocHandle** |
| **SQLBindParam**[1] | **SQLBindParameter** |
| **SQLColAttributes** | **SQLColAttribute** |
| **SQLError** | **SQLGetDiagRec** |
| **SQLFreeConnect** | **SQLFreeHandle** |
| **SQLFreeEnv** | **SQLFreeHandle** |
| **SQLFreeStmt** with an *Option* of SQL_DROP | **SQLFreeHandle** |
| **SQLGetConnectOption** | **SQLGetConnectAttr** |
| **SQLGetStmtOption** | **SQLGetStmtAttr** |
| **SQLParamOptions** | **SQLSetStmtAttr** |
| **SQLSetConnectOption** | **SQLSetConnectAttr** |
| **SQLSetParam**[2] | **SQLBindParameter** |
| **SQLSetScrollOption** | **SQLSetStmtAttr** |
| **SQLSetStmtOption** | **SQLSetStmtAttr** |
| **SQLTransact** | **SQLEndTran** |
  
 [1]   Even though this function did not exist in ODBC *2.x*, it is in the Open Group and ISO standards.  
  
 [2]   This is an ODBC 1.0 function.  
  
 This section contains the following topics.  
  
-   [SQLAllocConnect Mapping](sqlallocconnect-mapping.md)  
  
-   [SQLAllocEnv Mapping](sqlallocenv-mapping.md)  
  
-   [SQLAllocStmt Mapping](sqlallocstmt-mapping.md)  
  
-   [SQLBindParam Mapping](sqlbindparam-mapping.md)  
  
-   [SQLColAttributes Mapping](sqlcolattributes-mapping.md)  
  
-   [SQLError Mapping](sqlerror-mapping.md)  
  
-   [SQLFreeConnect Mapping](sqlfreeconnect-mapping.md)  
  
-   [SQLFreeEnv Mapping](sqlfreeenv-mapping.md)  
  
-   [SQLFreeStmt Mapping](sqlfreestmt-mapping.md)  
  
-   [SQLGetConnectOption Mapping](sqlgetconnectoption-mapping.md)  
  
-   [SQLGetStmtOption Mapping](sqlgetstmtoption-mapping.md)  
  
-   [SQLInstallTranslator Mapping](sqlinstalltranslator-mapping.md)  
  
-   [SQLParamOptions Mapping](sqlparamoptions-mapping.md)  
  
-   [SQLSetConnectOption Mapping](sqlsetconnectoption-mapping.md)  
  
-   [SQLSetParam Mapping](sqlsetparam-mapping.md)  
  
-   [SQLSetScrollOptions Mapping](sqlsetscrolloptions-mapping.md)  
  
-   [SQLSetStmtOption Mapping](sqlsetstmtoption-mapping.md)  
  
-   [SQLTransact Mapping](sqltransact-mapping.md)
