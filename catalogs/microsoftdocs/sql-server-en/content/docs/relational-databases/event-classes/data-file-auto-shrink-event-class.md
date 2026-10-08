---
title: "Data File Auto Shrink Event Class"
description: "Data File Auto Shrink Event Class"
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: reference
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "Data File Auto Shrink event class"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Data File Auto Shrink Event Class

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 
](../../sql-server/sql-docs-navigation-guide.md#applies-to)


  The **Data File Auto Shrink** event class indicates that the data file has been shrunk. This event is not triggered if the data file shrinks because of an explicit ALTER DATABASE statement. Include the **Data File Auto Shrink** event class in traces that monitor the data file size changes.  
  
 When the **Data File Auto Shrink** event class is included in a trace, the amount of overhead incurred is low unless the data file frequently shrinks.  
  
## Data File Auto Shrink Event Class Data Columns  
  
| Data Column Name | Data Type | Description | Column ID | Filterable |
| --- | --- | --- | --- | --- |
| **ApplicationName** | **nvarchar** | Name of the client application that created the connection to an instance of  Microsoft |
  | SQL Server |
| . This column is populated with the values passed by the application rather than the displayed name of the program. | 10 | Yes |
| **ClientProcessID** | **Int** | ID assigned by the host computer to the process where the client application is running. This data column is populated if the client process ID is provided by the client. | 9 | Yes |
| **DatabaseID** | **int** | ID of the database specified by the USE *database* statement or the default database if no USE *database* statement has been issued for a given instance.  SQL Server Profiler |
 | displays the name of the database if the **ServerName** data column is captured in the trace and the server is available. Determine the value for a database by using the DB_ID function. | 3 | Yes |
| **DatabaseName** | **nvarchar** | Name of the database in which the user statement is running. | 35 | Yes |
| **Duration** | **bigint** | Time (in milliseconds) to shrink the file. | 13 | Yes |
| **EndTime** | **datetime** | Time that the auto shrink ended. | 18 | Yes |
| **EventClass** | **int** | Type of event recorded = 94. | 27 | No |
| **EventSequence** | **int** | Sequence of event class in batch. | 51 | No |
| **Filename** | **nvarchar** | Logical name of the file being shrunk. | 36 | Yes |
| **HostName** | **nvarchar** | Name of the computer on which the client is running. This data column is populated if client provides the host name. To determine the host name, use the HOST_NAME function. | 8 | Yes |
| **IntegerData** | **int** | Number of 8-KB pages by which the file was reduced. | 25 | Yes |
| **IsSystem** | **int** | Indicates whether the event occurred on a system process or a user process. 1 = system, 0 = user. | 60 | Yes |
| **LoginName** | **nvarchar** | Name of the login of the user (either the  SQL Server |
 | security login or the  Microsoft |
 | Windows login credentials in the form of DOMAIN\Username). | 11 | Yes |
| **LoginSid** | **image** | Security identification number (SID) of the logged-in user. You can find this information in the **sys.server_principals** catalog view. Each SID is unique for each login in the server. | 41 | Yes |
| **NTDomainName** | **nvarchar** | Windows domain to which the user belongs. | 7 | Yes |
| **ServerName** | **nvarchar** | Name of the instance of  SQL Server |
 | being traced. | 26 | No |
| **SessionLoginName** | **nvarchar** | Login name of the user who originated the session. For example, if you connect to  SQL Server |
 | using Login1 and execute a statement as Login2, **SessionLoginName** shows Login1 and **LoginName** shows Login2. This column displays both  SQL Server |
 | and Windows logins. | 64 | Yes |
| **SPID** | **int** | ID of the session on which the event occurred. | 12 | Yes |
| **StartTime** | **datetime** | Time at which the event started, if available. | 14 | Yes |
  
## Related content

- [Extended Events overview](../extended-events/extended-events.md)
- [sp_trace_setevent (Transact-SQL)](../system-stored-procedures/sp-trace-setevent-transact-sql.md)
