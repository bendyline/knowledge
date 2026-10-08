---
title: "bcp_done"
description: "bcp_done"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "bcp_done function"
apilocation: "sqlncli11.dll"
apiname: "bcp_done"
apitype: "DLLExport"
---
# bcp_done

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  Ends a bulk copy from program variables to  SQL Server 
 performed with [bcp_sendrow](bcp-sendrow.md).  
  
## Syntax  
  
```  
  
DBINT bcp_done (  
    HDBC hdbc);  
```  
  
## Arguments  
 *hdbc*  
 Is the bulk copy-enabled ODBC connection handle.  
  
## Returns  
 The number of rows permanently saved after the last call to [bcp_batch](bcp-batch.md) or -1 in case of error.  
  
## Remarks  
 Call **bcp_done** after the last call to [bcp_sendrow](bcp-sendrow.md) or [bcp_moretext](bcp-moretext.md). Failure to call **bcp_done** after copying all data results in errors.  
  
## Related content

- [SQL Server Driver Extensions - Bulk Copy Functions](sql-server-driver-extensions-bulk-copy-functions.md)
