---
title: "Managing Text and Image Columns"
description: "Managing Text and Image Columns"
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
  - "data types [ODBC], text"
  - "columns [ODBC]"
  - "ODBC data types, image columns"
  - "data types [ODBC], mapping"
  - "ODBC data types, text columns"
  - "image columns [ODBC]"
---
# Managing Text and Image Columns

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





   SQL Server 
 **text**, **ntext**, and **image** data (also referred to as long data) are character or binary string data types that can hold data values too large to fit into **char**, **varchar**, **binary**, or **varbinary** columns. The  SQL Server 
 **text** data type maps to the ODBC SQL_LONGVARCHAR data type; **ntext** maps to SQL_WLONGVARCHAR; and **image** maps to SQL_LONGVARBINARY. Some data items, such as long documents or large bitmaps, may be too large to store reasonably in memory. To retrieve long data from  SQL Server 
 in sequential parts, the  SQL Server 
 Native Client ODBC driver enables an application to call [SQLGetData](../native-client-odbc-api/sqlgetdata.md). To send long data in sequential parts, the application can call [SQLPutData](../native-client-odbc-api/sqlputdata.md). Parameters for which data is sent at execution time are known as data-at-execution parameters.  
  
 An application can actually write or retrieve any type of data (not just long data) with **SQLPutData** or **SQLGetData**, although only **character** and **binary** data can be sent or retrieved in parts. However, if the data is small enough to fit in a single buffer, there is generally no reason to use **SQLPutData** or **SQLGetData**. It is much easier to bind the single buffer to the parameter or column.  
  
## In This Section  
  
-   [Bound vs. Unbound Text and Image Columns](bound-vs-unbound-text-and-image-columns.md)  
  
-   [Logged vs. Unlogged Modifications](logged-vs-unlogged-modifications.md)  
  
-   [Data-at-Execution and Text, ntext, or Image Columns](data-at-execution-and-text-ntext-or-image-columns.md)  
  
## Related content

- [SQL Server Native Client (ODBC)](../native-client/odbc/sql-server-native-client-odbc.md)
