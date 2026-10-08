---
title: "Error Messages"
description: "Error Messages"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "SQL Server Native Client ODBC driver, errors"
  - "messages [ODBC], types"
  - "ODBC error handling, message types"
  - "errors [ODBC], types"
---
# Error Messages

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





  The text of messages returned by the  SQL Server 
 Native Client ODBC driver is placed in the *MessageText* parameter of **SQLGetDiagRec**. The source of an error is indicated by the header of the message:  
  
 [Microsoft][ODBC Driver Manager]  
 These errors are raised by the ODBC Driver Manager.  
  
 [Microsoft][ODBC Cursor Library]  
 These errors are raised by the ODBC cursor library.  
  
 [Microsoft][SQL Server Native Client]  
 These errors are raised by the  SQL Server 
 Native Client ODBC driver. If there are no other nodes with either the name of a Net-Library or  SQL Server 
, then the error was encountered in the driver.  
  
 [Microsoft][SQL Server Native Client][*Net-Transportname*]  
 These errors are raised by the  SQL Server 
 Net-Library, where *Net-Transportname* is the display name of a  SQL Server 
 client network transport (for example, Named Pipes, Shared Memory, TCP/IP Sockets, or VIA). The remainder of the error message contains the Net-Library function called and the function called in the underlying network API by the TDS function. The *pfNative* error code returned with these errors is the error code from the underlying network protocol stack.  
  
 [Microsoft][SQL Server Native Client][  SQL Server 
]  
 These errors are raised by  SQL Server 
. The remainder of the error message is the text of the error message from  SQL Server 
. The *pfNative* code returned with these errors is the error number from  SQL Server 
. For more information about a list of error messages (and their numbers) that can be returned by  SQL Server 
, see the description and error columns of the **sysmessages** system table in the **master** database in  SQL Server 
.  
  
## Related content

- [Handling Errors and Messages](handling-errors-and-messages.md)
