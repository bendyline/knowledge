---
title: "bcp_collen"
description: "bcp_collen"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "bcp_collen function"
apilocation: "sqlncli11.dll"
apiname: "bcp_collen"
apitype: "DLLExport"
---
# bcp_collen

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  Sets the data length in the program variable for the current bulk copy into  SQL Server 
.  
  
## Syntax  
  
```  
  
RETCODE bcp_collen (  
        HDBC hdbc,  
        DBINT cbData,  
        INT idxServerCol);  
```  
  
## Arguments  
 *hdbc*  
 Is the bulk copy-enabled ODBC connection handle.  
  
 *cbData*  
 Is the length of the data in the program variable, not including the length of any length indicator or terminator. Setting *cbData* to SQL_NULL_DATA indicates all rows copied to the server contain a NULL value for the column. Setting it to SQL_VARLEN_DATA indicates that a string terminator or other method is used to determine the length of data copied. If both a length indicator and a terminator exist, the system uses whichever one results in less data being copied.  
  
 *idxServerCol*  
 Is the ordinal position of the column in the table to which the data is copied. The first column is 1. The ordinal position of a column is reported by [SQLColumns](../native-client-odbc-api/sqlcolumns.md).  
  
## Returns  
 SUCCEED or FAIL.  
  
## Remarks  
 The **bcp_collen** function allows you to change the data length in the program variable for a particular column when copying data to  SQL Server 
 with [bcp_sendrow](bcp-sendrow.md).  
  
 Initially, the data length is determined when [bcp_bind](bcp-bind.md) is called. If the data length changes between calls to **bcp_sendrow** and no length prefix or terminator is being used, you can call **bcp_collen** to reset the length. The next call to **bcp_sendrow** uses the length set by the call to **bcp_collen**.  
  
 You must call **bcp_collen** once for each column in the table whose data length you want to modify.  
  
## Related content

- [SQL Server Driver Extensions - Bulk Copy Functions](sql-server-driver-extensions-bulk-copy-functions.md)
