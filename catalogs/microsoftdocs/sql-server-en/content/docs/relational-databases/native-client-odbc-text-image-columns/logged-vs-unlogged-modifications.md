---
title: "Logged vs. Unlogged Modifications"
description: "Logged vs. Unlogged Modifications"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "text columns [ODBC]"
  - "SQL Server Native Client ODBC driver, image columns"
  - "SQL Server Native Client ODBC driver, text columns"
  - "data types [ODBC], image"
  - "data types [ODBC], text"
  - "logged vs. nonlogged modifications [SQL Server Native Client]"
  - "columns [ODBC]"
  - "ODBC data types, image columns"
  - "nonlogged vs. logged modifications"
  - "ODBC data types, text columns"
  - "image columns [ODBC]"
---
# Logged vs. Unlogged Modifications

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  An application can request that the  SQL Server 
 Native Client ODBC driver not log **text**, **ntext**, and **image** modifications. Care should be used with this option, however. It should be used only for those situations where the **text**, **ntext**, or **image** data is not critical and data owners are willing to trade off the ability to recover data for higher performance.  
  
 The logging of **text**, **ntext**, and **image** modifications is controlled by calling [SQLSetStmtAttr](../native-client-odbc-api/sqlsetstmtattr.md) with the *Attribute* parameter set to SQL_SOPT_SS_ TEXTPTR_LOGGING and *ValuePtr* set to either SQL_TL_ON or SQL_TL_OFF.  
  
## Related content

- [Managing Text and Image Columns](managing-text-and-image-columns.md)
