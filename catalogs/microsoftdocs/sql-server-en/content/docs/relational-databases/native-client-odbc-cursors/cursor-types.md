---
title: "Cursor Types"
description: "Cursor Types"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQL Server Native Client ODBC driver, cursors"
  - "ODBC applications, cursors"
  - "cursors [ODBC], types"
  - "ODBC cursors, types"
---
# Cursor Types

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  ODBC defines four cursor types supported by Microsoft  SQL Server 
 and the  SQL Server 
 Native Client ODBC driver. These cursors vary in their ability to detect changes to the result set and in the resources they consume, such as memory and space in **tempdb**. A cursor can detect changes to rows only when it tries to refetch those rows; there is no way for the data source to notify the cursor of changes to the currently fetched rows. A cursor's ability to detect changes that were not made through the cursor is also influenced by the transaction isolation level.  
  
 These are the four ODBC cursor types supported by  SQL Server 
:  
  
-   Forward-only cursors do not support scrolling; they only support fetching rows serially from the start to the end of the cursor.  
  
-   Static cursors are built in **tempdb** when the cursor is opened. They always display the result set as it was when the cursor was opened. They never reflect changes to the data.  SQL Server 
 static cursors are always read-only. Because a static server cursor is built as a work table in **tempdb**, the size of the cursor result set cannot exceed the maximum row size allowed by  SQL Server 
.  
  
-   Keyset-driven cursors have the membership and order of rows in the result set fixed when the cursor is opened. Changes to nonkey columns are visible through the cursor.  
  
-   Dynamic cursors are the opposite of static cursors. Dynamic cursors reflect all changes made to the rows in their result set. The data values, order, and membership of the rows in the result set can change on each fetch.  
  
## Related content

- [Using Cursors (ODBC)](using-cursors-odbc.md)
